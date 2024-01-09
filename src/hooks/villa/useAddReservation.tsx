import apiRequest from "services/request";
import { useMutation } from "@tanstack/react-query"
export default function useAddReservation() {
    return useMutation({
        mutationFn: (formData:any) => {
            return apiRequest("POST", "/AdminReservation/Create",formData)
        }
    })
}
  