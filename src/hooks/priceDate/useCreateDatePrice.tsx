import apiRequest from 'services/request';
import { useMutation } from '@tanstack/react-query';
export default function useCreateDatePrice() {
  return useMutation({
    mutationFn: (formData: any) => {
      return apiRequest('POST', '/price-dates', formData);
    }
  });
}
