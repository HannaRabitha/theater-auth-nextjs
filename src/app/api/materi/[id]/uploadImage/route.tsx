import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';


export async function POST(req: Request) {

    //format formdata 
    // file: File attachment
    // idMateri: integer
    const formData = await req.formData();

    const file = formData.get("file") as File | undefined;
    const materiId = formData.get("idMateri") as string;
 
    if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
    } 
    

    const fileBuffer = await file.arrayBuffer();
    const fileName = file.name;
    

    const newFileName = uuidv4()+'_'+fileName;
    const _materiId = parseInt(materiId);

    
     //   Upload image to Supabase Storage
      const { data, error } = await supabase.storage
        .from('imageMateri')
        .upload(`public/${_materiId}/${newFileName}`, fileBuffer, 
            {
                cacheControl: '3600',
                upsert: false
              });

      if (error) {
        return NextResponse.json({ error: error.message });
      }
      
      // Store image reference in your database using Prisma
      const imageReference = await db.images.create({
        data: {
          // Assuming you have a URL or path field
          url: 
          `${
            process.env.NEXT_PUBLIC_SUPABASE_URL
            }/storage/v1/object/public/imageMateri/public/${_materiId}/${newFileName}`,
          materiId: parseInt(materiId),
        },
      });

      return NextResponse.json({ message: 'Image uploaded successfully', imageReference });
  
}


// GET DATA FROM SUPABASE STORAGE

export async function GET(
    req: NextApiRequest,
    res: NextApiResponse
) {

    console.log('req');
    
    
    
    return NextResponse.json({ message: 'HEllo world' });

    


    // //GET DATA FROM SUPABASE STORAGE
    //   const { data, error } = await supabase.storage
    //     .from('imageMateri')
    //     .list(`public/${_materiId}/`, {
    //         limit: 100,
    //         offset: 0
    //     });

    //     if (error) {
    //         return NextResponse.json({ error: error.message });
    //     }

    //     return NextResponse.json(data);
  
}


