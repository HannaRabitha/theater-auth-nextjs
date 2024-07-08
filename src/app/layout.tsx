import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Teater Website',
  description: "'Teater el Na'ma'",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>

        <Provider>
        <main className='h-screen w-full flex flex-col'>
          <Navbar />
          <div className='mt-24'>
          {children}
          </div>
        </main>
        <Toaster />
        </Provider>
      </body>
    </html>
  );
}
