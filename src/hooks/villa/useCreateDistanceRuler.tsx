import apiRequest from 'services/request';
import { useMutation } from '@tanstack/react-query';
export default function useCreateDistanceRuler() {
  return useMutation({
    mutationFn: (formData: any) => {
      return apiRequest('POST', '/distance-rulers', formData);
    }
  });
}
