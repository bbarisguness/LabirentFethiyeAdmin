import apiRequest from "services/request";
import { useMutation } from "@tanstack/react-query"
export default function useUpdateVillaPhoto() {
    return useMutation({
        mutationFn: (formData:any) => {
            return apiRequest("PUT", "/photos/" + formData.id,formData)
        }
    })
}
  