"use client";

import { Suspense, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Wordmark } from "@/components/marketing/Wordmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Code2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  BarChart3,
  Users,
} from "lucide-react";

const STORAGE_EMAIL = "codes-ai-login-email";
const STORAGE_REMEMBER = "codes-ai-login-remember";

const features = [
  { icon: Users, label: "CRM & lead pipeline" },
  { icon: BarChart3, label: "Real-time business insights" },
  { icon: Shield, label: "Secure team workspace" },
];

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  Configuration:
    "Authentication is misconfigured. Check that NEXTAUTH_URL matches your app URL (e.g. http://localhost:3003).",
  CredentialsSignin: "Invalid email or password. Please try again.",
  AccessDenied: "You do not have permission to sign in.",
  Default: "Something went wrong during sign in. Please try again.",
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedRemember = localStorage.getItem(STORAGE_REMEMBER) === "true";
    const savedEmail = localStorage.getItem(STORAGE_EMAIL) ?? "";
    setRememberMe(savedRemember);
    if (savedRemember && savedEmail) {
      setEmail(savedEmail);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const authError = searchParams.get("error");
    if (authError) {
      setError(AUTH_ERROR_MESSAGES[authError] ?? AUTH_ERROR_MESSAGES.Default);
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      remember: rememberMe ? "true" : "false",
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    if (rememberMe) {
      localStorage.setItem(STORAGE_EMAIL, email);
      localStorage.setItem(STORAGE_REMEMBER, "true");
    } else {
      localStorage.removeItem(STORAGE_EMAIL);
      localStorage.setItem(STORAGE_REMEMBER, "false");
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative overflow-hidden bg-canvas">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(232,149,106,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(212,118,78,0.25) 0%, transparent 45%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-peach-900/40">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <Wordmark />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl xl:text-4xl font-bold text-warm-800 leading-tight">
                Your business,
                <br />
                <span className="text-teal-600">one platform.</span>
              </h1>
              <p className="mt-4 text-warm-600 text-sm leading-relaxed max-w-sm">
                CRM, lead generation, communications, and accounting — unified for modern teams.
              </p>
            </div>

            <ul className="space-y-3">
              {features.map(({ icon: Icon, label }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-warm-600"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-warm-200 shadow-sm">
                    <Icon className="w-4 h-4 text-brass" />
                  </span>
                  {label}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <p className="text-warm-500 text-xs">© {new Date().getFullYear()} CODES AI · codes-ai.uk</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center bg-canvas p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <Wordmark />
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-warm-200/60 rounded-2xl shadow-xl shadow-peach-100/60 p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-warm-800">Welcome back</h2>
              <p className="text-warm-500 text-sm mt-1">Sign in to access your workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
                >
                  <span className="mt-0.5 shrink-0">⚠</span>
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-warm-700 text-sm">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@codes-ai.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 pl-10 bg-warm-50/80 border-warm-200 text-warm-800 placeholder:text-warm-400 focus:border-peach-400 focus:ring-peach-200/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-warm-700 text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pl-10 pr-11 bg-warm-50/80 border-warm-200 text-warm-800 placeholder:text-warm-400 focus:border-peach-400 focus:ring-peach-200/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-warm-400 hover:text-warm-600 hover:bg-warm-100 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Checkbox
                  id="remember"
                  checked={hydrated ? rememberMe : false}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className="border-line data-checked:bg-teal-500 data-checked:border-teal-500"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-warm-600 font-normal cursor-pointer select-none"
                >
                  Remember me on this device
                </Label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-all rounded-[12px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-warm-400">
              Protected workspace · CODES AI Private Limited
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
