// import {  useQuery } from "@tanstack/react-query"

// import apiRequest from "services/request";
// export default function useVillaReservation(id:string) {

//     const data = useQuery({
//         queryKey: ['villa-detay-reservation',id],
//         queryFn: () => apiRequest("GET", "/AdminFacility/GetReservations?facilityId=" + id),
//     });
//     return data;
//   }

import { useQuery } from '@tanstack/react-query';
import apiRequest from 'services/request';
export default function useVillaReservation(id: string) {
  const query = `/reservations?short=checkIn:asc&filters[villa][id][$eq]=${id}&populate[reservation_infos][filters][owner]=true`;
  const data = useQuery({
    queryKey: ['villa-detay-reservation', id],
    //queryFn: () => apiRequest('GET', '/reservations?sort[0]=checkIn:asc&filters[villa][id][$eq]=1&pagination[pageSize]=10&pagination[page]=1&populate[reservation_infos][fields][0]=name&populate[reservation_infos][fields][1]=surname&filters[reservation_infos][owner][$eq]=true')
    queryFn: () => apiRequest('GET', query)
  });
  return data;
}
