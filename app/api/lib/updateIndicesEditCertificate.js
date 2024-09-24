import { Certificate } from "@/app/Models/models";

export async function updateIndicesEditCertificate(newService, prevService, newIndex, oldIndex) {
    // If the new index and service are the same, no need to update
    if (newIndex === oldIndex && newService === prevService) return;

    // If the new index is lower, increment indices between [newIndex, oldIndex - 1]
    if (newIndex < oldIndex) {
        await Certificate.updateMany(
            { service: newService, index: { $gte: newIndex, $lt: oldIndex } },
            { $inc: { index: 1 } }
        );
    }

    // If the new index is higher, decrement indices between [oldIndex + 1, newIndex]
    if (newIndex > oldIndex) {
        await Certificate.updateMany(
            { service: newService, index: { $gt: oldIndex, $lte: newIndex } },
            { $inc: { index: -1 } }
        );
    }

    // If the service has changed, adjust the previous service's indices
    if (newService !== prevService) {
        await Certificate.updateMany(
            { service: prevService, index: { $gt: oldIndex } },
            { $inc: { index: -1 } }
        );
    }

    return;
}
