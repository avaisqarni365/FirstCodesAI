"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneCall, PhoneOff, Mic, MicOff, Pause, ArrowLeftRight, Hash, Clock, PhoneMissed, BarChart3 } from "lucide-react";

const dialPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

const quickDialContacts = [
  { name: "Sarah Chen", phone: "+447700900001", company: "TechCorp" },
  { name: "Jehanzaib", phone: "+447700900010", company: "CODES AI" },
  { name: "Tom Roberts", phone: "+447700900008", company: "Anglian Water" },
  { name: "Mohammed Ali", phone: "+447700900004", company: "SmartFactory" },
];

const recentCalls = [
  { name: "Sarah Chen", phone: "+447700900001", direction: "outbound", duration: "12:34", time: "10:30 AM", status: "completed" },
  { name: "Unknown", phone: "+447892456123", direction: "inbound", duration: "0:00", time: "10:15 AM", status: "missed" },
  { name: "Tom Roberts", phone: "+447700900008", direction: "outbound", duration: "8:45", time: "9:00 AM", status: "completed" },
  { name: "James Wilson", phone: "+447700900002", direction: "inbound", duration: "15:22", time: "Yesterday", status: "completed" },
  { name: "Priya Sharma", phone: "+447700900007", direction: "outbound", duration: "0:00", time: "Yesterday", status: "missed" },
  { name: "Mohammed Ali", phone: "+447700900004", direction: "inbound", duration: "6:10", time: "Yesterday", status: "completed" },
  { name: "Rebecca Hughes", phone: "+447700900005", direction: "outbound", duration: "4:55", time: "Mar 22", status: "completed" },
  { name: "Daniel Brown", phone: "+447700900006", direction: "inbound", duration: "18:03", time: "Mar 22", status: "completed" },
  { name: "Emily Parker", phone: "+447700900003", direction: "outbound", duration: "0:00", time: "Mar 21", status: "voicemail" },
  { name: "CloudTech Partner", phone: "+447812345678", direction: "inbound", duration: "9:12", time: "Mar 21", status: "completed" },
];

export default function VoIPPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);
  const [callTimer, setCallTimer] = useState("00:00");

  function handleDial(digit: string) {
    setPhoneNumber((prev) => prev + digit);
  }

  function handleCall() {
    if (phoneNumber) {
      setInCall(true);
      setCallTimer("00:00");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <Phone className="w-6 h-6 text-peach-500" /> VoIP Dashboard
          </h1>
          <p className="text-warm-500 mt-1">Make and receive calls with your UK number</p>
        </div>
        <Badge variant="outline" className="border-peach-300 text-peach-600">
          <Phone className="w-3 h-3 mr-1" /> +447586094540
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Calls Today", value: "18", icon: PhoneCall, color: "text-peach-500" },
          { label: "Avg Duration", value: "8:42", icon: Clock, color: "text-emerald-600" },
          { label: "Missed Calls", value: "3", icon: PhoneMissed, color: "text-red-500" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-white border-warm-200/60">
            <CardContent className="p-4 flex items-center gap-3">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <p className="text-xs text-warm-500">{stat.label}</p>
                <p className="text-xl font-bold text-warm-800">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dialpad */}
        <Card className="bg-white border-warm-200/60">
          <CardHeader>
            <CardTitle className="text-warm-800 text-sm">Dialpad</CardTitle>
          </CardHeader>
          <CardContent>
            {inCall ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-peach-500 to-peach-400 flex items-center justify-center animate-pulse">
                  <PhoneCall className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-semibold text-warm-800">{phoneNumber}</p>
                <p className="text-2xl font-mono text-peach-500">{callTimer}</p>
                <p className="text-sm text-emerald-600">Connected</p>
                <div className="flex items-center justify-center gap-3">
                  <Button variant="outline" size="icon" onClick={() => setMuted(!muted)} className={`rounded-full w-12 h-12 ${muted ? "bg-red-50 border-red-400 text-red-500" : "border-warm-200 text-warm-600"}`}>
                    {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-warm-200 text-warm-600">
                    <Pause className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-warm-200 text-warm-600">
                    <ArrowLeftRight className="w-5 h-5" />
                  </Button>
                  <Button size="icon" onClick={() => { setInCall(false); setPhoneNumber(""); }} className="rounded-full w-12 h-12 bg-red-500 hover:bg-red-600">
                    <PhoneOff className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <p className="text-xl font-mono text-warm-800 min-h-[2rem]">{phoneNumber || "+44"}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {dialPad.map((digit) => (
                    <Button key={digit} variant="outline" onClick={() => handleDial(digit)}
                      className="h-12 text-lg font-semibold border-warm-200 text-warm-800 hover:bg-peach-50/50">
                      {digit}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleCall} className="flex-1 h-12 bg-gradient-to-r from-peach-500 to-peach-400 hover:from-peach-600 hover:to-peach-500 text-white">
                    <PhoneCall className="w-5 h-5 mr-2" /> Call
                  </Button>
                  <Button variant="outline" onClick={() => setPhoneNumber("")} className="h-12 border-warm-200 text-warm-500">
                    Clear
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Dial + Recent */}
        <div className="lg:col-span-2 space-y-4">
          {/* Quick Dial */}
          <Card className="bg-white border-warm-200/60">
            <CardHeader>
              <CardTitle className="text-warm-800 text-sm">Quick Dial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quickDialContacts.map((contact) => (
                  <Button key={contact.phone} variant="outline" onClick={() => setPhoneNumber(contact.phone)}
                    className="h-auto py-3 border-warm-200 text-left flex flex-col items-start hover:bg-peach-50/50">
                    <span className="text-sm text-warm-800">{contact.name}</span>
                    <span className="text-[10px] text-warm-500">{contact.company}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Calls */}
          <Card className="bg-white border-warm-200/60">
            <CardHeader>
              <CardTitle className="text-warm-800 text-sm">Recent Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentCalls.map((call, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-warm-50 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      call.status === "missed" ? "bg-red-50" : call.status === "voicemail" ? "bg-amber-50" : "bg-emerald-50"
                    }`}>
                      {call.direction === "inbound" ? (
                        <PhoneCall className={`w-4 h-4 ${call.status === "missed" ? "text-red-500" : "text-emerald-600"}`} />
                      ) : (
                        <Phone className={`w-4 h-4 ${call.status === "missed" ? "text-red-500" : "text-peach-500"}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-warm-800">{call.name}</p>
                      <p className="text-[10px] text-warm-500">{call.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-warm-500">{call.duration}</p>
                      <p className="text-[10px] text-warm-400">{call.time}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setPhoneNumber(call.phone)} className="text-warm-500 hover:text-peach-500 shrink-0">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <p className="text-[10px] text-warm-400 text-center">Powered by Twilio | UK Number: +447586094540</p>
        </div>
      </div>
    </div>
  );
}
