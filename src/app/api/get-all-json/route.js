import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismaClientConfig from '@/prismaClientConfig';


export async function GET(request) {

    try {

        const { userId } = await auth();

        if (!userId) {

            return NextResponse.json({
                success: false,
                message: 'unauthorized'
            }, { status: 401 });

        }


        const allJSONData = await prismaClientConfig.jsonData.findMany({
            where: {
                clerkIdOfTheProfileWhoCreatedTheJson: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                createdAt: true
            }
        });


        return NextResponse.json({
            success: true,
            message: 'All the JSON data has been fetched successfully',
            allJSONData: allJSONData
        }, { status: 201 });

         
    } catch (error) {
        
        console.log(error);

        return NextResponse.json({
            success: false,
            message: error?.message ? error?.message : 'Something went wrong while fetching all the JSON data. Please trying again after sometime.'
        }, { status: 500 });
        
    }

}
