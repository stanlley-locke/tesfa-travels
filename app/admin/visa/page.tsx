import { getVisaApplications } from '@/app/actions/visas';
import ClientPage from './ClientPage';

export default async function VisaPipelinePage() {
  const result = await getVisaApplications();
  const initialVisas = result.success ? result.data : [];

  return <ClientPage initialVisas={initialVisas as any} />;
}
