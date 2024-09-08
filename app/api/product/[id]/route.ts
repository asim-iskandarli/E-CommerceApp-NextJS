import { getCurrentUser } from "@/actions/getUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {

    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const {id} = params;

    try {
        await prisma.product.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json('Successfully deleted');
    } catch (error) {
        console.log(error);
    }
}