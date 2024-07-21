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
import { useSession, signIn, signOut } from "next-auth/react";
import { Modal as BaseModal } from '@mui/base/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const QuizForm = () => {
    
    const { data: session, status } = useSession();
    const [rows, setRows] = useState<any[]>([]); // Updated to use useState
    const [isLoading, setIsLoading] = useState(true); // Step 1: Initialize loading state
    const [dataQuestion, setDataQuestion] = useState<any>([]);

    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [score, setScore] = useState(0);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    


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
                correctAnswer: item.correctAnswer,
                userAnswer: null
            }
        });
        setDataQuestion(dataQuestion);

        
    }

    function onSubmit(){

        let correctAnswer = 0;
        let score = 0;

        dataQuestion.forEach((item: any) => {
            if(item.userAnswer == item.correctAnswer){
                correctAnswer++;
            }
        });

        score = (correctAnswer / dataQuestion.length) * 100;

        setScore(parseFloat(score.toFixed(2)));
        setCorrectAnswer(correctAnswer);

    
        const data = {
            score: parseFloat(score.toFixed(2)),
            trueAnswer: correctAnswer,
            falseAnswer: dataQuestion.length - correctAnswer,
            email: session?.user?.email
        }
        

        const postData = async () => {
            try {
                const response = await fetch(`/api/score`, {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  body: JSON.stringify(data)
                });
                if (response.ok) {
                    setOpen(true);
                    // const data = await response.json();
                    // console.log(data, 'data');
                    // toast({
                    //     title: 'Success',
                    //     description: 'Submit Quiz Success',
                    //     variant: 'success'
                    // })
                  
                    // window.location.reload();
                } else {
                    toast({
                        title: 'Error',
                        description: 'Submit Quiz Failed',
                        variant: 'destructive'
                    })
                }
            } catch (error) {
                console.error("Failed to submit Quiz:", error);
                toast({
                    title: 'Error',
                    description: 'Failed to submit Quiz',
                    variant: 'destructive'
                })
            }
        }

        postData();
        

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
            
          <Button className='w-full' type='submit'
          onClick={() => onSubmit()}
          variant='yellow'
          >
          Simpan
        </Button>
          </div>
        </div>
       )}
       </>
        )}

    </Container>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Quiz Result
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mt: 2 }}>
            Your Score: {score}%
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 0 }}>
            {correctAnswer} correct answer out of {dataQuestion.length} question
          </Typography>

            <Button className='w-full mt-4' type='button'
                onClick={() => window.location.replace('/')}>
                Close
            </Button>
            <Button className='w-full mt-4' type='button'
                variant='yellow'
                onClick={() => window.location.replace('/quiz')}>
                Try Again
            </Button>

            
        </Box>
      </Modal>

        </>
    );
}


export default QuizForm;