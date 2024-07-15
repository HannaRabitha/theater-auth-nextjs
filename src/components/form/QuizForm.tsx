'use client';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/db";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from "@/components/ui/container";
import { toast } from "@/components/ui/use-toast";
import { IconButton, Radio } from "@mui/material";
import { DeleteIcon, EditIcon, Link, TrashIcon } from "lucide-react";
import { set } from "zod";
import { Button } from '../ui/button';



const QuizForm = () => {
    
    const [rows, setRows] = useState<any[]>([]); // Updated to use useState
    const [showModal, setShowModal] = useState(false); // Updated to use useState
    const [isLoading, setIsLoading] = useState(true); // Step 1: Initialize loading state
    const [dataQuestion, setDataQuestion] = useState<any>([]);
    


    // Fetch materi data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Step 2: Set loading state to true
                const response = await fetch('/api/quiz2'); // Adjust the API endpoint as needed
                const data = await response.json();
                console.log(data, 'data');

                initDataQuestion(data);

                
                setRows(data); // Assuming the API returns an array of materi
                setIsLoading(false); // Step 3: Set loading state to false
            } catch (error) {
                console.error("Failed to fetch All Question:", error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch All Question',
                    variant: 'destructive'
                
                })
            }
        };
        fetchData();
    }, []); //

    function initDataQuestion(data: any){
        const dataQuestion = data.map((item: any) => {
            return {
                id: item.id,
                question: item.question,
                answer1: item.answer1,
                answer2: item.answer2,
                answer3: item.answer3,
                answer4: item.answer4,
                userAnswer: null
            }
        });
        setDataQuestion(dataQuestion);

        
    }



    function onDelete(id: any){
        const deleteData = async () => {
            try {
                const response = await fetch(`/api/quiz/${id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-type': 'application/json'
                  }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data, 'data');
                    toast({
                        title: 'Success',
                        description: 'Delete Question Success',
                        variant: 'success'
                    })
                  
                    window.location.reload();
                } else {
                    toast({
                        title: 'Error',
                        description: 'Delete Question Failed',
                        variant: 'destructive'
                    })
                }
            } catch (error) {
                console.error("Failed to delete Question:", error);
                toast({
                    title: 'Error',
                    description: 'Failed to delete Question',
                    variant: 'destructive'
                })
            }
        }

        deleteData();
    }


    return (
        <>
        <Container>

        {isLoading ? (
            <div className='flex justify-center items-center w-full h-full'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#2968A3]'></div>
            </div>
        ) : (
       <>
       {rows.length == 0 ? (
        <div>
            Tidak Ada Data
        </div>
       ): (
        <div>
            {rows.map((row) => (
                <div key={row.id} className="">
                    <div className="mt-4">
                        <span className="font-bold">Question:</span>
                        <div dangerouslySetInnerHTML={{ __html: row.question }}>
                        </div>
                    </div>

                    {[1,2,3,4].map((i) => (
                        <div key={i}>
                           <Radio
                            checked={dataQuestion.find((item: any) => item.id == row.id)?.userAnswer == i}
                            onChange={() => {
                                const newDataQuestion = dataQuestion.map((item: any) => {
                                    if(item.id == row.id){
                                        item.userAnswer = i;
                                    }
                                    return item;
                                });
                                setDataQuestion(newDataQuestion);
                                console.log(newDataQuestion, 'newDataQuestion');
                                
                            }}
                           />
                            {String.fromCharCode(i-1 + 'A'.charCodeAt(0))}. &nbsp; {row[`answer${i}`]}
                            </div>
                    ))}
                            
                   
                    </div>
            ))}


        <div className='flex mt-20 gap-4'>
           
            <Button className='w-full' type='button'
            onClick={() => window.location.replace('/')}>
            Batal
            </Button>
            
          <Button className='w-full' type='submit'>
          Simpan
        </Button>
          </div>
        </div>
       )}
       </>
        )}

    </Container>
        </>
    );
}

export default QuizForm;