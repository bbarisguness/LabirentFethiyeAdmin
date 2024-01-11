import { useQuery } from '@tanstack/react-query';
import apiRequest from 'services/request';
export default function useReservations(params: any) {
  const data = useQuery({
    queryKey: ['reservation-list'],
    queryFn: () =>
      apiRequest(
        'GET',
        '/reservations?sort[0]=checkIn:desc&filters[villa][id][$eq]=1&pagination[pageSize]=10&pagination[page]=1&populate[reservation_infos][fields][0]=name&populate[reservation_infos][fields][1]=surname&filters[reservation_infos][owner][$eq]=true'
      )
  });
  return data;
}
