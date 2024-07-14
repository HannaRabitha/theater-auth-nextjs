import MenuSection from "@/components/MenuSection";
import React from "react";
import { db } from "@/lib/db";
import CardWithImage from "@/components/CardWithImage";



const page = async () => {
   
      let rows : any[] = [];
      const dataMateri = await db.materi.findMany();

      if (dataMateri.length > 0) {
        rows = dataMateri;
        console.log(dataMateri, 'dataMateri');
      } else {}
    

    return (
        <div>

        {dataMateri.map((item) => {
          return (
           <>
          <div className="gap-y-2 -mt-4 pt-2 mt-0 w-full pb-6">
            <CardWithImage data={item} key={item.id}/>
            </div>
           </>
          );
        })}

        </div>
    );
};

export default page;

