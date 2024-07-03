
'use client';

import { redirect } from "next/dist/server/api-utils";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";


const UserAccountnav = () => {
    return (
        <Button onClick={() => signOut({
            redirect: true,
            callbackUrl: '/',
          })} variant='destructive'>Sign Out</Button>
    );
};

export default UserAccountnav;