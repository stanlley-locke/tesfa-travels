import { cookies } from 'next/headers';
import { getAdminSettings } from '@/app/actions/auth';
import SettingsClientPage from './ClientPage';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get('adminEmail')?.value;

  if (!email) {
    redirect('/admin/login');
  }

  const res = await getAdminSettings(email);
  if (!res.success || !res.admin) {
    redirect('/admin/login');
  }

  return <SettingsClientPage admin={res.admin} />;
}
