import apiRequest from 'services/request';
import { useMutation } from '@tanstack/react-query';
export default function useUpdateDistanceRuler(id: string) {
  return useMutation({
    mutationFn: (formData: any) => {
      return apiRequest('PUT', `/distance-rulers/${id}`, formData);
    }
  });
}
