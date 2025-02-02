import { compare } from 'bcrypt-ts';
import NextAuth, { type DefaultSession, } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUser } from '@/lib/db/queries';
import { authConfig } from './auth.config';

declare module 'next-auth' {
  interface User {
    privateKey: string;
  }
  interface Session extends DefaultSession {
    user: User & {
      privateKey: string;
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        const users = await getUser(email);
        if (users.length === 0) return null;
        // biome-ignore lint: Forbidden non-null assertion.
        const passwordsMatch = await compare(password, users[0].password!);
        if (!passwordsMatch) return null;
        return { ...users[0], privateKey: users[0].privateKey } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.privateKey = user.privateKey;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.privateKey = token.privateKey as string;
      }
      return session;
    },
  },
});
