export const dynamic = 'force-dynamic'
import ServiceUploader from "@/app/admin/components/form/ServiceUploadForm";
import { fetchService } from "@/app/lib/fetchData";
export default async function Page({ params }) {
    const { service } = params;

    const initialData = await fetchService(`/api/services/${service}`);

    const availableServices = await fetchService(`/api/services`);

    return (initialData &&
        <div>
            <ServiceUploader initialData={initialData} mode="edit" availableItems={availableServices} />
        </div>
    )
}