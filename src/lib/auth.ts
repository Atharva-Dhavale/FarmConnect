import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongodb";
import connectDB from './db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// Install bcryptjs: npm install bcryptjs
// Install @types/bcryptjs: npm install --save-dev @types/bcryptjs

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();
          
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            return null;
          }
          
          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          
          if (!isPasswordValid) {
            return null;
          }
          
          // Return user object (excluding password)
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.profileImage || null,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

// Add TypeScript declarations
declare module 'next-auth' {
  interface User {
    id: string;
    role?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
  
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role?: string;
  }
} 