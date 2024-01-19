import {  useQuery } from "@tanstack/react-query"

import apiRequest from "services/request";
export default function useVillaPhoto(id:string) {

    const data = useQuery({
        queryKey: ['villa-detay-photo',id],
        queryFn: () => apiRequest("GET", "/photos?sort[0]=line:desc&populate[0]=photo&filters[villa][id][$eq]=" + id),
    });
    return data;
  }
  