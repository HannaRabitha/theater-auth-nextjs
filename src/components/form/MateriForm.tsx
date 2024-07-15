'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { Textarea } from '@headlessui/react';
import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const FormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Content is required'),
    category: z.string().min(1, 'Category is required'),
    link  : z.string().min(1, 'Link is required'),
});


const MateriForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            description: '',
            category: 'abc',
            link: 'link'
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
      
        // console.log(values);

        setLoading(true);
        const response = await fetch('/api/materi', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            router.push('/admin/materi-list');
          } else {
            // console.error('Registration Failed')
            setLoading(false);
            toast({
              title: 'Error',
              description: 'Add Materi Failed',
              variant: 'destructive'
            });
          }
        
    }


    return (
      <>
      {loading ? (
        <div className='flex justify-center items-center w-full h-full'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#2968A3]'></div>
        </div>
      ) : (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full mt-10'>
          
        <div className='flex flex-col gap-y-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Materi</FormLabel>
                <FormControl>
                  <Input placeholder='Judul Materi' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='flex flex-col h-80'>
                <FormLabel>Content</FormLabel>
                <FormControl>
                <ReactQuill className='h-full mt-1' theme="snow" {...field} placeholder='Isi Konten Materi' />
                  {/* <Textarea 
                  className="mt-2 h-80 border border-gray-300 rounded-md p-2"
                  {...field} placeholder='Isi Konten Materi' /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

            {/* <div className='h-80 my-6'>
            <FormLabel>Content</FormLabel>
            <ReactQuill className='h-full' theme="snow" value={value} onChange={setValue} />
            </div> */}

          <div className='flex mt-20 gap-4'>
            <Button className='w-full' type='button' onClick={() => router.push('/admin/materi-list')}>
            Batal
            </Button>
          <Button className='w-full' type='submit'>
          Simpan
        </Button>
          </div>
        </div>
    </form>
    </Form>
    )}
      
    </>
    );
};

export default MateriForm;