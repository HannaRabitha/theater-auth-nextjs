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
    question: z.string().min(1, 'Question is required'),
    answer1: z.string().min(1, 'Answer 1 is required'),
    answer2: z.string().min(1, 'Answer 2 is required'),
    answer3: z.string().min(1, 'Answer 3 is required'),
    answer4: z.string().min(1, 'Answer 4 is required'),
    correctAnswer: z.string().min(1, 'Correct Answer is required')
});


const QuestionForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            correctAnswer: "1",
        },
    });

    const listAnswer = [
        {id: 1, value: 'Option 1'},
        {id: 2, value: 'Option 2'},
        {id: 3, value: 'Option 3'},
        {id: 4, value: 'Option 4'},
    ]

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
      
        // console.log(values);

        setLoading(true);
        const response = await fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            router.push('/admin/quiz-list');
          } else {
            // console.error('Registration Failed')
            setLoading(false);
            toast({
              title: 'Error',
              description: 'Add Question Failed',
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
            name='question'
            render={({ field }) => (
              <FormItem className='flex flex-col h-40'>
                <FormLabel>Question</FormLabel>
                <FormControl>
                <ReactQuill className='h-full mt-1' theme="snow" {...field} placeholder='Question Text' />
                 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

            <div className='mt-4'></div>
            <FormField
            control={form.control}
            name='answer1'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option 1</FormLabel>
                <FormControl>
                  <Input placeholder='Option Text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name='answer2'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option 2</FormLabel>
                <FormControl>
                  <Input placeholder='Option Text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name='answer3'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option 3</FormLabel>
                <FormControl>
                  <Input placeholder='Option Text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name='answer4'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option 4</FormLabel>
                <FormControl>
                  <Input placeholder='Option Text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name='correctAnswer'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <FormControl>
                  <select
                    className='block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    {...field}
                  >
                    {listAnswer.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <div className='flex mt-20 gap-4'>
            <Button className='w-full' type='button' onClick={() => router.push('/admin/quiz-list')}>
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

export default QuestionForm;