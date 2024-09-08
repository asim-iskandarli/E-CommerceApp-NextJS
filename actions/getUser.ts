"use server"
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export const getSession = async () => {
    try {
        return await getServerSession(authOptions);
    } catch (error) {
        return null
    }
}

export const getCurrentUser = async () => {
    try {
        const session = await getSession();
        if (!session?.user?.email) return null;
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            }
        })

        if (!currentUser) return null;

        return currentUser;

    } catch (error) {
        return null;
    }
}