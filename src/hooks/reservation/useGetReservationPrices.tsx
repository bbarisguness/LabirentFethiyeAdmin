// import {  useQuery } from "@tanstack/react-query"
// import apiRequest from "services/request";
// export default function useGetReservationPrices(facilityId:string,checkIn:string,checkOut:string) {
//     const data = useQuery({
//         enabled:false,
//         queryKey: ['reservation-prices',facilityId],
//         queryFn: () => apiRequest("GET", "/AdminReservation/GetReservationPrice?FacilityId=" + facilityId + "&CheckIn=" + checkIn + "&CheckOut=" + checkOut),
//     });
//     return data;
//   }

// import { useQuery } from '@tanstack/react-query';
// import apiRequest from 'services/request';
// //export default function useGetReservationPrices(villaId: string,checkIn:string,checkOut:string) {
//   export default function useGetReservationPrices(villaId: string,checkIn:string,checkOut:string) {
//   const data = useQuery({
//     queryKey: ['reservation-price'],
//     queryFn: () =>
//       apiRequest(
//         'GET',
//         `/price-dates?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${villaId}&filters[$and][1][$or][0][$and][0][checkIn][$gt]=${checkIn}&filters[$and][1][$or][0][$and][1][checkIn][$lte]=${checkOut}&filters[$and][1][$or][1][$and][0][checkIn][$lte]=${checkIn}&filters[$and][1][$or][1][$and][1][checkOut][$gte]=${checkIn}&filters[$and][1][$or][2][$and][0][checkIn][$lte]=${checkOut}&filters[$and][1][$or][2][$and][1][checkOut][$gte]=${checkOut}&populate[villa][fields][0]=id&populate[villa][fields][1]=name&fields[0]=checkIn&fields[1]=checkOut&fields[2]=price`
//       )
//   });
//   return data;
// }

// import { useQuery } from '@tanstack/react-query';
// import apiRequest from 'services/request';
// export default function useGetReservationPrices(villaId: any, checkIn: any, checkOut: any) {
//   const dataPrices = useQuery({
//     queryKey: ['villa-list'],
//     queryFn: () =>
//       // apiRequest(
//       //   'GET',
//       //   `/price-dates?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${params.VillaId}&filters[$and][1][$or][0][$and][0][checkIn][$gt]=${params.CheckIn}&filters[$and][1][$or][0][$and][1][checkIn][$lte]=${params.CheckOut}&filters[$and][1][$or][1][$and][0][checkIn][$lte]=${params.CheckIn}&filters[$and][1][$or][1][$and][1][checkOut][$gte]=${params.CheckIn}&filters[$and][1][$or][2][$and][0][checkIn][$lte]=${params.CheckOut}&filters[$and][1][$or][2][$and][1][checkOut][$gte]=${params.CheckOut}&populate[villa][fields][0]=id&populate[villa][fields][1]=name&fields[0]=checkIn&fields[1]=checkOut&fields[2]=price`
//       // )
//       apiRequest(
//         'GET',
//         `/price-dates?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${villaId}&filters[$and][1][$or][0][$and][0][checkIn][$gt]=${checkIn}&filters[$and][1][$or][0][$and][1][checkIn][$lte]=${checkOut}&filters[$and][1][$or][1][$and][0][checkIn][$lte]=${checkIn}&filters[$and][1][$or][1][$and][1][checkOut][$gte]=${checkIn}&filters[$and][1][$or][2][$and][0][checkIn][$lte]=${checkOut}&filters[$and][1][$or][2][$and][1][checkOut][$gte]=${checkOut}&populate[villa][fields][0]=id&populate[villa][fields][1]=name&fields[0]=checkIn&fields[1]=checkOut&fields[2]=price`
//       )
//   });
//   return dataPrices;
// }

import { useQuery } from '@tanstack/react-query';

import apiRequest from 'services/request';
export default function useGetReservationPrices(villaId: string, checkIn: string, checkOut: string) {
  const query = `/price-dates?sort[0]=checkIn:asc&filters[$and][0][villa][id][$eq]=${villaId}&filters[$and][1][$or][0][$and][0][checkIn][$gt]=${checkIn}&filters[$and][1][$or][0][$and][1][checkIn][$lte]=${checkOut}&filters[$and][1][$or][1][$and][0][checkIn][$lte]=${checkIn}&filters[$and][1][$or][1][$and][1][checkOut][$gte]=${checkIn}&filters[$and][1][$or][2][$and][0][checkIn][$lte]=${checkOut}&filters[$and][1][$or][2][$and][1][checkOut][$gte]=${checkOut}&populate[villa][fields][0]=id&populate[villa][fields][1]=name&fields[0]=checkIn&fields[1]=checkOut&fields[2]=price`;
  const dataReservationPrice = useQuery({
    queryKey: ['reservation-price', villaId, checkIn, checkOut],
    queryFn: () => apiRequest('GET', query)
  });
  return dataReservationPrice;
}
