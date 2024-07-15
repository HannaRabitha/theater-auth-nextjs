import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod';

// Define a schema for input
const FormSchema = z.object({
    question: z.string().min(1, 'Question is required'),
    answer1: z.string().min(1, 'Answer 1 is required'),
    answer2: z.string().min(1, 'Answer 2 is required'),
    answer3: z.string().min(1, 'Answer 3 is required'),
    answer4: z.string().min(1, 'Answer 4 is required'),
    // correctAnswer: z.number().int(),
});
export async function POST(req: Request) {
    try {
        const body = await req.json();

        let correctAnswer = parseInt(body.correctAnswer);
        const {
            question,
            answer1,
            answer2,
            answer3,
            answer4
        } = FormSchema.parse(body);


        const newQuestion = await db.question.create({
            data: {
                question,
                answer1,
                answer2,
                answer3,
                answer4,
                correctAnswer
            },
          });
        
        const {...rest} = newQuestion;

        return NextResponse.json({
            materi: rest,
            message: "Question Berhasil dibuat"
        });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            {messsage: "Something went wrong!", error: error}, 
            {status: 500})
    }
    
}

export async function GET() {
    const questions = await db.question.findMany();
    return NextResponse.json(questions);
}
