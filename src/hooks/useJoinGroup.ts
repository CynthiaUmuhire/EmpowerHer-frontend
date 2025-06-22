import queryClient from "@/api/queryClient";
import { FormValues } from "@/components/ui/requestToJoinGroup";
import { BACKEND_URL } from "@/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useJoinGroup({ groupId, onClose }: { groupId: string, onClose: () => void }) {
    const { mutate: createRegistrationMutation, isPending, } = useMutation<any, Error, FormValues>({
        mutationFn: async (data) => {
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
                    group: groupId,
                    mothers: userId,
                    notes: data.notes || '',
                    registrationStatus: 'Pending',
                    isActive: true,
                }
            };

            const response = await axios.post(
                `${BACKEND_URL}/api/registrations`,
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
            // Invalidate user's requests
            queryClient.invalidateQueries({ queryKey: ['group', groupId] }); // Invalidate group details to show pending status
            alert('Registration request submitted successfully!'); // Replace with a proper toast/notification
            onClose();
        },
        onError: (error) => {
            console.error('Failed to submit registration request:', error);
            alert(`Failed to submit request: ${error.message}`); // Replace with proper error display
        },
    });
    return {
        createRegistrationMutation,
        isPending
    }
}