import {  useQuery } from "@tanstack/react-query"

import apiRequest from "../../services/request";
export default function useFeature() {
    const data = useQuery({
        queryKey: ['villa-feature'],
        queryFn: () => apiRequest("GET", "/features"),
    });
    return data;
  }
  