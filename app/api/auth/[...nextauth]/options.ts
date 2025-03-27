import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prismaConfig";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface User {
  id: string;
  email: string;
  name: string;
  workshop: string | null;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Usuario no encontrado");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Contraseña incorrecta");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          workshop: user.workshop,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | undefined }) {
      if (user) {
        token.id = user.id;
        token.workshop = user.workshop;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.workshop = token.workshop;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 