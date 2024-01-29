import apiRequest from 'services/request';
import { useMutation } from '@tanstack/react-query';
export default function useCreatePriceTable() {
  return useMutation({
    mutationFn: (formData: any) => {
      return apiRequest('POST', '/price-tables', formData);
    }
  });
}
