import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Define a schema for input

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            score,
            trueAnswer,
            falseAnswer,
            email
        } = body;


        const newScore = await db.score.create({
            data: {
                score,
                trueAnswer,
                falseAnswer,
                email
            },
          });
        
        const {...rest} = newScore;

        return NextResponse.json({
            materi: rest,
            message: "Score Berhasil di input"
        });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            {messsage: "Something went wrong!", error: error}, 
            {status: 500})
    }
    
}
