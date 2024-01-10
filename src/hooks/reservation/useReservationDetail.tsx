import { useQuery } from '@tanstack/react-query';
import apiRequest from 'services/request';
export default function useReservationDetail(id: string) {
  const data = useQuery({
    queryKey: ['reservation-detail', id],
    queryFn: () => apiRequest('GET', '/reservations/' + id + '?populate[0]=reservation_infos&populate[1]=reservation_items&populate[2]=villa')
  });
  return data;
}
