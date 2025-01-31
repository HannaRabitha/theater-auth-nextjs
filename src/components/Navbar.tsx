
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import Image from 'next/image'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import UserAccountnav from './UserAccountnav';

// import ThemeChanger from "./DarkSwitch";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'


const Navbar = async () => {

  let isAdmin = false;
  const session = await getServerSession(authOptions);

  if (session?.user.name == 'admin') {
    isAdmin = true;
  }

  const navUser = [
    {
      name: 'Home',
      href: '/',
      current: true
    },
    {
      name: 'About',
      href: '/about',
      current: false
    },
    {
      name: 'Content',
      href: '/all-materi',
      current: false
    },
    {
      name: 'Take a Quiz',
      href: '/quiz',
      current: false
    }
  ];

  const navAdmin = [
    {
      name: 'Home',
      href: '/',
      current: false
    },
    {
      name: 'Admin',
      href: '/admin',
      current: true
    },
    {
      name: 'Materi Management',
      href: '/admin/materi-list',
      current: false
    },
    {
      name: 'Quiz Management',
      href: '/admin/quiz-list',
      current: false
    }
  ];


  return (
    <>
    
<nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
     <Link href='/'>
         <Image
          src="/assets/el-logo.png"
          width={50}
          height={50}
          alt="Picture of the author"
          />
        </Link>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {/* <button type="button" className="text-white bg-[#470E13] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-[#470E13] dark:focus:ring-blue-800">
        Get started</button> */}
        {session?.user ? (
          <UserAccountnav />
        ) : (
          <Link href='/sign-in' className={buttonVariants({ variant: 'brown'})}>
            Sign In
          </Link>
        )}
      {/* <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button> */}
  </div>

  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
  {isAdmin? (
    <>
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {navAdmin.map((item) => (
        <li key={item.name}>
          <Link href={item.href} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#470E13] md:p-0 md:dark:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{item.name}</Link>
        </li>
      ))}
      </ul>
    </>
  ): (
    <>
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {navUser.map((item) => (
        <li key={item.name}>
          <Link href={item.href} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#470E13] md:p-0 md:dark:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{item.name}</Link>
        </li>
      ))}
      </ul>
    </>
  )}
  </div>



  {/* <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="/" className="block py-2 px-3 text-white bg-[#470E13] rounded md:bg-transparent md:text-[#470E13] md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
      </li>
      <li>
        <a href="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#470E13] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
      </li>
      <li>
        <a href="/all-materi" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#470E13] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Content</a>
      </li>
      <li>
        <a href="/quiz" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#470E13] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Take a Quiz</a>
      </li>
    </ul>
  </div> */}



  </div>
</nav>
</>

  
    // <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
    //   <div className='container flex items-center justify-between'>
    //     <Link href='/'>
    //       {/* <HandMetal /> */}
    //       <Image
    //       src="/assets/el-logo.png"
    //       width={50}
    //       height={50}
    //       alt="Picture of the author"
    //       />
    //     </Link>

    //     {session?.user ? (
    //       <UserAccountnav />
    //     ) : (
    //       <Link href='/sign-in' classNameName={buttonVariants()}>
    //         Sign In
    //       </Link>
    //     )}
       
    //   </div>
    // </div>
  );
};

export default Navbar;
