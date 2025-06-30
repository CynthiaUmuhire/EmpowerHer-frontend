import queryClient from "@/api/queryClient";
import { BACKEND_URL } from "@/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useJoinEvent({ onClose, eventId }: { onClose: () => void, eventId: string }) {
    const { mutate: joinEventMutation, isPending, isSuccess } = useMutation({
        mutationFn: async (data: { status: string, }) => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error("User not authenticated.");
            }
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Authentication token not found.");
            }

            const payload = {
                data: {
                    event: eventId,
                    user: userId,
                    rsvpValue: data.status
                }
            };

            const response = await axios.post(
                `${BACKEND_URL}/api/rsvps`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['event', eventId] })
            onClose();
        },
        onError: (error) => {
            console.error('Failed to submit registration request:', error);
            alert(`Failed to submit request: ${error.message}`); // Replace with proper error display
        },
    });
    return {
        joinEventMutation,
        isPending,
        isSuccess
    }
}