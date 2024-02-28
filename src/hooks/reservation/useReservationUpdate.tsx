import apiRequest from 'services/request';
import { useMutation } from '@tanstack/react-query';
export default function useReservationUpdate(id: string) {
  return useMutation({
    mutationFn: (formData: any) => {
      return apiRequest('PUT', '/reservations/' + id, formData);
    }
  });
}
