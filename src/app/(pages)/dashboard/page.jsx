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
    <div>
    
      <div className="my-8">

        <h1 className="text-center lg:text-left text-2xl lg:text-3xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground text-center lg:text-left">Manage your JSON data and share with others.</p>

      </div>

      <JsonEditorCard />

    </div>
  )
}

export default Page;