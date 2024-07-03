import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {

    const session = await getServerSession(authOptions);
    console.log(session, 'session');
    

    return (
        <div className='w-full justify-center text-center'>
          {session?.user ? `WELCOME PAGE ${session?.user?.email}` : 'NOT AUTHORIZED'}
        </div>
    );
}

export default page;