
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from "@/components/ui/container";
import { toast } from "@/components/ui/use-toast";
import { apiBaseUrl } from "next-auth/client/_utils";
import { db } from "@/lib/db";


const page = async () => {

    let rows : any[] = [];

    const session = await getServerSession(authOptions);
    console.log(session, 'session');

    console.log(apiBaseUrl, 'apiBaseUrl');
    
    const dataUser = await db.user.findMany();
    if (dataUser.length > 0) {
      rows = dataUser;
      console.log(dataUser, 'dataUser');
    } else {
      // toast({
      //   title: 'Error',
      //   description: "Data User Kosong.",
      //   variant: 'destructive',
      // });
    }
   
    // function createData(
    //   name: string,
    //   calories: number,
    //   fat: number,
    //   carbs: number,
    //   protein: number,
    // ) {
    //   return { name, calories, fat, carbs, protein };
    // }
    

    // const rows = [
    //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //   createData('Eclair', 262, 16.0, 24, 6.0),
    //   createData('Cupcake', 305, 3.7, 67, 4.3),
    //   createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];
    

    return (
      <>
        <div className='w-full font-bold justify-center text-center'>
          USER LIST
        </div>

<Container>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">NAMA</TableCell>
            <TableCell align="right">EMAIL</TableCell>
            <TableCell align="right">KELAS</TableCell>
            <TableCell align="right">JURUSAN</TableCell>
            <TableCell align="right">ROLE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.kelas}</TableCell>
              <TableCell align="right">{row.jurusan}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>

        </>
    );
}

export default page;