import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismaClientConfig from '@/prismaClientConfig';


export async function POST(request) {

    try {

        const currentLoggedInUser = await currentUser();

        if (!currentLoggedInUser?.id) {

            return NextResponse.json({
                success: false,
                message: 'unauthorized'
            }, { status: 401 });

        }


        const { name, content } = await request.json();

        if (name && content) {

            await prismaClientConfig.jsonData.create({
                data: {
                    name: name, 
                    content: content,
                    clerkIdOfTheProfileWhoCreatedTheJson: currentLoggedInUser?.id,
                    emailIdOfTheProfileWhoCreatedTheJson: currentLoggedInUser?.emailAddresses[0]?.emailAddress
                }
            });


            return NextResponse.json({
                success: true,
                message: 'Your JSON data has been created successfully'
            }, { status: 201 });

        }
         
    } catch (error) {
        
        console.log(error);

        return NextResponse.json({
            success: false,
            message: error?.message ? error?.message : 'Something went wrong while saving the JSON data. Please trying again after sometime.'
        }, { status: 500 });
        
    }

}