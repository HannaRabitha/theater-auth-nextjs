import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import * as z from 'zod';

// Define a schema for input
const userSchema = z
  .object({
    name: z.string().min(1, 'Nama is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
      kelas: z.string().min(1, 'Kelas is required').max(3),
    jurusan: z.string().min(1, 'Jurusan is required').max(3),
  });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {name, email, password, kelas , jurusan } = userSchema.parse(body);

        //check if email already exist
        const existingUserByEmail = await db.user.findUnique({
            where: {email: email}
        });
        if (existingUserByEmail) {
            return NextResponse.json({
                user: null,
                message: "Email sudah digunakan"
            }, {status: 409})
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
              kelas,
              jurusan,
            },
          });
          
        
        const {password: newUserPassord, ...rest} = newUser;

        return NextResponse.json({
            user: rest,
            message: "User Berhasil dibuat"
        });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            {messsage: "Something went wrong!", error: error}, 
            {status: 500})
    }
    
}