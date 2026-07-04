'use client';

import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import axios from 'axios';
import { LoaderCircle, Plus } from 'lucide-react';
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

      <Button 
        onClick={() => setOpenModal(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
      >
        <Plus className="size-4" />
        Add JSON data
      </Button>


      <AlertDialog open={openModal} onOpenChange={setOpenModal}>

        <AlertDialogContent className='max-w-4xl'>

          <AlertDialogHeader>

            <AlertDialogTitle className="text-slate-900">Create new JSON</AlertDialogTitle>

            <AlertDialogDescription className="text-slate-500">
              Save your JSON data
            </AlertDialogDescription>

          </AlertDialogHeader>


          <div className="grid gap-5">

            <div className="grid gap-2">

              <Label className="text-slate-700">Name of JSON data</Label>

              <Input 
                placeholder='Enter your JSON name' 
                className='rounded-md border-slate-200 focus-visible:ring-emerald-500'
                onChange={(e) => setJsonNameInput(e.target.value)}
              />

            </div>

            <div className="grid gap-2">

              <Label className="text-slate-700">Enter the JSON data</Label>

              <CodeMirror 
                value={jsonDataInput} 
                extensions={[json()]} 
                onChange={(value) => setJsonDataInput(value)}
                className='border border-slate-200 rounded-md shadow-sm h-96 overflow-y-auto'
              />

            </div>


          </div>


          <AlertDialogFooter>

              <Button 
                type='button' 
                variant='secondary'
                disabled={loading}
                onClick={() => setOpenModal(false)}
                className="border border-slate-200 text-slate-700 hover:bg-slate-50"
              >Close</Button>

              <Button 
                onClick={handleSaveJSONData}
                disabled={!jsonNameInput || !jsonDataInput || loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
              >
                {loading ? <LoaderCircle className='size-4 animate-spin' /> : 'Save'}
              </Button>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>


    </>
  )
}

export default AddNewJsonDataModal;