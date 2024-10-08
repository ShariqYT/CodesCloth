"use server"

import connectDB from "@/db/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Admin from "@/models/Admin";
import bcrypt from 'bcryptjs';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectDB();  // Ensure DB is connected
                try {
                    const user = await Admin.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error("No admin found with this email");
                    }
                    
                    const passwordMatch = await bcrypt.compare(credentials.password, user.password);
                    
                    if (passwordMatch) {
                        return user;
                    } else {
                        throw new Error("Incorrect password");
                    }
                } catch (error) {
                    console.error('Authentication error:', error);  // Log error for debugging
                    throw new Error("Authentication failed");
                }
            }
        })
    ],
    pages: {
        signIn: "/admin-signin"
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user;
            }
            return session;
        }
    }
});

// Ensure that NEXTAUTH_SECRET is defined
if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined");
}

export { handler as GET, handler as POST };
