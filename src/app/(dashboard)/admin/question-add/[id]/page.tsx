'use client';
import react from 'react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from '../../../../../components/ui/use-toast';
import { FormControl, FormGroup, FormLabel, Input, InputLabel } from "@mui/material";
import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/utils/supabase/client";
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { Button } from '../../../../../components/ui/button';


const QuestionEditForm = ({params}: any) => {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
        
    const [dataQuestion, setDataQuestion] = useState<any>({
        id: '',
        question: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        correctAnswer: ''
    });


    const { id } = params
    console.log(id)

   
      // Fetch materi data
      useEffect(() => {
        
        setLoading(true); // Step 2: Set loading state to true
      
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/quiz/${id}`); // Adjust the API endpoint as needed
                const data = await response.json();
                console.log(data, 'data');

                setDataQuestion(data);
                setLoading(false); // Step 3: Set loading state to false


            } catch (error) {
                setLoading(false);
                console.error("Failed to fetch Question:", error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch Question',
                    variant: 'destructive'
                
                })
            }
        };
        fetchData();
    }, []); //



    async function onSubmit() {
        setLoading(true);
        console.log(dataQuestion, 'payload');
        
        const response = await fetch(`/api/quiz/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(dataQuestion),
        });

        if (response.ok) {
            router.push('/admin/quiz-list');
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
       <div className='gap-y-6 flex flex-col p-8'>

    <FormGroup className='h-40 mb-20'>
            <FormControl>
            <FormLabel htmlFor="title">Question</FormLabel>
                <ReactQuill className='h-40 mt-1' theme="snow" value={dataQuestion.question}
                onChange={(value) => {
                    setDataQuestion({
                        ...dataQuestion,
                        question: value
                    })
                }}
                placeholder='Isi Konten Materi' />
            </FormControl>
        </FormGroup>

     <FormGroup>
            <FormControl>
                <FormLabel htmlFor="title">Option 1</FormLabel>
                <Input type="text" id="answer1" value={dataQuestion.answer1}
                onChange={
                    (e) => {
                        setDataQuestion({
                            ...dataQuestion,
                            answer1: e.target.value
                        })
                    }
                }
                 />
            </FormControl>
        </FormGroup>

        <FormGroup>
            <FormControl>
                <FormLabel htmlFor="title">Option 2</FormLabel>
                <Input type="text" id="answer2" value={dataQuestion.answer2}
                onChange={
                    (e) => {
                        setDataQuestion({
                            ...dataQuestion,
                            answer2: e.target.value
                        })
                    }
                }
                 />
            </FormControl>
        </FormGroup>

        <FormGroup>
            <FormControl>
                <FormLabel htmlFor="title">Option 3</FormLabel>
                <Input type="text" id="answer3" value={dataQuestion.answer3}
                onChange={
                    (e) => {
                        setDataQuestion({
                            ...dataQuestion,
                            answer3: e.target.value
                        })
                    }
                }
                 />
            </FormControl>
        </FormGroup>

        <FormGroup>
            <FormControl>
                <FormLabel htmlFor="title">Option 4</FormLabel>
                <Input type="text" id="answer4" value={dataQuestion.answer4}
                onChange={
                    (e) => {
                        setDataQuestion({
                            ...dataQuestion,
                            answer4: e.target.value
                        })
                    }
                }
                 />
            </FormControl>
        </FormGroup>

        <FormGroup>
            <FormControl>
                <FormLabel htmlFor="title">Correct Answer</FormLabel>
                <select id="correctAnswer" value={dataQuestion.correctAnswer}
                onChange={
                    (e) => {
                        setDataQuestion({
                            ...dataQuestion,
                            correctAnswer: e.target.value
                        })
                    }
                }>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                </select>
            </FormControl>
        </FormGroup>
       

      

        <div className='flex mt-20 gap-4'>
        <Button className='w-full' type='button' onClick={() => router.push('/admin/quiz-list')}>
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

export default QuestionEditForm;