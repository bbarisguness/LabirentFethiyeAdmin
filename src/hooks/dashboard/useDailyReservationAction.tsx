import { useQuery } from '@tanstack/react-query';
import apiRequest from 'services/request';
export default function useDailyReservationAction(dateNow: string) {
  ///reservations?populate[0]=reservation_infos&populate[1]=villa&filters[$or][0][checkIn][$eq]=
  const query = `/reservations?populate[0]=reservation_infos&populate[1]=villa&filters[$or][0][checkIn][$eq]=${dateNow}&filters[$or][1][checkOut][$eq]=${dateNow}`;
  const data = useQuery({
    queryKey: ['dashboard-reservation-action', dateNow],
    queryFn: () => apiRequest('GET', query)
  });
  return data;
}
