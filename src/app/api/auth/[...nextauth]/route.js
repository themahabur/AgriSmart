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

        if (!res.ok || !data.token) {
          return null;
        }

        return {
          id: data.user?.id || "user-id",
          name: data.user?.name || credentials.email,
          email: credentials.email,
          image: data.user?.image || null,
          accessToken: data.token,
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }

      // For Google login — use ID token, not access token
      if (account?.id_token) {
        token.accessToken = account.id_token;
      }

      return token;
    },

    async session({ session, token }) {
      // Attach accessToken to session
      session.accessToken = token.accessToken;

      // Keep user info clean
      session.user = {
        name: token.name,
        email: token.email,
        image: token.picture,
      };

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
