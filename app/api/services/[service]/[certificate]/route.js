export const dynamic = 'force-dynamic'
import { Certificate } from '@/app/Models/models';
import dbConnect from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { service, certificate } = params;
    try {
        await dbConnect();
        const data = await Certificate.findOne({ link: certificate })
            .populate({
                path: 'service', // Populate the 'service' field
                select: 'link', // Select only the '_id' and any other required fields (like 'name')
            });


        if (data.service.link === service) {
            return NextResponse.json(data);
        }
        else {

            return new Response(
                JSON.stringify({ message: 'Certificate not found' }),
                { status: 404 }
            );
        }

    } catch (error) {
        console.error('Error fetching services:', error);
        return new Response(
            JSON.stringify({ message: 'Error fetching services', error: error.message }),
            { status: 500 }
        );
    }
}