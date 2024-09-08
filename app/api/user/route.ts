import { getCurrentUser } from "@/actions/getUser";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import prisma from "@/lib/prisma";

export const POST = async (requst: Request) => {
    try {
        const { name, email } = await requst.json();

        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: 'Invalid Authentication' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user) {
            throw NextResponse.json({ error: 'Email already exists' }, { status: 409 });
        }


        await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                email,
            }
        })
        
        return NextResponse.json('Updated successfully');
    } catch (error) {
        console.log(error);
    }
}