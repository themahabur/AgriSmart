import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log("Credentials:", credentials);

        const res = await fetch(
          "https://agri-smart-server.vercel.app/api/users/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const data = await res.json();
        // console.log("API Response:", data);

        if (!res.ok || !data.token) {
          // console.log("Login failed");
          return null;
        }

        return {
          id: "user-id",
          name: credentials.email,
          email: credentials.email,
          token: data.token,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token; // Ensure user.token is defined
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token; // session.user.accessToken হবে
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };