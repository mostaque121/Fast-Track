import { Service } from "@/app/Models/models";

export async function updateIndicesUpload(newIndex) {
    await Service.updateMany(
        { index: { $gte: newIndex } },
        { $inc: { index: 1 } }
    );
    return;
}
