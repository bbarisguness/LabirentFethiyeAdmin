import {  useQuery } from "@tanstack/react-query"
import apiRequest from "services/request";
export default function useReservations(params:any) {

    const data = useQuery({
        queryKey: ['reservation-list'],
        queryFn: () => apiRequest("GET", "/AdminReservation/GetAll?page=" + params.Page + "&page=" + params.Size),
    });
    return data;
  }
  