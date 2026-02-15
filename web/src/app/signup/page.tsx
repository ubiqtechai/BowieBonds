"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { useToastStore } from "@/stores/toast-store";

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { addToast } = useToastStore();

  const [role, setRole] = useState<"artist" | "backer">("artist");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName, role, linkedinUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          setFieldErrors(data.details);
        }
        setError(data.error || "Signup failed");
        return;
      }

      setUser(data.user);
      addToast("success", "Account created! Welcome to ZiggyDust.");
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function getFieldError(field: string): string | undefined {
    return fieldErrors[field]?.[0];
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] border-3 border-[var(--color-ink)]">
        {/* Tabs */}
        <div className="flex border-b-2 border-[var(--color-ink)]">
          <Link
            href="/login"
            className="flex-1 py-3.5 text-center bg-transparent text-[var(--color-ink)] font-mono text-xs font-semibold uppercase tracking-widest hover:bg-[var(--color-sand)] transition-colors"
          >
            Log In
          </Link>
          <div className="flex-1 py-3.5 text-center bg-[var(--color-ink)] text-[var(--color-cream)] font-mono text-xs font-semibold uppercase tracking-widest">
            Sign Up
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-5 p-3 border-2 border-[var(--color-red)] bg-red-50 font-mono text-xs text-[var(--color-red)]">
              {error}
            </div>
          )}

          {/* Role Selector */}
          <div className="mb-5">
            <label className="label mb-2">I am a</label>
            <div className="flex">
              {(["artist", "backer"] as const).map((r, i) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 border-2 border-[var(--color-ink)] font-mono text-[11px] font-semibold uppercase cursor-pointer transition-colors ${
                    i === 1 ? "border-l-0" : ""
                  } ${
                    role === r
                      ? "bg-[var(--color-ink)] text-[var(--color-cream)]"
                      : "bg-transparent text-[var(--color-ink)]"
                  }`}
                >
                  {r === "artist" ? "artiste" : r}
                </button>
              ))}
            </div>
          </div>

          {/* Full Name */}
          <div className="mb-5">
            <label className="label mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border-2 border-[var(--color-ink)] bg-white text-sm outline-none focus:border-[var(--color-amber)]"
            />
            {getFieldError("fullName") && (
              <span className="font-mono text-[10px] text-[var(--color-red)] mt-1 block">
                {getFieldError("fullName")}
              </span>
            )}
          </div>

          {/* Email */}
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
            {getFieldError("email") && (
              <span className="font-mono text-[10px] text-[var(--color-red)] mt-1 block">
                {getFieldError("email")}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="label mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-3.5 py-2.5 border-2 border-[var(--color-ink)] bg-white text-sm outline-none focus:border-[var(--color-amber)]"
            />
            {getFieldError("password") && (
              <span className="font-mono text-[10px] text-[var(--color-red)] mt-1 block">
                {getFieldError("password")}
              </span>
            )}
          </div>

          {/* LinkedIn URL */}
          <div className="mb-5">
            <label className="label mb-1.5">
              LinkedIn Profile URL (mandatory)
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/..."
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border-2 border-[var(--color-ink)] bg-white text-sm outline-none focus:border-[var(--color-amber)]"
            />
            <span className="font-mono text-[10px] text-[var(--color-inkMid)] mt-1.5 block">
              Everyone on ZiggyDust is a real person. No anons.
            </span>
            {getFieldError("linkedinUrl") && (
              <span className="font-mono text-[10px] text-[var(--color-red)] mt-1 block">
                {getFieldError("linkedinUrl")}
              </span>
            )}
          </div>

          {/* YouTube Connect (artistes only) */}
          {role === "artist" && (
            <div className="mb-5">
              <a
                href="/api/auth/youtube/connect"
                className="w-full py-3 border-2 border-[var(--color-ink)] bg-white text-[var(--color-ink)] font-mono text-xs cursor-pointer flex items-center justify-center gap-2 hover:bg-[var(--color-sand)] transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="red"
                >
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8z" />
                  <polygon
                    points="9.75 15.02 15.5 12 9.75 8.98"
                    fill="white"
                  />
                </svg>
                Connect YouTube (OAuth)
              </a>
              <span className="font-mono text-[10px] text-[var(--color-inkMid)] mt-1.5 block">
                We verify your YPP status and pull channel stats. Read-only.
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 border-2 border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)] font-mono text-[13px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-[var(--color-inkMid)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <div className="text-center mt-4">
            <span className="font-mono text-[11px] text-[var(--color-inkMid)]">
              Already in?{" "}
              <Link
                href="/login"
                className="text-[var(--color-ink)] font-semibold underline"
              >
                Log In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
