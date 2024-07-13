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


const TableMateri = () => {
    
    const [rows, setRows] = useState<any[]>([]); // Updated to use useState
    const [showModal, setShowModal] = useState(false); // Updated to use useState
    const [isLoading, setIsLoading] = useState(true); // Step 1: Initialize loading state


    // Fetch materi data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Step 2: Set loading state to true
                const response = await fetch('/api/materi'); // Adjust the API endpoint as needed
                const data = await response.json();
                console.log(data, 'data');
                
                setRows(data); // Assuming the API returns an array of materi
                setIsLoading(false); // Step 3: Set loading state to false
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
    }, []); //




    return (
        <>
        <Container>
        <div className="flex justify-between">
        <div className='font-bold justify-center text-center'>
          MATERI LIST
        </div>

        <Button variant="contained" href="/admin/materi-add">
          Add Materi
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
          <TableRow>
            <TableCell align="right">JUDUL</TableCell>
            <TableCell align="right">CONTENT</TableCell>
            <TableCell align="right">ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.content}</TableCell>
              <TableCell align="right">
              <IconButton style={
                {color: 'green'}
              } aria-label="check" className="icon" href={`/admin/materi-edit/${row.id}`}>
                <EditIcon className="checkIcon"/>
              </IconButton>
                <IconButton style={
                  {color: 'red'}
                } aria-label="check" className="icon" href={`/admin/materi-delete/${row.id}`}>
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

export default TableMateri;