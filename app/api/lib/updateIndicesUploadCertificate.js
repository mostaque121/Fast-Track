import { Certificate } from "@/app/Models/models";

export async function updateIndicesUploadCertificate(newIndex, serviceRef) {

    await Certificate.updateMany(
        { service: serviceRef, index: { $gte: newIndex } },
        { $inc: { index: 1 } }
    );
    return;
}
