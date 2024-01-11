import { useQuery } from '@tanstack/react-query';
import apiRequest from 'services/request';
export default function useVillaGallery(id: string) {
  const data = useQuery({
    queryKey: ['villa-detay-gallery', id],
    queryFn: () => apiRequest('GET', '/photos?populate[0]=photo&filters[villa][id][$eq]=' + id)
  });
  return data;
}
