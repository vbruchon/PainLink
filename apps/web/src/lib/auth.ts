import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import { expo } from '@better-auth/expo';
import { resend } from './resend';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [expo()],
  trustedOrigins: [
    'mobile://',
    // Development mode - Expo's exp:// scheme with local IP ranges
    ...(process.env.NODE_ENV === 'development'
      ? [
          'exp://', // Trust all Expo URLs (prefix matching)
          'exp://**', // Trust all Expo URLs (wildcard matching)
          'exp://192.168.*.*:*/**', // Trust 192.168.x.x IP range with any port and path
        ]
      : []),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        //TODO UPDATE BEFORE PROD
        to: process.env.NODE_ENV === 'development' ? process.env.RESEND_DEV_TO! : user.email,
        subject: 'Réinitialiser ton mot de passe PainLink',
        html: `
        <p>Tu as demandé à réinitialiser ton mot de passe.</p>
        <p><a href="${url}">Choisir un nouveau mot de passe</a></p>
        <p>Si ce n'était pas toi, tu peux ignorer cet email.</p>
      `,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }: { user: { email: string }; url: string }) => {
      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        //TODO UPDATE BEFORE PROD
        to: process.env.NODE_ENV === 'development' ? process.env.RESEND_DEV_TO! : user.email,
        subject: 'Vérifie ton email pour PainLink',
        html: `
        <p>Bienvenue sur PainLink 👋</p>
        <p>Confirme ton adresse email pour sécuriser ton compte :</p>
        <p><a href="${url}">Vérifier mon email</a></p>
        <p>Tu peux ignorer cet email si ce n’était pas toi.</p>
      `,
      });
    },
  },
});
