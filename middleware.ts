import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth({
  ...authConfig,
  secret: "MFleHIgWFxjrd0RtSel9rX7geWZHaCJcKFy8JhrNyO8=",
}).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
