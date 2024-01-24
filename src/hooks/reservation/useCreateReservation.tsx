import apiRequest from 'services/request';
import { useMutation } from '@tanstack/react-query';
export default function useCreateReservation() {
  return useMutation({
    mutationFn: (formData: any) => {
      return apiRequest('POST', '/reservations', formData);
    }
  });
}
