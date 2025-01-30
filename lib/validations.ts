import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const LoginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof LoginSchema>;

export const SignUpSchema = z.object({
  email: requiredString.email(),
  username: requiredString.max(10, "Username must be less than 10 characters."),
  password: z.string().min(8, "Password must at least 8 characters."),
});

export type SignUpValues = z.infer<typeof SignUpSchema>;
