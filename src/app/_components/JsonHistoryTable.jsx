'use client';

import { Share2 } from 'lucide-react';
import { LoaderCircle, Trash, Clipboard } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"



const JsonHistoryTable = ({ allJSONData, loadingAllJSONData, deleteJSONData, loadingDeleteJSONData, idOfTheJSONToBeDeleted }) => {


  const [ openShareJSONModal, setOpenShareJSONModal ] = useState(false);


  const [ idOfTheJSONData, setIdOfTheJSONData ] = useState(null);

  const [ nameOfTheJSONData, setNameOfTheJSONData ] = useState('');


  const copyJSONDataURLToClipboard = () => {

    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_WEBSITE_BASE_URL}/view-particular-jsondata/${idOfTheJSONData}`);

    toast.success('url successfully copied to clipboard.');

  }
  
  return (
    <>

      {loadingAllJSONData ? <div className='flex items-center justify-center'>

      <LoaderCircle className='transition-all duration-700 animate-spin mt-2' />

      </div> : allJSONData?.length === 0 ? <div>

        <p className='text-center text-muted-foreground tracking-wider mt-2'>No JSON data to display Please add one.</p>

      </div> : <Table>

        <TableCaption>A list of your recent json data.</TableCaption>

        <TableHeader>

            <TableRow>
                <TableHead className='text-center'>Name</TableHead>
                <TableHead className='text-center'>Share</TableHead>
                <TableHead className='text-center'>Action</TableHead>
            </TableRow>

        </TableHeader>

        <TableBody>

            {allJSONData.map((data) => (
                <TableRow key={data.id}>

                    <TableCell className='text-center'>{data.name}</TableCell>

                    <TableCell> 

                      <Share2 
                        className='size-5 cursor-pointer m-auto'
                        onClick={() => {

                          setIdOfTheJSONData(data.id);

                          setNameOfTheJSONData(data.name);

                          setOpenShareJSONModal(true);

                        }}
                      /> 
                      
                    </TableCell>
                    
                    <TableCell>

                      {loadingDeleteJSONData && idOfTheJSONToBeDeleted && data.id && idOfTheJSONToBeDeleted === data.id ? <LoaderCircle className='size-5 text-red-600 m-auto transition-all animate-spin duration-700' /> : <Trash 
                        className='size-5 cursor-pointer text-red-600 m-auto'
                        onClick={() => deleteJSONData(data.id)}
                      />}

                    </TableCell>

                </TableRow>
            ))}

        </TableBody>

      </Table>}


      <AlertDialog open={openShareJSONModal} onOpenChange={setOpenShareJSONModal}>

        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle>Your JSON Data URL</AlertDialogTitle>

            <AlertDialogDescription>
              Sharable link for your JSON data. Copy and share the link with your friend.
            </AlertDialogDescription>

          </AlertDialogHeader>

          <Alert>

            <AlertTitle className='text-center text-xl capitalize'>{nameOfTheJSONData}</AlertTitle>

            <AlertDescription className='text-center'>

              <Link href={`/view-particular-jsondata/${idOfTheJSONData}`}>

                <p className='tracking-wider'>{process.env.NEXT_PUBLIC_WEBSITE_BASE_URL}/view-particular-jsondata/${idOfTheJSONData}</p>

              </Link>

              <Clipboard 
                className='mt-3 size-5 m-auto text-green-600 cursor-pointer'
                onClick={copyJSONDataURLToClipboard}
              />

            </AlertDescription>

          </Alert>


          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>

        </AlertDialogContent>
        
      </AlertDialog>


    </>

  )
};


export default JsonHistoryTable;
