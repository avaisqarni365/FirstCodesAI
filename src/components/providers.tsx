"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            border: "1px solid #334155",
            color: "#e2e8f0",
          },
        }}
      />
    </SessionProvider>
  );
}
