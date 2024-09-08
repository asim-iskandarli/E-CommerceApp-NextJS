import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        Credentials({
            credentials: {
                email: { label: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) throw new Error("İstifadəçi adı və ya şifrə yanlışdır");

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });


                if (!user || !user.hashedPassword) throw new Error("İstifadəçi adı və ya şifrə yanlışdır");

                const comparePassword = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!comparePassword) throw new Error("İstifadəçi adı və ya şifrə yanlışdır");

                return user;
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin'
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions)