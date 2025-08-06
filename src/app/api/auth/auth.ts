import NextAuth, { AuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedUser = process.env.ALLOWED_EMAIL
      return user.email === allowedUser
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const auth = NextAuth(authOptions)
