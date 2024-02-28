import { useQuery } from '@tanstack/react-query';

import apiRequest from 'services/request';
export default function useVillaPrice(id: string) {
  const data = useQuery({
    queryKey: ['villa-detay-price', id],
    queryFn: () => apiRequest('GET', '/price-dates?sort=checkIn:asc&filters[villa][id][$eq]=' + id)
  });
  return data;
}
