import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod';

// Define a schema for input
const materiSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    content: z.string().min(1, 'Content is required')
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {title, content } = materiSchema.parse(body);

   
        const newMateri = await db.materi.create({
            data: {
             title,
             content
            },
          });
        
        const {...rest} = newMateri;

        return NextResponse.json({
            materi: rest,
            message: "Materi Berhasil dibuat"
        });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            {messsage: "Something went wrong!", error: error}, 
            {status: 500})
    }
    
}

export async function GET() {
    const materis = await db.materi.findMany();
    return NextResponse.json(materis);
}
