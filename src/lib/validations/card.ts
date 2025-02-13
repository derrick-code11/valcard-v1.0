import * as z from "zod";

export const cardFormSchema = z.object({
  creatorName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim()
    .refine((val) => val.length > 0, "Please enter your name"),
  partnerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim()
    .refine((val) => val.length > 0, "Please enter your partner's name"),
  memories: z
    .string()
    .min(
      10,
      "Please share at least a few words about your memories together (minimum 10 characters)"
    )
    .max(
      1000,
      "Your memories are beautiful but please keep them under 1000 characters"
    )
    .trim()
    .refine(
      (val) => val.split(/\s+/).length >= 3,
      "Please share at least a few words about your memories"
    ),
  thingsLoved: z
    .string()
    .min(
      10,
      "Please share at least a few things you love (minimum 10 characters)"
    )
    .max(1000, "Your list is lovely but please keep it under 1000 characters")
    .trim()
    .refine(
      (val) => val.split(/\s+/).length >= 3,
      "Please share at least a few things you love"
    ),
});

export type CardFormValues = z.infer<typeof cardFormSchema>;
