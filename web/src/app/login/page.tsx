"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { useToastStore } from "@/stores/toast-store";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const { setUser } = useAuthStore();
  const { addToast } = useToastStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      setUser(data.user);
      addToast("success", "Welcome back!");
      router.push(redirect);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] border-3 border-[var(--color-ink)]">
        {/* Tabs */}
        <div className="flex border-b-2 border-[var(--color-ink)]">
          <div className="flex-1 py-3.5 text-center bg-[var(--color-ink)] text-[var(--color-cream)] font-mono text-xs font-semibold uppercase tracking-widest">
            Log In
          </div>
          <Link
            href="/signup"
            className="flex-1 py-3.5 text-center bg-transparent text-[var(--color-ink)] font-mono text-xs font-semibold uppercase tracking-widest hover:bg-[var(--color-sand)] transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-5 p-3 border-2 border-[var(--color-red)] bg-red-50 font-mono text-xs text-[var(--color-red)]">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="label mb-1.5">Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border-2 border-[var(--color-ink)] bg-white text-sm outline-none focus:border-[var(--color-amber)]"
            />
          </div>

          <div className="mb-5">
            <label className="label mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border-2 border-[var(--color-ink)] bg-white text-sm outline-none focus:border-[var(--color-amber)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 border-2 border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)] font-mono text-[13px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-[var(--color-inkMid)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="text-center mt-4">
            <span className="font-mono text-[11px] text-[var(--color-inkMid)]">
              No account?{" "}
              <Link
                href="/signup"
                className="text-[var(--color-ink)] font-semibold underline"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
