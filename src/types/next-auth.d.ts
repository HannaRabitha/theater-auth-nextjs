import NextAuth from "next-auth";

declare module 'next-auth' {
    export interface User {
        id: int;
        email: string;
        name: string;
        kelas: string;
        jurusan: string;
        role: string;
    }
    export interface Session {
        user: User & {
            email: string;
            id: string;
        }
        token: {
            email: string;
        }
    }
}