import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prismaClient";

const authHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    session: async ({ session, user }) => {
      session.userId = user.id;

      return Promise.resolve(session);
    },
  },
};
