import { z } from "zod";

// ─── Auth Schemas ───────────────────────────────────────────────────

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["artist", "backer"], {
    message: "Role must be artiste or backer",
  }),
  linkedinUrl: z
    .string()
    .url("Must be a valid URL")
    .refine(
      (url) => url.includes("linkedin.com/in/"),
      "Must be a LinkedIn profile URL (linkedin.com/in/...)"
    ),
  linkedinHeadline: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// ─── Drop Schemas ───────────────────────────────────────────────────

export const createDropSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    genre: z.string().optional(),
    tagline: z.string().optional(),
    videoUrl: z.string().url("Must be a valid URL"),
    videoId: z.string().min(1, "Video ID is required"),
    currency: z.enum(["USD", "INR"]).default("USD"),
    totalBudget: z.number().int().positive("Budget must be positive"),
    artistCopay: z.number().int().positive("Co-pay must be positive"),
    backerGoal: z.number().int().positive("Backer goal must be positive"),
    minTicket: z.number().int().positive().optional(),
    revSharePct: z.number().min(1).max(100),
    capMultiple: z.number().min(1).max(10),
    tenorMonths: z.number().int().min(1).max(24),
  })
  .refine((data) => data.artistCopay >= data.totalBudget * 0.2, {
    message: "Artiste co-pay must be at least 20% of total budget",
    path: ["artistCopay"],
  })
  .refine((data) => data.backerGoal === data.totalBudget - data.artistCopay, {
    message: "Backer goal must equal total budget minus co-pay",
    path: ["backerGoal"],
  });

// ─── Pledge Schema ──────────────────────────────────────────────────

export const pledgeSchema = z.object({
  amount: z.number().int().positive("Pledge amount must be positive"),
});

// ─── User Update Schema ─────────────────────────────────────────────

export const updateUserSchema = z.object({
  fullName: z.string().min(2).optional(),
  linkedinUrl: z
    .string()
    .url()
    .refine((url) => url.includes("linkedin.com/in/"))
    .optional(),
  linkedinHeadline: z.string().optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateDropInput = z.infer<typeof createDropSchema>;
export type PledgeInput = z.infer<typeof pledgeSchema>;
