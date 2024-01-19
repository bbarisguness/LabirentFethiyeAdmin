import { useQuery } from '@tanstack/react-query';
import apiRequest from 'services/request';
export default function useVillaContent(id: string) {
  const data = useQuery({
    queryKey: ['villa-detay-content', id],
    queryFn: () => apiRequest('GET', '/villas/' + id + '?sort[0]=name:asc&populate[0]=distance_rulers&populate[1]=price_tables&populate[2]=categories')
  });
  return data;
}
