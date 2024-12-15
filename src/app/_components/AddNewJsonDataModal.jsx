'use client';

import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const AddNewJsonDataModal = ({ fetchAllJsonDataOfCurrentlyLoggedInUser }) => {


  const [ openModal, setOpenModal ] = useState(false);


  const [ jsonNameInput, setJsonNameInput ] = useState('');

  const [ jsonDataInput, setJsonDataInput ] = useState('');


  const [ loading, setLoading ] = useState(false);


  const handleSaveJSONData = async () => {

    try {

      setLoading(true);

      if (jsonNameInput && jsonDataInput) {

        const { data } = await axios.post('/api/create-json', {
          name: jsonNameInput,
          content: jsonDataInput
        });

        if (data?.success) {

          
          setJsonNameInput('');
          
          setJsonDataInput('');

          await fetchAllJsonDataOfCurrentlyLoggedInUser();
          
          setOpenModal(false);

          toast.success(data?.message);

        }
        
      }
      
      
    } catch (error) {
      
      console.log(error);
       
    } finally {

      setLoading(false);

    }

  }
  
  return (
    <>

      <Button onClick={() => setOpenModal(true)}>Add JSON Data</Button>


      <AlertDialog open={openModal} onOpenChange={setOpenModal}>

        <AlertDialogContent className='max-w-4xl'>

          <AlertDialogHeader>

            <AlertDialogTitle>Create New JSON</AlertDialogTitle>

            <AlertDialogDescription>
              Save your JSON data
            </AlertDialogDescription>

          </AlertDialogHeader>


          <div className="grid gap-4">

            <div className="grid gap-2">

              <Label>Name of JSON Data</Label>

              <Input 
                placeholder='enter your JSON name' 
                className='rounded-none'
                onChange={(e) => setJsonNameInput(e.target.value)}
              />

            </div>

            <div className="grid gap-2">

              <Label>Enter the JSON Data</Label>

              <CodeMirror 
                value={jsonDataInput} 
                extensions={[json()]} 
                onChange={(value) => setJsonDataInput(value)}
                className='border shadow-sm h-96 overflow-y-auto'
              />

            </div>


          </div>


          <AlertDialogFooter className='flex items-end justify-center gap-2'>

              <Button 
                type='button' 
                variant='secondary'
                disabled={loading}
                onClick={() => setOpenModal(false)}
              >Close</Button>

              <Button 
                onClick={handleSaveJSONData}
                disabled={!jsonNameInput || !jsonDataInput || loading}
              >
                {loading ? <LoaderCircle className='transition-all animate-spin duration-400' /> : 'Save'}
              </Button>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>


    </>
  )
}

export default AddNewJsonDataModal;