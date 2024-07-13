import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from "next/link";
import { Container } from "@/components/ui/container";

const page = async () => {

    const session = await getServerSession(authOptions);
    console.log(session, 'session');
    

    return (
      <>
      <Container>
      <h1 className="text-2xl  font-bold text-center leading-snug tracking-tight text-[#2968A3] lg:text-3xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
      DASHBOARD ADMIN
      </h1>

        <div className="flex my-4 gap-4">

        <Link href="/admin/user-list">
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/assets/wayang-2.png"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            User Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>
        </Link>
       

        <Link href="/admin/materi-list">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/assets/wayang-2.png"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Materi Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>
      </Link>
        </div>
        </Container>

        </>
    );
}

export default page;