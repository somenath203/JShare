'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import dynamic from 'next/dynamic';
import Link from "next/link";
import { useUser } from '@clerk/nextjs';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });


const Page = () => {

  
  const params = useParams();

  const id = params?.id;


  const { user } = useUser();
  

  const [ jsonFullInfo, setJsonFullInfo ] = useState({});

  const [ isError, setIsError ] = useState(false);

  const [ errorMessage, setErrorMessage ] = useState('');

  const [ loading, setLoading ] = useState(false);


  const getParticularJsonData = async () => {

    try {

      setLoading(true);


      const { data } = await axios.get(`/api/fetch-particular-json-data?jsonDataId=${id}`);


      if (data?.success === true) {

        setJsonFullInfo(data?.data);

        setIsError(false);

        setErrorMessage(data?.message);
        
      } else if (data?.success === false) {

        setJsonFullInfo({});

        setIsError(true);

        setErrorMessage

      }
      
    } catch (error) {

      console.log(error);
      
      
      setJsonFullInfo({});

      setIsError(true);
      
      setErrorMessage(error?.response?.data?.message);
      
    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    if (id) {

      getParticularJsonData();

    }

  }, [id]);

  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      { loading ? (

          <div>

            <LoaderCircle className='size-10 transition-all animate-spin duration-700' />

          </div>

        ) : isError ? (

          <Alert variant="destructive">

            <AlertTitle className='text-sm lg:text-lg font-medium tracking-wider'>Error</AlertTitle>

            <AlertDescription className='text-base lg:text-xl font-medium tracking-wider'>
              {errorMessage}
            </AlertDescription>

          </Alert>

        ) : jsonFullInfo && <Card className='w-11/12 h-80 overflow-y-scroll'>

          <CardHeader>

            <CardTitle className='text-xl capitalize'>{jsonFullInfo?.name}</CardTitle>
            
            {user?.emailAddresses[0]?.emailAddress !== jsonFullInfo?.emailIdOfTheProfileWhoCreatedTheJson && <CardDescription>Shared by: <span className='font-bold tracking-wider'>{jsonFullInfo?.emailIdOfTheProfileWhoCreatedTheJson?.split('@')[0]}</span> </CardDescription>}
          
          </CardHeader>

          <CardContent>

            {jsonFullInfo?.content && (
              
              <div className='bg-slate-100 p-4 rounded-xl'>

                <ReactJson
                  src={JSON.parse(jsonFullInfo?.content)}
                  enableClipboard={true}
                  displayDataTypes={false}
                  displayObjectSize={false}
                />

              </div>

            )}

          </CardContent>

          <CardFooter className='flex items-center justify-center'>
            
            {!user?.id ? <Link href={process.env.NEXT_PUBLIC_WEBSITE_BASE_URL} target='_blank' className='flex items-center justify-center'>

              <p className='text-center text-sm tracking-wide text-blue-500 font-semibold hover:underline'>Want to create and share JSON effortlessly? Visit JShare and get started today!</p>

            </Link> : <Link href='/dashboard' className='flex items-center justify-center'>

              <p className='text-center text-sm tracking-wide text-blue-500 font-semibold hover:underline'>Back to Dashboard</p>

            </Link>}

          </CardFooter>

        </Card> }

    </div>
  )
}

export default Page;