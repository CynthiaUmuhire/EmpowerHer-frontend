import { User } from '@/types';
import api from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY } from '@/constants/queryKeys';
import generateImageUrl from '@/utils/generateImageUrl';

export default function useUserInfo() {
  const { data, isLoading } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      const user = await api.getUserInfo();
      console.log('Fetched user data:', user);
      return user;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    select: (data) => {
      localStorage.setItem('userRole', data.role.type);
      localStorage.setItem('userId', data.user.documentId);

      console.log('User data:', data);
      return {
        ...data,
        role: data.role.type,
        profilePicture: generateImageUrl(data.profilePicture?.url),
      };
    }
  });
  return {
    user: data as User,
    isLoading: isLoading
  };
}

