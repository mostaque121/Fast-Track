export const dynamic = 'force-dynamic'
import CertificateUploadForm from "@/app/admin/components/form/CertificateUploadForm";
import { fetchService } from "@/app/lib/fetchData";
export default async function Page() {
    const availableServices = await fetchService(`/api/services`);
    return (availableServices &&
        <div>
            <CertificateUploadForm mode="upload" availableServices={availableServices} />
        </div>
    )
}