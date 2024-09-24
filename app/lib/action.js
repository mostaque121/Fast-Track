'use server'
import { revalidatePath, revalidateTag } from "next/cache"
export async function revalidateService() {
    console.log('revalidating')
    revalidatePath('/services')
};

export async function revalidateServiceTag() {
    console.log('revalidating')
    revalidateTag('service')
}

export async function revalidateAfterEditService(serviceLink) {
    console.log('revalidating after edit service', serviceLink)
    revalidatePath(`/admin/edit/services/${serviceLink}`);
    revalidatePath(`/admin/content/services`);
    revalidatePath(`/services`);
    revalidatePath(`/home`);
    revalidatePath(`/services/${serviceLink}`);
}

export async function revalidateAfterUploadService() {
    console.log('revalidating after Upload service')
    revalidatePath(`/admin/upload/service`);
    revalidatePath(`/admin/content/services`);
    revalidatePath(`/services`);
    revalidatePath(`/home`);
}