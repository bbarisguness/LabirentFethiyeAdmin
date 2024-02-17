import { useQuery } from '@tanstack/react-query';
import apiRequest from 'services/request';
export default function useReservations(params: any) {
  const data = useQuery({
    queryKey: ['reservation-list'],
    queryFn: () =>
      apiRequest(
        'GET',
        '/reservations?sort[0]=checkIn:desc&pagination[pageSize]=10&pagination[page]=1&populate[reservation_infos][fields][0]=name&populate[reservation_infos][fields][1]=surname&populate[villa][fields][2]=name&filters[reservation_infos][owner][$eq]=true'
      )
  });
  return data;
}