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
          id: data.user?._id || data.user?.id,
          name: data.user?.name || credentials.email,
          email: data.user?.email || credentials.email,
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
    // Add this signIn callback - runs when user signs in
    async signIn({ user, account, profile }) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/users/google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
              googleId: account?.providerAccountId,
              provider: account?.provider,
            }),
          }
        );

        const data = await response.json();

        //  Store MongoDB ID and token in user object
          user.id = data.user._id


        return true; // Allow sign in
      } catch (error) {
        console.error("❌ Error sending user data to backend:", error);
        // return true; // Still allow sign in even if backend fails
        return false; //  block sign in if backend fails
      }
    },

    async jwt({ token, user, account }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }

      // For Google login — use ID token, not access token
      if (account?.id_token) {
        token.accessToken = account.id_token;
      }

      // Preserve user data in token
      if (user) {
        console.log("user in session", user);
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      // Attach accessToken to session
      session.accessToken = token.accessToken;

      // Keep user info clean and include ID
      session.user = {
        id: token.sub || token.id, // Use sub (subject) from JWT or id
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
