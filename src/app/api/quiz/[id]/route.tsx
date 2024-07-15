import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    const question = await db.question.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    if (!question) {
        return NextResponse.json({message: 'Question not found'}, {status: 404});
    }

    return NextResponse.json(question);
  
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const body = await req.json();


    let correctAnswer = parseInt(body.correctAnswer);
    
    const {
        question,
        answer1,
        answer2,
        answer3,
        answer4
     } = body;

    const updatedQuestion = await db.question.update({
        where: {
            id: parseInt(id)
        },
        data: {
            question,
            answer1,
            answer2,
            answer3,
            answer4,
            correctAnswer
        }
    });

    return NextResponse.json(updatedQuestion);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    const deletedQuestion = await db.question.delete({
        where: {
            id: parseInt(id)
        }
    });

    return NextResponse.json(deletedQuestion);
}