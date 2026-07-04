import { currentUser } from "@clerk/nextjs/server";

import JsonEditorCard from "@/app/_components/JsonEditorCard";
import prismaClientConfig from '@/prismaClientConfig';


const Page = async () => {


  const user = await currentUser();


  if (!user) {

    return null;

  }

  
  const isCurrentlyLoggedInUserDetailsAlreadyPresentInDB = await prismaClientConfig.user.findUnique({
    where: {
      clerkUserId: user?.id
    }
  });


  if (!isCurrentlyLoggedInUserDetailsAlreadyPresentInDB) {

    await prismaClientConfig.user.create({
      data: {
        clerkUserId: user?.id,
        email: user?.emailAddresses[0]?.emailAddress
      }
    });

  }


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-14">

      <div className="mb-8 pb-6 border-b border-slate-200 flex flex-col items-center lg:items-start gap-1">

        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>

        <p className="text-slate-500 text-sm lg:text-base text-center lg:text-left">Manage your JSON data and share with others.</p>

      </div>

      <JsonEditorCard />

    </div>
  )
}

export default Page;