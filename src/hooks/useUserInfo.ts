import { Registration, RegistrationStatus, User } from '@/types';
import api from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY } from '@/constants/queryKeys';
import generateImageUrl from '@/utils/generateImageUrl';

export default function useUserInfo() {
  const { data, isLoading } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      const user = await api.getUserInfo();
      console.log("Fetched user data:", user);
      return user;
    },
    select: (data) => {
      localStorage.setItem('userRole', data.role.type);
      localStorage.setItem('userId', data.documentId);
      console.log("User data:", data);
      return {
        ...data,
        role: data.role.type,
        profilePicture: generateImageUrl(data.profilePicture?.url),
        registrations: data.registrations.filter((registration: Registration) => registration.publishedAt !== null && registration.isActive),
        approvedRegistrations: data.registrations.filter((registration: Registration) => registration.publishedAt !== null && registration.isActive && registration.registrationStatus === RegistrationStatus.APPROVED) || null,
        upComingEvents: data.rsvps.filter((rsvp: { rsvpValue: string; event: { eventStatus: string; }; }) => rsvp.rsvpValue !== 'Decline' && rsvp.event.eventStatus === 'Upcoming') || null
      };
    },
    staleTime: 0, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
  return {
    user: data as User,
    isLoading: isLoading
  };
}

