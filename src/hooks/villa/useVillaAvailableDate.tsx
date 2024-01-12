import { useQuery } from '@tanstack/react-query';
import apiRequest from 'services/request';
export default function useVillaAvailableDate(id: string) {
  let newDate = new Date();
  let year = newDate.getFullYear();

  const queery = `reservations?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${id}&filters[$and][1][checkIn][$gte]=${year}-01-01&filters[$and][2][checkOut][$lte]=${year}-12-31&fields[0]=checkIn&fields[1]=checkOut`;
  const data = useQuery({
    queryKey: ['villa-detay-availabledate', id],
    queryFn: () => apiRequest('GET', queery)
  });
  return data;
}
