import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismaClientConfig from '@/prismaClientConfig';


export async function POST(request) {

    try {

        const { userId } = await auth();

        if (!userId) {

            return NextResponse.json({
                success: false,
                message: 'unauthorized'
            }, { status: 401 });

        }


        const { jsonId } = await request.json();

        
        if (jsonId && userId) {

            await prismaClientConfig.jsonData.delete({
                where: {
                  id: jsonId,
                  clerkIdOfTheProfileWhoCreatedTheJson: userId
                },
            });

            return NextResponse.json({
                success: true,
                message: 'The JSON data has been deleted successfully',
            }, { status: 200 });

        }

        
    } catch (error) {
        
        console.log(error);

        return NextResponse.json({
            success: false,
            message: error?.message ? error?.message : 'Something went wrong while fetching all the JSON data. Please trying again after sometime.'
        }, { status: 500 });

    }

}