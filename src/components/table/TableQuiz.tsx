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
import { Button, IconButton } from "@mui/material";
import { DeleteIcon, EditIcon, TrashIcon } from "lucide-react";
import { set } from "zod";


const TableQuiz = () => {
    
    const [rows, setRows] = useState<any[]>([]); // Updated to use useState
    const [showModal, setShowModal] = useState(false); // Updated to use useState
    const [isLoading, setIsLoading] = useState(true); // Step 1: Initialize loading state


    // Fetch materi data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Step 2: Set loading state to true
                const response = await fetch('/api/quiz'); // Adjust the API endpoint as needed
                const data = await response.json();
                console.log(data, 'data');
                
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
        <div className="flex justify-between">
        <div className='font-bold justify-center text-center'>
          DAFTAR PERTANYAAN QUIZ
        </div>

        <Button variant="contained" href="/admin/question-add">
          Add Question
        </Button>
        </div>

        {isLoading ? (
            <div className='flex justify-center items-center w-full h-full'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#2968A3]'></div>
            </div>
        ) : (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="">
            <TableCell className="w-1/2" align="left">QUESTION</TableCell>
            <TableCell className="" align="left">OPTIONS</TableCell>
            <TableCell align="center">CORRECT ANSWER</TableCell>
            <TableCell align="center">ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell className="w-1/2" align="left">
                <div dangerouslySetInnerHTML={{ __html: row.question }}>
                </div>
              </TableCell>
              <TableCell align="left">
               <ol className="list-decimal">
                    <li>{row.answer1}</li>
                    <li>{row.answer2}</li>
                    <li>{row.answer3}</li>
                    <li>{row.answer4}</li>
               </ol>
              </TableCell>
              <TableCell className="" align="center">
                {row.correctAnswer}. &nbsp;
                {row.correctAnswer == 1 ? row.answer1 : row.correctAnswer == 2 ? row.answer2 : row.correctAnswer == 3 ? row.answer3 : row.answer4}
              </TableCell>

              <TableCell align="center">
              <IconButton style={
                {color: 'green'}
              } aria-label="check" className="icon" href={`/admin/question-add/${row.id}`}>
                <EditIcon className="checkIcon"/>
              </IconButton>
                <IconButton style={
                  {color: 'red'}
                } aria-label="check" className="icon" 
                onClick={
                  () => {
                      onDelete(row.id);
                  }}>
                <TrashIcon className="checkIcon" />
              </IconButton>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
</TableContainer>
        )}

    </Container>
        </>
    );
}

export default TableQuiz;