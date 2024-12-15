'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import JsonHistoryTable from './JsonHistoryTable';
import AddNewJsonDataModal from './AddNewJsonDataModal';


const JsonEditorCard = () => {


  const [ allJSONData, setAllJSONData ] = useState([]);

  const [ loadingAllJSONData, setLoadingAllJSONData ] = useState(false);

  const [ loadingDeleteJSONData, setLoadingDeleteJSONData ] = useState(false);

  const [ idOfTheJSONToBeDeleted, setIdOfTheJSONToBeDeleted ] = useState(null); 
  

  const fetchAllJsonDataOfCurrentlyLoggedInUser = async () => {

    try {

      setLoadingAllJSONData(true);

      const { data } = await axios.get('/api/get-all-json');

      if (data?.success) {

        setAllJSONData(data?.allJSONData);

      }
      
    } catch (error) {
      
      console.log(error);
      
    } finally {

      setLoadingAllJSONData(false);

    }

  };


  const deleteJsonData = async (jsonId) => {

    try {

      setLoadingDeleteJSONData(true);

      if(jsonId) {

        setIdOfTheJSONToBeDeleted(jsonId);

        const { data } = await axios.post('/api/delete-json', {
          jsonId: jsonId
        });


        if (data?.success) {

          toast.success(data?.message);

          await fetchAllJsonDataOfCurrentlyLoggedInUser();

          setIdOfTheJSONToBeDeleted(null);

        }

      }
      
      
    } catch (error) {

      console.log(error);
      
    } finally {

      setLoadingDeleteJSONData(false);

    }

  }


  useEffect(() => {

    fetchAllJsonDataOfCurrentlyLoggedInUser();

  }, []);


  return (
    <Card className='mb-10 w-full h-80 overflow-y-auto'>

        <CardHeader>

            <CardTitle className='tracking-wide'>Save your JSON Data</CardTitle>

            <CardDescription>View and share your saved JSON data</CardDescription>

        </CardHeader>

        <CardContent>
            
            <JsonHistoryTable 
              allJSONData={allJSONData} 
              loadingAllJSONData={loadingAllJSONData}
              deleteJSONData={deleteJsonData}
              loadingDeleteJSONData={loadingDeleteJSONData}
              idOfTheJSONToBeDeleted={idOfTheJSONToBeDeleted}
            />
            
        </CardContent>

        <CardFooter className='mt-5'>
            
            <AddNewJsonDataModal 
              fetchAllJsonDataOfCurrentlyLoggedInUser={fetchAllJsonDataOfCurrentlyLoggedInUser}
            />
            
        </CardFooter>

    </Card>

  )
};


export default JsonEditorCard;
