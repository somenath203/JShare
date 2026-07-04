'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from "axios";
import { LoaderCircle, Braces, AlertCircle, Mail, Home } from "lucide-react";
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10">

      <Link href="/" className="flex items-center gap-2 mb-8">

        <Braces className="size-6 text-emerald-600" />

        <span className="font-semibold text-lg tracking-wide text-slate-900">JsonDrop</span>

      </Link>

      { loading ? (

          <div className="flex flex-col items-center gap-3 py-16">

            <LoaderCircle className='size-8 text-slate-400 animate-spin' />

            <p className="text-sm text-slate-400">Loading JSON data</p>

          </div>

        ) : isError ? (

          <Alert variant="destructive" className="w-full lg:w-2/3 max-w-lg">

            <AlertCircle className="size-4" />

            <AlertTitle className='text-sm lg:text-base font-semibold'>Error</AlertTitle>

            <AlertDescription className='text-sm lg:text-base'>
              {errorMessage}
            </AlertDescription>

          </Alert>

        ) : jsonFullInfo && <Card className='w-full lg:w-11/12 max-w-4xl border-slate-200 shadow-sm'>

          <CardHeader className="border-b border-slate-200 pb-5">

            <CardTitle className='text-xl text-slate-900 capitalize tracking-tight'>{jsonFullInfo?.name}</CardTitle>
            
            {user?.emailAddresses[0]?.emailAddress !== jsonFullInfo?.emailIdOfTheProfileWhoCreatedTheJson && (

              <CardDescription className="text-slate-500 flex items-center gap-2 mt-1">

                <span>Shared by</span>

                <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">

                  <Mail className="size-3.5 text-emerald-600" />

                  {jsonFullInfo?.emailIdOfTheProfileWhoCreatedTheJson}

                </span>

              </CardDescription>

            )}
          
          </CardHeader>

          <CardContent className="pt-6 max-h-96 overflow-auto">

            {jsonFullInfo?.content && (

              <ReactJson
                src={JSON.parse(jsonFullInfo?.content)}
                enableClipboard={true}
                displayDataTypes={false}
                displayObjectSize={false}
                style={{ fontSize: '13px', fontFamily: 'var(--font-mono, monospace)' }}
              />

            )}

          </CardContent>

          <CardFooter className='flex flex-col items-center justify-center gap-3 border-t border-slate-200 pt-5'>
            
            {!user?.id ? <Link href={process.env.NEXT_PUBLIC_WEBSITE_BASE_URL} target='_blank' className='flex items-center justify-center'>

              <p className='text-center text-sm text-emerald-700 font-medium hover:underline'>Store and share JSON with ease using JsonDrop.</p>

            </Link> : <Link href='/dashboard' className='flex items-center justify-center'>

              <p className='text-center text-sm text-emerald-700 font-medium hover:underline'>Back to dashboard</p>

            </Link>}

          </CardFooter>

        </Card> }

    </div>
  )
}

export default Page;