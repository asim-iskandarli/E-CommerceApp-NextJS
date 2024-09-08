import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        const popularProducts = await prisma.popular.findMany({
            include: {
                product: {
                    include: {
                        User: true
                    }
                }
            }
        })

        return NextResponse.json(popularProducts);
    } catch (error) {
        console.log(error);
    }
}

export const POST = async (request: Request) => {
    const body = await request.json();
    const {productId} = body;
    try {
        const existsProduct = await prisma.popular.findUnique({
            where: {
                productId
            }
        })

        if(existsProduct) throw NextResponse.json({ error: 'Product already exists' }, { status: 409 });

        await prisma.popular.create({
            data: {
                productId
            }
        })

        return NextResponse.json('Created successfully');
    } catch (error) {
        console.log(error);
    }
}