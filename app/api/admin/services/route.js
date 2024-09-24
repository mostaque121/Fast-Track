import { updateIndicesEdit } from "@/app/api/lib/updateIndicesEdit";
import { updateIndicesUpload } from "@/app/api/lib/updateIndicesUpload";
import { revalidateAfterEditService, revalidateAfterUploadService } from "@/app/lib/action";
import dbConnect from "@/app/lib/mongodb";
import { Service } from "@/app/Models/models";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { title, imageSquareLink, index, imageSquarePublicId, imageCoverLink, imageCoverPublicId } = body;
        const newIndex = Number(index);

        if (!title || !newIndex || !imageSquareLink || !imageSquarePublicId || !imageCoverLink || !imageCoverPublicId) {
            return new Response(
                JSON.stringify({ message: 'All fields are required. Please fill in all fields.' }),
                { status: 400 }
            );
        }

        await dbConnect();

        // Check if the index already exists
        const existingService = await Service.findOne({ index: newIndex });
        if (existingService) {
            await updateIndicesUpload(newIndex);
        }

        // Create a new service with the given index
        const newService = new Service({
            title,
            imageSquareLink,
            imageSquarePublicId,
            imageCoverLink,
            imageCoverPublicId,
            index: newIndex
        });

        const savedService = await newService.save();

        await revalidateAfterUploadService();

        return NextResponse.json({ success: true, data: savedService });
    } catch (error) {
        console.error('Error saving service:', error);
        return new Response(JSON.stringify({ message: 'Error uploading data', error: error.message }), { status: 500 });
    }
}


export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, title, imageSquareLink, index, imageSquarePublicId, imageCoverLink, imageCoverPublicId } = body;
        const newIndex = Number(index);

        if (!id || !title || !newIndex || !imageSquareLink || !imageSquarePublicId || !imageCoverLink || !imageCoverPublicId) {
            return new Response(
                JSON.stringify({ message: 'All fields are required. Please fill in all fields.' }),
                { status: 400 }
            );
        }

        await dbConnect();

        const existingService = await Service.findById(id);

        if (!existingService) {
            return new Response(
                JSON.stringify({ message: 'Service not found.' }),
                { status: 404 }
            );
        }

        // If index has changed, update the indices of other services
        if (existingService.index !== newIndex) {
            await updateIndicesEdit(newIndex, existingService.index);
        }

        // Update the service with new data
        existingService.title = title;
        existingService.imageSquareLink = imageSquareLink;
        existingService.imageSquarePublicId = imageSquarePublicId;
        existingService.imageCoverLink = imageCoverLink;
        existingService.imageCoverPublicId = imageCoverPublicId;
        existingService.index = newIndex;

        const updatedService = await existingService.save();

        await revalidateAfterEditService(existingService.link);

        return NextResponse.json({ success: true, data: updatedService });

    } catch (error) {
        console.error('Error updating service:', error);
        return new Response(JSON.stringify({ message: 'Error updating data', error: error.message }), { status: 500 });
    }
}

