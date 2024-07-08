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

const FormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    content: z.string().min(1, 'Content is required'),
});


const MateriForm = () => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
      
        console.log(values);

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
            toast({
              title: 'Error',
              description: 'Add Materi Failed',
              variant: 'destructive'
            });
          }
        
    }


    return (
      
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full mt-10'>
              
        <div className='space-y-2'>
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
            name='content'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea 
                  className="mt-2 h-80 border border-gray-300 rounded-md p-2"
                  {...field} placeholder='Isi Konten Materi' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

          </div>

          <div className='flex gap-4'>
            <Button className='w-full mt-6' type='button' onClick={() => router.push('/admin/materi-list')}>
            Batal
            </Button>
          <Button className='w-full mt-6' type='submit'>
          Simpan
        </Button>

          </div>

       


    </form>
            </Form>
    );
};

export default MateriForm;