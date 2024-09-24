export const dynamic = 'force-dynamic'
import ServiceUploader from "@/app/admin/components/form/ServiceUploadForm";
import { fetchService } from "@/app/lib/fetchData";
export default async function Page() {
    const availableServices = await fetchService(`/api/services`);
    return (availableServices &&
        <div>
            <ServiceUploader mode="upload" availableItems={availableServices} />
        </div>
    )
}