import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod';

// Define a schema for input
const materiSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(1, 'Description is required'),
    link: z.string().min(1, 'Link is required'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {title, 
            category, 
            description, 
            link
         } = materiSchema.parse(body);

   
        const newMateri = await db.materi.create({
            data: {
                title,
                description,
                category,
                link
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
