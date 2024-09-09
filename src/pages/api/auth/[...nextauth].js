import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Passwort", type: "password" },
      },
      async authorize(credentials) {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        const user = await db
          .collection("users")
          .findOne({ username: credentials.username });

        if (!user) {
          client.close();
          throw new Error("Kein Benutzer mit diesem Benutzernamen gefunden");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Ungültiges Passwort");
        }

        client.close();

        return {
          id: user._id,
          username: user.username,
          privileges: user.privileges,
        };
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
      session.user.username = token.username;
      session.user.privileges = token.privileges; // Privilegien zur Session hinzufügen
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.username = user.username;
        token.privileges = user.privileges; // Privilegien zum JWT hinzufügen
      }
      return token;
    },
  },
});
