import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod';

export async function GET() {
    const questWithoutCorrectAnswer = await db.question.findMany({
        select: {
            id: true,
            question: true,
            answer1: true,
            answer2: true,
            answer3: true,
            answer4: true,
            correctAnswer: true,
        }
    });
    return NextResponse.json(questWithoutCorrectAnswer);
}
