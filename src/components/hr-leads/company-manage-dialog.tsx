"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Loader2,
  Plus,
  Trash2,
  Mail,
  Phone,
  User,
  Hash,
  MapPin,
  Save,
  Users,
  Code2,
} from "lucide-react";
import { toast } from "sonner";
import { formatSicCode, PIPELINE_STAGES } from "@/lib/sic-codes";
import type { CompanyProfile } from "@/lib/companies-house";

export interface ContactDraft {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  source: string;
}

interface SavedCompany {
  id: string;
  registrationNumber: string | null;
}

interface CompanyManageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registrationNumber: string;
  savedCompany?: SavedCompany | null;
  onSaved: (regNumber: string, companyId: string) => void;
}

function splitOfficerName(fullName: string): { firstName: string; lastName: string } {
  const cleaned = fullName.replace(/,/g, " ").replace(/\s+/g, " ").trim();
  const parts = cleaned.split(" ");
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  const lastName = parts.pop() || "";
  return { firstName: parts.join(" "), lastName };
}

function officersToContacts(profile: CompanyProfile): ContactDraft[] {
  return profile.officers.map((o) => {
    const { firstName, lastName } = splitOfficerName(o.name);
    return {
      firstName,
      lastName,
      email: "",
      phone: "",
      jobTitle: o.role,
      source: "Companies House Officer",
    };
  });
}

