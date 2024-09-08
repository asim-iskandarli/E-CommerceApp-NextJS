import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const { name, email, password } = body;


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        })
        return NextResponse.json(newUser);
    } catch (error) {
        console.log(error);
    }


}