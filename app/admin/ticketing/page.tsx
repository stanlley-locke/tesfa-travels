import { getTickets } from '@/app/actions/tickets';
import ClientPage from './ClientPage';

export default async function TicketingPage() {
  const result = await getTickets();
  const initialTickets = result.success ? result.data : [];

  return <ClientPage initialTickets={initialTickets as any} />;
}
