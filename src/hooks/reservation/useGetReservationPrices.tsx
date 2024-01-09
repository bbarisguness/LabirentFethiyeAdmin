import {  useQuery } from "@tanstack/react-query"
import apiRequest from "services/request";
export default function useGetReservationPrices(facilityId:string,checkIn:string,checkOut:string) {
    const data = useQuery({
        enabled:false,
        queryKey: ['reservation-prices',facilityId],
        queryFn: () => apiRequest("GET", "/AdminReservation/GetReservationPrice?FacilityId=" + facilityId + "&CheckIn=" + checkIn + "&CheckOut=" + checkOut),
    });
    return data;
  }
  