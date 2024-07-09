import React from 'react';
import elfullLogo from '../../../public/assets/elfull-logo.png';
import Link from 'next/link';
import Image from 'next/image';

const page = async () => {

    const img = 'https://statik.tempo.co/data/2024/05/03/id_1299334/1299334_720.jpg';
    return (
<div className=''>
   
           
    <div className="container mx-auto">
      <div className="relative rounded-lg flex flex-col md:flex-row items-center  md:h-screen mx-2">
      <div className="z-0 order-1 md:order-2 relative w-full md:w-1/2 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
        <div className="absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom" style={
            {backgroundImage: `url(${img})`}
        }></div>
        <div className="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
            <h3 className="w-full font-bold text-2xl text-white leading-tight mb-2">EL NAMA</h3>
            <h4 className="w-full text-xl text-gray-100 leading-tight">About Us</h4>
        </div>
        <svg className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
      </div>
      <div className="z-10 order-2 md:order-1 w-full h-full md:w-1/2 flex items-center -mt-6 md:mt-0">
        <div className="p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg">
            <h4 className="hidden md:block text-xl text-gray-400">About Us</h4>
            <h3 className="hidden md:block font-bold text-2xl text-gray-700">Teater El Nama</h3>
           
            <div className='flex flex-col justify-between'>
            <p className="text-gray-600 text-justify">
                
            Teater ELnama Indonesia. Sebuah teater independen yang dibangun di atas wilayah kreatifitas yang bebas dan terbuka.
            </p>

            <Image
              src={elfullLogo}
              width="400"
              height="400"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
            </div>


        
                {/* <Link href='/sign-in' className="text-blue-600 hover:text-blue-900 focus:text-blue-900">
                   Sign In to Read More
                   <span className="text-xs ml-1">&#x279c;</span>
                
                </Link> */}
       
           
        </div>
      </div>
      </div>
    </div>
        </div>
    );
};

export default page;