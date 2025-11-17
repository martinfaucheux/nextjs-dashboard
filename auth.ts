import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: "MFleHIgWFxjrd0RtSel9rX7geWZHaCJcKFy8JhrNyO8=",
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("🔍 Authorize called with credentials:", {
          email: credentials?.email,
        });

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) {
            console.log("❌ User not found:", email);
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            console.log("✅ User authenticated successfully:", {
              id: user.id,
              email: user.email,
            });
            return {
              id: user.id,
              email: user.email,
              name: user.name,
            };
          }
        }

        console.log("❌ Invalid credentials for:", credentials?.email);
        return null;
      },
    }),
  ],
});
