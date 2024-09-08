import { getCurrentUser } from "@/actions/getUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
    const body = await request.json();
    const { name, oldPrice, newPrice, category, inStock, image } = body;
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                oldPrice: parseFloat(oldPrice),
                newPrice: parseFloat(newPrice),
                image,
                category,
                inStock,
                userId: currentUser.id,
            }
        })

        return NextResponse.json(newProduct);


    } catch (error) {
        console.log(error);
    }
}

export const GET = async () => {
    try {
        const products = await prisma.product.findMany({
            include: {
                User: true
            }
        })

        return NextResponse.json(products);
    } catch (error) {
        console.log(error);
    }
}

