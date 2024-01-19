import { useQuery } from '@tanstack/react-query';

import apiRequest from 'services/request';
export default function useVillaSummary(id: string) {
  const query = `/villas/${id}?populate[photos][populate][0]=photo&populate[categories][populate]=*&populate[reservations][populate][reservation_infos][filters][owner]=true`;

  const data = useQuery({
    queryKey: ['villa-detay-summary', id],
    queryFn: () => apiRequest('GET', query)
  });
  return data;
}
