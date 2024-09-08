import { getCurrentUser } from "@/actions/getUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
    const body = await request.json();
    const { id, name, oldPrice, newPrice, category, inStock } = body;
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const updateProduct = await prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                oldPrice: parseFloat(oldPrice),
                newPrice: parseFloat(newPrice),
                category,
                inStock,
                userId: currentUser.id,
            }
        })

        return NextResponse.json(updateProduct);


    } catch (error) {
        console.log(error);
    }
}
