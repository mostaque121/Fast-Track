export const dynamic = 'force-dynamic'
import dbConnect from '@/app/lib/mongodb';
import { Service } from '@/app/Models/models';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();
    const services = await Service.find({})
      .sort({ index: 1 })
      .populate({
        path: 'certificates',
        select: 'link title index _id',
        options: { sort: { index: 1 } }
      });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching services', error: error.message }),
      { status: 500 }
    );
  }
}


