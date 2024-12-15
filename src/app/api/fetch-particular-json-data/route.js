import { NextResponse } from "next/server";

import prismaClientConfig from '@/prismaClientConfig';


export async function GET(request) {

    try {

        const searchParams = request.nextUrl.searchParams;

        const jsonDataIdromTheSearchParams = searchParams.get('jsonDataId');


        const particularJSONData = await prismaClientConfig.jsonData.findUnique({
            where: {
                id: jsonDataIdromTheSearchParams
            }
        });

        if (particularJSONData === null) {

            return NextResponse.json({
                success: false,
                message: `JSON with ID: ${jsonDataIdromTheSearchParams} does not exist.`
            }, { status: 500 });

        }
        

        return NextResponse.json({
            success: true,
            data: particularJSONData
        }, { status: 200 });

        
    } catch (error) {
        
        console.log(error);

        return NextResponse.json({
            success: false,
            message: error?.message ? error?.message : 'Something went wrong while fetching all the JSON data. Please trying again after sometime.'
        }, { status: 500 });

    }

}