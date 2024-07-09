import { FC, ReactNode } from 'react';
import bgDrama from '../../../public/assets/bg-drama.jpg';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
  <div className='w-full -mt-4 flex bg-[#E64A3B] h-screen bg-[url("/assets/bg-drama.jpg")] bg-center bg-cover justify-center' style={{ backgroundImage: `url(${bgDrama})` }}>
    <div className='justify-center lg:mt-8 my-auto h-fit bg-[#FFE8DA] w-full lg:w-1/2 lg:p-10 p-4 rounded-lg border border-3 border-black'>{children}</div>
  </div>
  );
};

export default AuthLayout;
