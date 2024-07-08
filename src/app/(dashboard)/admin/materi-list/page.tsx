'use client';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { db } from "@/lib/db";
import TableMateri from "@/components/table/TableMateri";
import { Container } from "@/components/ui/container";


const page = async () => {
   

    return (
    <Container>
      <TableMateri />
    </Container>
    );
}

export default page;