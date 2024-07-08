'use client';
import react from 'react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { FormControl, FormGroup, Input, InputLabel } from "@mui/material";
import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/utils/supabase/client";


const MateriEditForm = ({params}: any) => {
    const router = useRouter();
        
    const [dataMateri, setDataMateri] = useState<any>({
        id: '',
        title: '',
        Content: ''
    });


    const { id } = params
    console.log(id)

   
      // Fetch materi data
      useEffect(() => {
      
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/materi/${id}`); // Adjust the API endpoint as needed
                const data = await response.json();
                console.log(data, 'data');

               
                setDataMateri(data); // Assuming the API returns an array of materi
                
            } catch (error) {
                console.error("Failed to fetch materi:", error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch materi',
                    variant: 'destructive'
                
                })
            }
        };
        fetchData();
    }, [id]); //


    async function getImages() {

        console.log('getImages');
        
        const { data, error } = await supabase.storage
        .from('imageMateri')
        .list('public/'+id + "/", {
            limit: 100,
            offset: 0
        });

        if (data) {
            console.log(data);
        } else {
            console.log(error);
        }
    }

  async function uploadImage(e:any) {

    let file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('idMateri', id);

    const response = await fetch(`/api/materi/${id}/uploadImage`, {
        method: 'POST',
        body: formData
    });

    if (response.ok) {

        getImages();
        // toast({
        //     title: 'Success',
        //     description: 'Image uploaded successfully',
        //     variant: 'default'
        // });
    } else {
        toast({
            title: 'Error',
            description: 'Failed to upload image',
            variant: 'destructive'
        });
    }
    
  };

    return (
        <>
        <div className="flex">
            <div className='font-bold justify-center text-center'>
            DETAIL MATERI {id}
            </div>
            
            <p> {dataMateri.id} </p>
            <p> {dataMateri.title} </p>
            <p> {dataMateri.content} </p>
            
        </div>

        {/* <div>
            <input type="text" name="title" value={dataMateri.title} />
            <input type="text" name="content" value={dataMateri.content} />
        </div> */}

        <h1>UPLOAD IMAGE</h1>
        
        <FormGroup>
            <FormControl>
                <InputLabel htmlFor="image">Image</InputLabel>
                <Input type="file" id="image" onChange={
                    (e) => {
                        uploadImage(e);
                    }
                
                } />
            </FormControl>
        </FormGroup>
        
        
        </>
    )
}

export default MateriEditForm;