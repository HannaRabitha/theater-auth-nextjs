'use client';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { db } from "@/lib/db";
import { Container } from "@/components/ui/container";
import TableQuiz from "@/components/table/TableQuiz";


const page = async () => {
   

    return (
    <Container>
      <TableQuiz key={
        Math.random()
      } />
    </Container>
    );
}

export default page;