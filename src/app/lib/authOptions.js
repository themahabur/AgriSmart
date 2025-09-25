// lib/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // Credentials provider (example: verify against your API)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Call your backend auth endpoint to verify credentials
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/local-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();
        // If login OK, return a user object. Otherwise return null.
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),

    // Optional: Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt", // or "database" with adapter
  },

  callbacks: {
    // Store user data inside the JWT
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    // Make that token available in session on client
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
