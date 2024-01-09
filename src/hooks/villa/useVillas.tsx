import {  useQuery } from "@tanstack/react-query"
import apiRequest from "services/request";
export default function useVillas(params:any) {
    const data = useQuery({
        queryKey: ['villa-list'],
        queryFn: () => apiRequest("GET", "/villas"),
    });
    return data;
  }
  