'use client';


import Link from 'next/link';

import { Button } from '@/components/ui/button';


const Page = () => {
  return (
    <div className="min-h-screen flex flex-col gap-5 items-center">

      <h1 className="mt-12 lg:mt-20 text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-700">
        JShare
      </h1>

      <p className="px-3 lg:px-0 text-muted-foreground text-lg lg:text-xl tracking-wide leading-relaxed text-center">
        JShare provides an intuitive and secure platform where you can easily
        share, and manage your JSON data in just a few simple steps.
        Whether you're working on a personal project, collaborating with a team,
        or sharing data with clients, JShare ensures a smooth and hassle-free
        experience. With seamless authentication, and real-time
        sharing capabilities, JShare makes it easier than ever to manage your
        data and collaborate with others. Simply authenticate, upload, and share
        your JSON files in just a few clicks, and take your data-sharing game to
        the next level.
      </p>

      <Link href='/dashboard'>

        <Button className='mb-8 lg:mb-0 lg:mt-4 py-8 px-10 lg:px-16 text-lg tracking-wide'>
          Get Started
        </Button>

      </Link>

    </div>
  );
};

export default Page;
