import NextAuth from "next-auth";

declare module 'next-auth' {
    export interface User {
        email: string;
    }
    export interface Session {
        user: User & {
            email: string;
        }
        token: {
            email: string;
        }
    }
}