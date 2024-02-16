import apiRequest from 'services/request';
import { useMutation } from '@tanstack/react-query';
export default function useUpdatePriceTable(id: string) {
  return useMutation({
    mutationFn: (formData: any) => {
      return apiRequest('PUT', `/price-tables/${id}`, formData);
    }
  });
}
