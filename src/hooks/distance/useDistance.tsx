import {  useQuery } from "@tanstack/react-query"

import apiRequest from "../../services/request";
export default function useDistance() {
    const data = useQuery({
        queryKey: ['villa-distance'],
        queryFn: () => apiRequest("GET", "/distance-rulers"),
    });
    return data;
  }
  