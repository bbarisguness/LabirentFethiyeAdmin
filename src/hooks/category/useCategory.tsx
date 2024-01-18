import {  useQuery } from "@tanstack/react-query"

import apiRequest from "../../services/request";
export default function useCategory() {
    const data = useQuery({
        queryKey: ['villa-categories'],
        queryFn: () => apiRequest("GET", "/categories"),
    });
    return data;
  }
  