import { Registration, User } from '@/types';
import api from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY } from '@/constants/queryKeys';
import generateImageUrl from '@/utils/generateImageUrl';

export default function useUserInfo() {
  const { data, isLoading } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      const user = await api.getUserInfo();
      return user;
    },
    staleTime: 0, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    select: (data) => {
      localStorage.setItem('userRole', data.role.type);
      localStorage.setItem('userId', data.documentId);
      return {
        ...data,
        role: data.role.type,
        profilePicture: generateImageUrl(data.profilePicture?.url),
        registrations: data.registrations.filter((registration: Registration) => registration.publishedAt !== null && registration.isActive)
      };
    }
  });
  return {
    user: data as User,
    isLoading: isLoading
  };
}

