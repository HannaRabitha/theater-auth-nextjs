
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { Container } from './ui/container';


const CardWithImage = async ({data}: any
) => {    
    const session = await getServerSession(authOptions);

    const imgUrl = 'https://cdni.iconscout.com/illustration/premium/thumb/news-article-4427104-3685850.png';

  return (
    <>
      <div className="container mx-auto">
      <div className="relative rounded-lg flex flex-col md:flex-row items-center md:shadow-xl md:h-72 mx-2">
      <div className="z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
        {/* <div className="absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom" style={
            {backgroundImage: `url(${data.imageUrl})`}
        }></div> */}
        {
          !data.link ? (
            <div className="absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom" style={
              {backgroundImage: `url(${imgUrl})`}
          }></div>
          ): ( <div className="absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom" style={
            {backgroundImage: `url(${data.link})`}
        }></div>)
        }
        <div className="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
            <h3 className="w-full font-bold text-2xl text-white leading-tight mb-2">{data.title}</h3>
            <h4 className="w-full text-xl text-gray-100 leading-tight">{data.category}</h4>
        </div>
        <svg className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
      </div>
      <div className="z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
        <div className="p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none">
            <h4 className="hidden md:block text-xl text-gray-400">{data.category}</h4>
            <h3 className="hidden md:block font-bold text-2xl text-gray-700">{data.title}</h3>
            

            <div className='block h-24 overflow-hidden text-gray-600 text-justify' dangerouslySetInnerHTML={{ __html: data.description }}>
            </div>

            {session?.user ? (
            <Link href={`/content/${data.id}`} className="text-blue-600 hover:text-blue-900 focus:text-blue-900">
                     Read More
                     <span className="text-xs ml-1">&#x279c;</span>
                 
            </Link>
            ) : (
                <Link href='/sign-in' className="text-blue-600 hover:text-blue-900 focus:text-blue-900">
                   Sign In to Read More
                   <span className="text-xs ml-1">&#x279c;</span>
                
                </Link>
            )}
           
        </div>
      </div>
      </div>
    </div>
   
    </>
  );
};

export default CardWithImage;
