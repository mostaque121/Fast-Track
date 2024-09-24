export const dynamic = 'force-dynamic'
import CertificateUploadForm from "@/app/admin/components/form/CertificateUploadForm";
import { fetchService } from "@/app/lib/fetchData";
export default async function Page({ params }) {
    const { service, certificate } = params;
    const initialData = await fetchService(`/api/services/${service}/${certificate}`);
    const availableServices = await fetchService(`/api/services`);

    return ((initialData && availableServices) &&
        <div>
            <CertificateUploadForm initialData={initialData} mode="edit" availableServices={availableServices} />
        </div>
    )
}