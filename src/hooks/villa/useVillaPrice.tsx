import { useQuery } from '@tanstack/react-query';

import apiRequest from 'services/request';
export default function useVillaPrice(id: string) {
  const data = useQuery({
    queryKey: ['villa-detay-price', id],
    queryFn: () => apiRequest('GET', '/price-dates?populate[0]=photo&filters[villa][id][$eq]=' + id)
  });
  return data;
}
