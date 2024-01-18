import {  useQuery } from "@tanstack/react-query"

import apiRequest from "services/request";
export default function useVilla(id:string,url:string) {

    const data = useQuery({
        queryKey: ['villa-detay',id],
        queryFn: () => apiRequest("GET", url),
    });
    return data;
  }
  