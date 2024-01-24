import apiRequest from 'services/request';
import { useMutation } from '@tanstack/react-query';
export default function useCreateReservationInfo() {
  return useMutation({
    mutationFn: (formData: any) => {
      return apiRequest('POST', '/reservation-infos', formData);
    }
  });
}
