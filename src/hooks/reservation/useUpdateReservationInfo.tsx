import apiRequest from 'services/request';
import { useMutation } from '@tanstack/react-query';
export default function useUpdateReservationInfo(id: string) {
  return useMutation({
    mutationFn: (formData: any) => {
      return apiRequest('PUT', `/reservation-infos/${id}`, formData);
    }
  });
}
