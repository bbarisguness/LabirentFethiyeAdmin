import { useQuery } from '@tanstack/react-query';

import apiRequest from 'services/request';
export default function useVillaSummary(id: string) {
  const data = useQuery({
    queryKey: ['villa-detay-summary', id],
    queryFn: () => apiRequest('GET', '/villas/' + id + '?populate=*')
  });
  return data;
}
