import { useQuery } from '@tanstack/react-query';
import apiRequest from 'services/request';
export default function useStaticPageList(params: any) {
  const data = useQuery({
    queryKey: ['website-staticpagelist'],
    queryFn: () => apiRequest('GET', '/static-pages?sort[0]=createdAt:desc&pagination[pageSize]=10&pagination[page]=1')
  });
  return data;
}
