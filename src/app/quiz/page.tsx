import React from "react";
import { db } from "@/lib/db";
import MateriForm from "@/components/form/MateriForm";
import QuizForm from "@/components/form/QuizForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


const page = async () => {

    const session = await getServerSession(authOptions);

    return (

        <>
        {session?.user? (
            <div className="mt-8">
            <h1 className="text-2xl font-bold text-center leading-snug tracking-tight text-[#2968A3] lg:text-3xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
            Quiz Section
           </h1>

           <QuizForm />
       </div>
        ): (
            <div className="mt-8">
            <h1 className="text-2xl font-bold text-center leading-snug tracking-tight text-[#2968A3] lg:text-3xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
            Quiz Section
           </h1>
           <p className="text-center text-xl mt-4">Please login to access this page</p>
         </div>
        )}
        </>
        
    );
}

export default page;