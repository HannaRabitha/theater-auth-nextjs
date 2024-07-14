import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import cloudImg  from "../../public/assets/cloud.png";
import footerImg from "../../public/assets/footer.png";
import wayang2 from "../../public/assets/wayang-2.png";
import Provider from '@/components/Provider';
import { map } from "zod";
import MenuSection from "@/components/MenuSection";



export default async function Home() {

  let isAdmin = false;
  const session = await getServerSession(authOptions);
  
  if (session?.user.name == 'admin') {
    isAdmin = true;
  }


  const menu = [{
    id: 1,
    category: 'Sejarah',
    title: 'Seni Teater',
    description: 'Sejarah seni teater telah dipertunjukkan sejak abad kelima zaman Yunani Kuno. Pertunjukan-pertunjukan drama berlangsung di berbagai teater seperti Dionisos, Akropolis, Athena, Yunani. Teater tersebut menjadi salah satu bentuk hiburan paling populer di Yunani.',
    imageUrl: 'https://binus.ac.id/wp-content/uploads/2021/09/235-1-cerdikacom.jpg',
    link: '/content/1'
  },
  {
    id: 2,
    category: 'Jenis-Jenis',
    title: 'Seni Teater',
    description: 'Teater Tradisional, Teater Modern, Teater Musikal, Teater Monolog, Teater Komedi, Teater Drama, Teater Tari, Teater Boneka, Teater Sandiwara, Teater Opera, Teater Wayang',
    imageUrl: 'https://konten.usu.ac.id/storage/posts/18823/Grid%20Konser%20Prodi%20Etnomusikologi%20FIB%20USU.jpeg',
    link: '/content/2'
  },
  
  {
    id: 3,
    category: 'Tentang',
    title: 'Teater Elnama',
    description: 'Teater ELnama Indonesia. Sebuah teater independen yang dibangun di atas wilayah kreatifitas yang bebas dan terbuka.',
    imageUrl: 'https://statik.tempo.co/data/2024/05/03/id_1299334/1299334_720.jpg',
    link: '/about'
  },
  {
    id: 3,
    category: 'Semua Materi',
    title: 'Materi lainnya...',
    description: 
    'Klik disini untuk melihat semua materi yang ada di website ini. Materi yang ada di website ini berisi tentang sejarah seni teater, jenis-jenis seni teater, dan lain-lain.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
    link: '/all-materi'
  }]

  return (<>
<div className="flex flex-col h-fit">
 <Container className="flex flex-wrap z-10 ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">


          <div className="flex justify-between w-full items-end">
          <div>
          {session?.user ? (
             <h1 className="text-4xl font-bold leading-snug tracking-tight text-[#0d0401] lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
             Welcome <br/>
             <span className="text-[#2968A3]">
              {session?.user.name}!
             </span>
           </h1>
          ): (
             <h1 className="text-4xl font-bold leading-snug tracking-tight text-[#0d0401] lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
             Welcome to <br/>
             <span className="text-[#2968A3]">Teater el Na&#39;ma</span>
           </h1>
          )}

          </div>

          <div className="lg:hidden flex">
              <Image
              src={wayang2}
              width="150"
              height="150"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
            </div>

            </div>
          
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Website berisi informasi tentang Teater el Na&#39;ma, berisi penjelasan Sejarah Seni Teater, jenis-jenis seni teater, dan lain-lain.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">

              {isAdmin? (
                <Link href='/admin' className={buttonVariants({ variant: 'yellow', size: 'lg'})}>
                  Admin Dashboard
                </Link>
              ): ( <>
                {session?.user ? (
                  <Link href='#menu' className={buttonVariants({ variant: 'yellow', size: 'lg'})}>
                  Explore Now
                </Link>
                ) : (
                  <Link href='/sign-up' className={buttonVariants({ variant: 'blue', size: 'lg'})}>
                    Register
                  </Link>
                )}
                </>
              )}
            
              <a
                href="https://www.instagram.com/teaterelnama/"
                target="_blank"
                rel="noopener"
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <InstagramLogo/>
                <span> Follow Us</span>
              </a>
            </div>
          </div>
        </div>
        <div className="lg:flex items-center justify-center w-full hidden lg:w-1/2">
          <div className="">
            <Image
              src={wayang2}
              width="516"
              height="517"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      {/* <Container> */}
    {/* <div className="w-full max-w-screen-xl mx-auto ">
        <div className="flex items-center justify-between">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image
              src={elFullLogo}
              width="150"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
            </a>
            <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 " />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 20244 <a href="https://flowbite.com/" className="hover:underline">ITDigital™</a>. All Rights Reserved.</span>
    </div> */}
      {/* </Container> */}

      <section id="menu">
      <div className="relative">
      <div className="-mt-18 lg:-mt-40 z-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#a2d9ff" fillOpacity="1" d="M0,96L40,117.3C80,139,160,181,240,181.3C320,181,400,139,480,133.3C560,128,640,160,720,165.3C800,171,880,149,960,133.3C1040,117,1120,107,1200,106.7C1280,107,1360,117,1400,122.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
      </svg>
        <div className="absolute mb-6 bottom-0">
          <Image
              src={cloudImg}
              className={"object-cover"}
              alt="Hero Illustration"
              width="1920"
              loading="eager"
              placeholder="blur"
            />
         
        </div>
      </div>
      <h1 className="text-2xl bg-[#a2d9ff] font-bold text-center leading-snug tracking-tight text-[#2968A3] lg:text-3xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
      Reading Section
      </h1>
      
      </div>


        {menu.map((item) => {
          return (
           <>
           <div className="gap-y-4 -mt-4 pt-8 mt-0 bg-[#a2d9ff] w-full pb-10">
            <MenuSection data={item} key={item.id}/>
            </div>
           </>
          );
        })}

        </section>
      

    <div className="lg:-mt-36 -mt-20 z-0">
    <Image
              src={footerImg}
              className={"object-cover"}
              alt="Hero Illustration"
              width="1920"
              loading="eager"
              placeholder="blur"
            />
            </div>
    </div>
  
  </>);

}


function InstagramLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.829 6.302c-.738-.034-.96-.04-2.829-.04s-2.09.007-2.828.04c-1.899.087-2.783.986-2.87 2.87-.033.738-.041.959-.041 2.828s.008 2.09.041 2.829c.087 1.879.967 2.783 2.87 2.87.737.033.959.041 2.828.041 1.87 0 2.091-.007 2.829-.041 1.899-.086 2.782-.988 2.87-2.87.033-.738.04-.96.04-2.829s-.007-2.09-.04-2.828c-.088-1.883-.973-2.783-2.87-2.87zm-2.829 9.293c-1.985 0-3.595-1.609-3.595-3.595 0-1.985 1.61-3.594 3.595-3.594s3.595 1.609 3.595 3.594c0 1.985-1.61 3.595-3.595 3.595zm3.737-6.491c-.464 0-.84-.376-.84-.84 0-.464.376-.84.84-.84.464 0 .84.376.84.84 0 .463-.376.84-.84.84zm-1.404 2.896c0 1.289-1.045 2.333-2.333 2.333s-2.333-1.044-2.333-2.333c0-1.289 1.045-2.333 2.333-2.333s2.333 1.044 2.333 2.333zm-2.333-12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.958 14.886c-.115 2.545-1.532 3.955-4.071 4.072-.747.034-.986.042-2.887.042s-2.139-.008-2.886-.042c-2.544-.117-3.955-1.529-4.072-4.072-.034-.746-.042-.985-.042-2.886 0-1.901.008-2.139.042-2.886.117-2.544 1.529-3.955 4.072-4.071.747-.035.985-.043 2.886-.043s2.14.008 2.887.043c2.545.117 3.957 1.532 4.071 4.071.034.747.042.985.042 2.886 0 1.901-.008 2.14-.042 2.886z"/></svg>
  );
}

function MicrosoftLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg>
  );
}

function NetflixLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="108"
      height="29"
      fill="none"
      viewBox="0 0 108 29">
      <g>
        <path
          fill="currentColor"
          d="M14.714 27.096c-1.61.283-3.248.367-4.942.593L4.603 12.551V28.34c-1.61.17-3.078.395-4.603.621V.04h4.293l5.874 16.409V.039h4.547v27.057zm8.897-16.465c1.75 0 4.434-.085 6.044-.085v4.519c-2.006 0-4.35 0-6.044.085v6.721c2.655-.17 5.31-.395 7.992-.48v4.35l-12.511.988V.039h12.511v4.52h-7.992v6.072zm24.797-6.072h-4.689v20.786c-1.525 0-3.05 0-4.518.056V4.56h-4.688V.039h13.895v4.52zm7.343 5.761h6.185v4.519H55.75V25.09h-4.435V.04h12.625v4.519h-8.19v5.761zm15.533 10.817c2.57.056 5.168.254 7.682.395v4.463c-4.038-.255-8.077-.509-12.2-.594V.04h4.518v21.097zm11.495 5.168c1.44.085 2.965.17 4.434.34V.04h-4.434v26.265zM107.01.04l-5.733 13.754 5.733 15.166c-1.695-.226-3.389-.537-5.084-.819l-3.248-8.36-3.304 7.683c-1.638-.283-3.22-.368-4.857-.594l5.818-13.246L91.082.04h4.858l2.965 7.597L102.07.04h4.942z"></path>
      </g>
    </svg>
  );
}

function SonyLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="136"
      height="24"
      viewBox="0 0 351 61">
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill="currentColor" fillRule="nonzero">
          <path d="M345.559 49.001a5.448 5.448 0 00-4.81 2.72 5.538 5.538 0 000 5.559 5.448 5.448 0 004.81 2.719 5.425 5.425 0 003.855-1.618A5.513 5.513 0 00351 54.487c0-1.454-.573-2.85-1.593-3.879a5.42 5.42 0 00-3.848-1.607zm0 10.337a4.774 4.774 0 01-3.4-1.42 4.85 4.85 0 01-1.399-3.43c0-1.282.507-2.51 1.407-3.415a4.768 4.768 0 013.392-1.409c1.269 0 2.485.509 3.383 1.413a4.84 4.84 0 011.4 3.41 4.847 4.847 0 01-1.393 3.427 4.77 4.77 0 01-3.39 1.424z"></path>
          <path d="M348.163 53.183c0-.503-.223-1.032-.67-1.285-.45-.265-.952-.291-1.456-.291h-2.604v5.958h.729v-2.748h1.344l1.706 2.748h.868l-1.805-2.748c1.065-.03 1.888-.462 1.888-1.634zm-2.882 1.06h-1.121v-2.107h1.706c.742 0 1.556.112 1.556 1.034.002 1.213-1.303 1.073-2.14 1.073zm-31.199-29.868l10.93-11.639c.634-.854.95-1.453.95-1.965 0-.854-.738-1.196-3.055-1.196h-2.758V2.227H350v7.348h-3.922c-4.53 0-5.371.682-11.691 8.628l-17.292 18.622V48.19c0 2.907 1.472 3.93 5.686 3.93h6.529v7.09H287.5v-7.09h6.527c4.211 0 5.687-1.023 5.687-3.93V36.825l-20.366-22.468c-3.366-3.928-2.9-4.782-12.271-4.782V2.227h37.811v7.348h-2.692c-2.74 0-3.9.512-3.9 1.536 0 .857.842 1.54 1.369 2.222l10.304 11.199c1.224 1.27 2.718 1.434 4.113-.157zM60.388 2.225h9.12v20.503h-8.423c-.746-4.099-3.318-5.693-5.664-7.844-4.231-3.877-13.395-7.106-21.102-7.106-9.948 0-18.344 3.077-18.344 7.602 0 12.56 56.892 2.565 56.892 26.314C72.867 54.08 60.68 61 38.796 61c-7.577 0-19.041-2.345-25.805-5.927-2.12-1.22-3.02 1.156-3.418 4.134H.22V38.02h8.46c1.865 5.383 4.435 6.491 6.8 8.628 4.101 3.76 13.865 6.496 22.82 6.408 13.5-.133 18.142-3.076 18.142-7.348 0-4.27-4.591-5.297-19.385-7.602l-12.562-2.051C10.321 33.918 0 30.758 0 19.482 0 7.778 13.056.43 33.7.43c8.699 0 15.977 1.16 22.963 5.097 1.934 1.254 3.75 1.404 3.725-3.302zM238.39 36.552l.18-22.787c0-2.99-1.56-4.015-6.016-4.015h-5.236V2.66h33.315v7.09h-4.342c-4.46 0-6.02 1.027-6.02 4.015V59.64l-13.04-.103-42.228-39.878v28.96c0 2.906 1.56 4.015 6.017 4.015h5.797v7.006h-34.6v-7.006h5.733c4.456 0 6.016-1.11 6.016-4.014V13.765c0-2.99-1.56-4.015-6.016-4.015h-5.733V2.66h29.914l36.26 33.892zM126.796 0c-26.551 0-43.172 11.706-43.172 30.498 0 18.456 16.39 30.072 42.362 30.072 27.586 0 43.632-11.446 43.632-31.01C169.62 11.962 152.304 0 126.796 0zm-.604 53.14c-14.697 0-23.145-8.459-23.145-23.068 0-14.266 8.816-22.724 23.88-22.724 14.451 0 22.899 8.63 22.899 23.324 0 14.352-8.572 22.468-23.634 22.468z"></path>
        </g>
      </g>
    </svg>
  );
}

function VerizonLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="138"
      height="31"
      viewBox="0 0 658 146">
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g>
          <path
            fill="currentColor"
            d="M642.7 0L606.8 76.8 593.3 47.7 578.7 47.7 600.9 95.3 612.7 95.3 657.2 0z"></path>
          <path
            fill="currentColor"
            fillRule="nonzero"
            d="M488.7 142.6h28.9V89.7c0-12.1 7-20.6 17.4-20.6 10 0 15.2 7 15.2 17.1v56.4h28.9V80.7c0-21-12.6-35.8-33-35.8-13 0-22.1 5.6-28.9 15.8h-.6v-13h-28l.1 94.9zm-56.8-97.5c-30.2 0-50.4 21.7-50.4 50.3 0 28.4 20.2 50.3 50.4 50.3s50.4-21.9 50.4-50.3c.1-28.6-20.2-50.3-50.4-50.3zm-.2 79.2c-13.7 0-21-11.5-21-28.9 0-17.6 7.2-28.9 21-28.9 13.7 0 21.3 11.3 21.3 28.9.1 17.4-7.5 28.9-21.3 28.9zm-132.6 18.3h81.2v-22.8h-46v-.6l44-49.3V47.6h-79.2v22.9h44.5v.6l-44.5 49.7v21.8zm-37.1 0h29.1V47.7H262v94.9zm-67.5 0h29V99c0-19.8 11.9-28.6 30-26.1h.6v-25c-1.5-.6-3.2-.7-5.9-.7-11.3 0-18.9 5.2-25.4 16.3h-.6V47.7h-27.7v94.9zm-53.2-18.2c-12.8 0-20.6-8.3-22.1-21.1h68.4c.2-20.4-5.2-36.7-16.5-46.9-8-7.4-18.5-11.5-31.9-11.5-28.6 0-48.4 21.7-48.4 50.1 0 28.6 18.9 50.4 50.3 50.4 11.9 0 21.3-3.2 29.1-8.5 8.3-5.7 14.3-14.1 15.9-22.4h-27.8c-2.7 6.2-8.5 9.9-17 9.9zm-1.5-58.8c10.2 0 17.2 7.6 18.4 18.7h-38.8c2.3-11.2 8.4-18.7 20.4-18.7zM33 142.6h30.4l33-94.9H67.3l-18.5 61h-.4l-18.5-61H0l33 94.9zM262 13.9h29.1v25.8H262V13.9z"></path>
        </g>
      </g>
    </svg>
  );
}
