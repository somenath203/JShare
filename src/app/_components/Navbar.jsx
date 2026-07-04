'use client';

import { Braces, LogOut } from 'lucide-react';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';


const Navbar = () => {

  const router = useRouter();

  const pathName = usePathname();

  const handleLogoutUser = () => {
    router.push('/');
  }

  return (
    pathName.startsWith('/view-particular-jsondata/') ? <></> : <div className="sticky top-0 z-30 border-b border-slate-200 bg-white px-4 sm:px-6">

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center lg:justify-between mx-auto max-w-4xl py-5">

        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">

          <Link href="/" className="flex items-center gap-2">

            <Braces className="size-6 lg:size-7 text-emerald-600" />

            <span className="font-semibold text-lg lg:text-xl tracking-wide text-slate-900">JsonDrop</span>

          </Link>

          <nav>

            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              Dashboard
            </Link>

          </nav>

        </div>

        <SignedOut>

          <div className='flex items-center gap-2'>

            <SignInButton mode='modal'>

              <Button variant='outline' className="border-slate-200 text-slate-700 hover:bg-slate-50">
                Sign in
              </Button>

            </SignInButton>

            <SignUpButton mode='modal'>

              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Sign up
              </Button>

            </SignUpButton>

          </div>

        </SignedOut>

        <SignedIn>

          <SignOutButton redirectUrl='/'>

            <LogOut
              className='size-5 cursor-pointer text-slate-500 hover:text-slate-900 transition-colors'
              onClick={handleLogoutUser}
            />

          </SignOutButton>

        </SignedIn>

      </div>

    </div>
  );
};

export default Navbar;