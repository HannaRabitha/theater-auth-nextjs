import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  
    const id = params.id;

    const materi = await db.materi.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    if (!materi) {
        return NextResponse.json({message: 'Materi not found'}, {status: 404});
    }

    return NextResponse.json(materi);
  
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const body = await req.json();
    const { title, 
        category, 
        description, 
        link
     } = body;

    const updatedMateri = await db.materi.update({
        where: {
            id: parseInt(id)
        },
        data: {
            title,
            category,
            description,
            link
        }
    });

    return NextResponse.json(updatedMateri);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    const deletedMateri = await db.materi.delete({
        where: {
            id: parseInt(id)
        }
    });

    return NextResponse.json(deletedMateri);
}