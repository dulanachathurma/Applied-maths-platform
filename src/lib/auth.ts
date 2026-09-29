import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        await dbConnect();

        // Admin hardcoded check — also creates/updates admin record in DB for profile persistence
        if (credentials.email === "admin" && credentials.password === "Admin@123") {
          // Upsert admin in DB so profile (name, image) can be saved & persisted
          const hashedPassword = await bcrypt.hash("Admin@123", 10);
          const adminUser = await User.findOneAndUpdate(
            { email: "admin" },
            {
              $setOnInsert: {
                name: "Admin",
                email: "admin",
                password: hashedPassword,
                role: "admin",
                image: "",
              },
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );

          return {
            id: adminUser._id.toString(),
            name: adminUser.name || "Admin",
            email: "admin",
            role: "admin",
            image: adminUser.image || "",
          };
        }

        // Regular user login
        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "student",
          image: user.image || "",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
        token.picture = (user as any).image;
      }
      // Handle session update trigger (profile save)
      if (trigger === "update" && session) {
        if (session.user?.name) token.name = session.user.name;
        if (session.user?.image) token.picture = session.user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_dev_12345",
};
