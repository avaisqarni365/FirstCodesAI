"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEF9F4] via-[#FFF1E8] to-[#FFDDC7]">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(212, 118, 78, 0.08) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <Card className="w-full max-w-md mx-4 shadow-xl shadow-peach-200/50 border-warm-200 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-peach-400 to-peach-500 rounded-2xl flex items-center justify-center shadow-lg shadow-peach-200">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-warm-800">CODES AI</CardTitle>
          <CardDescription className="text-warm-500">
            Business Management Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-warm-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@codes-ai.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-warm-50 border-warm-200 text-warm-800 placeholder:text-warm-400 focus:border-peach-400 focus:ring-peach-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-warm-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-warm-50 border-warm-200 text-warm-800 placeholder:text-warm-400 focus:border-peach-400 focus:ring-peach-200"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-peach-500 to-peach-400 hover:from-peach-600 hover:to-peach-500 text-white font-semibold shadow-md shadow-peach-200 transition-all"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-xs text-warm-400">
              CODES AI Private Limited | codes-ai.uk
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
