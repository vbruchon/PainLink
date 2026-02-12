import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe trop court'),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Prénom trop court')
    .transform((v) => v.replace(/\s+/g, ' ')),
  email: z.string().trim().toLowerCase().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe trop court'),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email('Email invalide'),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Minimum 8 caractères'),
    confirmPassword: z.string().min(8, 'Minimum 8 caractères'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
