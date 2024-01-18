import apiRequest from "services/request";
import { useMutation } from "@tanstack/react-query"
export default function useCreateVilla() {
    return useMutation({
        mutationFn: (formData:any) => {
            return apiRequest("POST", "/villas",formData)
        }
    })
}
  