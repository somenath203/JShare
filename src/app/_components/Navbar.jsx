'use client';

import { ExternalLinkIcon, LogOut } from 'lucide-react';
import Link from 'next/link';
import { SignedIn, SignedOut,  SignInButton, SignOutButton, SignUpButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';


const Navbar = () => {


  const router = useRouter();

  const pathName = usePathname();


  const handleLogoutUser = () => {

    router.push('/');

  }
  

  return (
    pathName.startsWith('/view-particular-jsondata/') ? <></> : <div className="sticky top-0 z-30 border-b bg-background px-4 sm:px-6">

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center lg:justify-between mx-auto max-w-4xl py-5">


        <div className="flex flex-col lg:flex-row items-center gap-4">

          <Link href="/" className="flex items-center gap-2">

            <ExternalLinkIcon className="size-6 lg:size-8" />

            <span className="font-semibold text-lg lg:text-xl tracking-wider">JShare</span>

          </Link>

          <nav>

            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>

          </nav>

        </div>


        <SignedOut>

          <div className='flex items-center gap-2'>

            <SignInButton mode='modal'> 
              
              <Button variant='outline'>Sign In</Button>

            </SignInButton>

            <SignUpButton mode='modal'>
              
              <Button variant='outline'>Sign Up</Button>

            </SignUpButton>

          </div>


        </SignedOut>


        <SignedIn>

          <SignOutButton redirectUrl='/'>

            <LogOut 
              className='size-5 cursor-pointer' 
              onClick={handleLogoutUser}
            />

          </SignOutButton>

        </SignedIn>


      </div>

    </div>
  );
};

export default Navbar;
