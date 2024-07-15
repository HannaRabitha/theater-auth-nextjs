import React from "react";
import { db } from "@/lib/db";
import MateriForm from "@/components/form/MateriForm";
import QuizForm from "@/components/form/QuizForm";

const page = async () => {

    return (
        <div className="mt-8">
             <h1 className="text-2xl font-bold text-center leading-snug tracking-tight text-[#2968A3] lg:text-3xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
             Quiz Section
            </h1>

            <QuizForm />
        </div>
    );
}

export default page;