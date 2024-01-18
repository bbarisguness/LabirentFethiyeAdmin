import apiRequest from "services/request";
import { useMutation } from "@tanstack/react-query"
export default function useUpdateVilla(id:string) {
    return useMutation({
        mutationFn: (formData:any) => {
            return apiRequest("PUT", "/villas/"+id, formData)
        }
    })
}
  