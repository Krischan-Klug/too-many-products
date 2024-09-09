import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error("No user found with this email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("Invalid password");
        }

        client.close();

        return { id: user._id, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/",
    maxAge: 30 * 60,
  },
  session: {
    jwt: true,
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});