export function CompanyManageDialog({
  open,
  onOpenChange,
  registrationNumber,
  savedCompany,
  onSaved,
}: CompanyManageDialogProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [pipelineStage, setPipelineStage] = useState("IDENTIFIED");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [contacts, setContacts] = useState<ContactDraft[]>([]);

  useEffect(() => {
    if (!open || !registrationNumber) return;

    async function load() {
      setLoading(true);
      try {
        if (savedCompany?.id) {
          const res = await fetch(`/api/companies/${savedCompany.id}`);
          if (res.ok) {
            const data = await res.json();
            setProfile(null);
            setPipelineStage(data.pipelineStage);
            setCompanyEmail(data.email || "");
            setCompanyPhone(data.phone || "");
            setWebsite(data.website || "");
            setContacts(
              data.contacts?.length
                ? data.contacts.map((c: ContactDraft & { id: string }) => ({
                    firstName: c.firstName,
                    lastName: c.lastName,
                    email: c.email || "",
                    phone: c.phone || "",
                    jobTitle: c.jobTitle || "",
                    source: c.source || "Manual",
                  }))
                : []
            );
            const profileRes = await fetch(`/api/companies-house/${registrationNumber}`);
            if (profileRes.ok) setProfile(await profileRes.json());
            return;
          }
        }

        const profileRes = await fetch(`/api/companies-house/${registrationNumber}`);
        if (!profileRes.ok) throw new Error("Failed to load");
        const p: CompanyProfile = await profileRes.json();
        setProfile(p);
        setPipelineStage("IDENTIFIED");
        setCompanyEmail("");
        setCompanyPhone("");
        setWebsite("");
        setContacts(officersToContacts(p));
      } catch {
        toast.error("Could not load company details");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [open, registrationNumber, savedCompany?.id]);

  function updateContact(index: number, field: keyof ContactDraft, value: string) {
    setContacts((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  }

  function addContact() {
    setContacts((prev) => [
      ...prev,
      { firstName: "", lastName: "", email: "", phone: "", jobTitle: "", source: "Manual" },
    ]);
  }

  function removeContact(index: number) {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (!profile && !savedCompany) return;
    setSaving(true);
    try {
      const payload = {
        name: profile?.name || "",
        registrationNumber,
        website: website || undefined,
        industry: profile?.industry || "Technology",
        address: profile?.address,
        city: profile?.city,
        country: profile?.country || "UK",
        phone: companyPhone || undefined,
        email: companyEmail || undefined,
        source: "Companies House",
        pipelineStage,
        tags: profile?.sicCodes?.map((c) => `sic:${c}`) || [],
        customFields: {
          sicCodes: profile?.sicCodes || [],
          accountsDue: profile?.accountsDue,
          lastAccountsMadeUpTo: profile?.lastAccountsMadeUpTo,
          confirmationStatementDue: profile?.confirmationStatementDue,
        },
        contacts,
      };

      let res: Response;
      if (savedCompany?.id) {
        res = await fetch(`/api/companies/${savedCompany.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/companies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      toast.success(savedCompany ? "Company updated" : "Company saved to CRM");
      onSaved(registrationNumber, data.id);
      onOpenChange(false);
    } catch {
      toast.error("Failed to save company");
    } finally {
      setSaving(false);
    }
  }

  const displayName = profile?.name || "Company";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-warm-200 text-warm-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-warm-800">
            <Building2 className="w-5 h-5 text-peach-500" />
            {displayName}
          </DialogTitle>
          <DialogDescription className="text-warm-500">
            Manage company profile, IT classification codes, and contact persons
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-warm-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Loading company data...
          </div>
        ) : (
          <Tabs defaultValue="overview" className="mt-2">
            <TabsList className="bg-warm-50 border border-warm-200">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="contacts">
                Contacts ({contacts.length})
              </TabsTrigger>
              <TabsTrigger value="codes">IT Codes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-warm-500">
                  <Hash className="w-3.5 h-3.5" />
                  {registrationNumber}
                </div>
                {profile?.address && (
                  <div className="flex items-center gap-2 text-warm-500 col-span-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {profile.address}
                  </div>
                )}
              </div>

              {profile?.sicCodes && profile.sicCodes.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {profile.sicCodes.map((code) => (
                    <Badge key={code} variant="outline" className="text-[10px] border-violet-200 text-violet-700 bg-violet-50">
                      <Code2 className="w-3 h-3 mr-1" />
                      {code}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-warm-600">Pipeline stage</Label>
                  <Select value={pipelineStage} onValueChange={(v) => setPipelineStage(v ?? "IDENTIFIED")}>
                    <SelectTrigger className="mt-1 bg-warm-50 border-warm-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-warm-200">
                      {PIPELINE_STAGES.map((s) => (
                        <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-warm-600">Website</Label>
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://"
                    className="mt-1 bg-warm-50 border-warm-200"
                  />
                </div>
                <div>
                  <Label className="text-warm-600">Company email</Label>
                  <Input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    placeholder="info@company.co.uk"
                    className="mt-1 bg-warm-50 border-warm-200"
                  />
                </div>
                <div>
                  <Label className="text-warm-600">Company phone</Label>
                  <Input
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    placeholder="+44..."
                    className="mt-1 bg-warm-50 border-warm-200"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-warm-500 flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  Contact persons & decision makers
                </p>
                <Button type="button" size="sm" variant="outline" onClick={addContact} className="border-warm-200">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add contact
                </Button>
              </div>

              {contacts.length === 0 ? (
                <p className="text-sm text-warm-400 text-center py-8">No contacts yet. Add officers or manual contacts.</p>
              ) : (
                contacts.map((contact, i) => (
                  <div key={i} className="p-4 rounded-xl border border-warm-200 bg-warm-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-warm-500 flex items-center gap-1">
                        <User className="w-3 h-3" /> Contact {i + 1}
                      </span>
                      <Button type="button" size="sm" variant="ghost" onClick={() => removeContact(i)} className="h-7 text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="First name" value={contact.firstName} onChange={(e) => updateContact(i, "firstName", e.target.value)} className="bg-white border-warm-200 h-9" />
                      <Input placeholder="Last name" value={contact.lastName} onChange={(e) => updateContact(i, "lastName", e.target.value)} className="bg-white border-warm-200 h-9" />
                      <Input placeholder="Job title / role" value={contact.jobTitle} onChange={(e) => updateContact(i, "jobTitle", e.target.value)} className="bg-white border-warm-200 h-9 col-span-2" />
                      <div className="relative">
                        <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warm-400" />
                        <Input placeholder="Email" type="email" value={contact.email} onChange={(e) => updateContact(i, "email", e.target.value)} className="bg-white border-warm-200 h-9 pl-8" />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warm-400" />
                        <Input placeholder="Phone" value={contact.phone} onChange={(e) => updateContact(i, "phone", e.target.value)} className="bg-white border-warm-200 h-9 pl-8" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="codes" className="mt-4 space-y-3">
              <p className="text-sm text-warm-500">
                Standard Industrial Classification (SIC) codes registered with Companies House
              </p>
              {profile?.sicCodes?.length ? (
                <div className="space-y-2">
                  {profile.sicCodes.map((code) => (
                    <div key={code} className="flex items-start gap-3 p-3 rounded-xl border border-violet-100 bg-violet-50/50">
                      <Badge className="bg-violet-600 text-white shrink-0">{code}</Badge>
                      <p className="text-sm text-warm-700">{formatSicCode(code)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-warm-400 py-6 text-center">No SIC codes on record</p>
              )}
            </TabsContent>
          </Tabs>
        )}

        <div className="flex justify-end gap-2 pt-4 border-t border-warm-100 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-warm-200">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || loading} className="bg-gradient-to-r from-peach-500 to-peach-400 text-white">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {savedCompany ? "Update company" : "Save to CRM"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
