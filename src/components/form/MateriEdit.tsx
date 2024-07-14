'use client';
import react from 'react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from '../ui/use-toast';
import { FormControl, FormGroup, FormLabel, Input, InputLabel } from "@mui/material";
import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/utils/supabase/client";
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { Button } from '../ui/button';


//   const FormSchema = z.object({
//     id: z.string(),
//     title: z.string().min(1, 'Title is required').max(100),
//     content: z.string().min(1, 'Content is required'),
// });

const MateriEditForm = ({params}: any) => {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
        
    const [dataMateri, setDataMateri] = useState<any>({
        id: '',
        title: '',
        category: '',
        description: '',
        link: ''
    });

    // const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),
    //     defaultValues: {
    //         id: '',
    //         title: '',
    //         content: '',
    //     },
    // });

    const { id } = params
    console.log(id)

   
      // Fetch materi data
      useEffect(() => {
        
        setLoading(true); // Step 2: Set loading state to true
      
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/materi/${id}`); // Adjust the API endpoint as needed
                const data = await response.json();
                console.log(data, 'data');

                setDataMateri(data);
                setLoading(false); // Step 3: Set loading state to false


            } catch (error) {
                setLoading(false);
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

    async function onSubmit() {
        setLoading(true);
        console.log(dataMateri, 'payload');
        
        const response = await fetch(`/api/materi/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(dataMateri),
        });

        if (response.ok) {
            router.push('/admin/materi-list');
          } else {
            // console.error('Registration Failed')
            setLoading(false);
            toast({
              title: 'Error',
              description: 'Edit Materi Failed',
              variant: 'destructive'
            });
          }
    }

    return (
        <>
       {loading? (
        <div className='flex justify-center items-center w-full h-full'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#2968A3]'></div>
        </div>
       ): (
       <div className='gap-y-6 flex flex-col'>

     <FormGroup>
            <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input type="text" id="title" value={dataMateri.title}
                onChange={
                    (e) => {
                        setDataMateri({
                            ...dataMateri,
                            title: e.target.value
                        })
                    }
                }
                 />
            </FormControl>
        </FormGroup>
        <FormGroup className='h-80'>
            <FormControl>
            <FormLabel htmlFor="title">Content</FormLabel>
                <ReactQuill className='h-64 mt-1' theme="snow" value={dataMateri.description}
                onChange={(value) => {
                    setDataMateri({
                        ...dataMateri,
                        content: value
                    })
                }}
                placeholder='Isi Konten Materi' />
            </FormControl>
        </FormGroup>

        <FormGroup>
            <FormControl>
            <FormLabel htmlFor="title">Image</FormLabel>

                <Input type="file" id="image" onChange={
                    (e) => {
                        uploadImage(e);
                    }
                
                } />
            </FormControl>
        </FormGroup>

        <div className='flex mt-20 gap-4'>
        <Button className='w-full' type='button' onClick={() => router.push('/admin/materi-list')}>
            Batal
            </Button>
        <Button className='w-full' type='submit' onClick={
            () => {
                onSubmit();
            }
        
        }>
          Simpan
        </Button>
          </div>



        </div>

       )}
        
        </>
    )
}

export default MateriEditForm;