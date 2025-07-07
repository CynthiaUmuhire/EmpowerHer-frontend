import api from "@/api/api";
import queryClient from "@/api/queryClient";
import { USER_QUERY_KEY } from "@/constants/queryKeys";
import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";


export default function useUpdateUserInfo() {
    const {
        mutate: updateUserInfo,
        isPending,
        isError,
        error,
        data,
        isSuccess,
        reset
    } = useMutation<any, Error, Partial<User>>({
        mutationFn: async (userData: Partial<User>) => {
            const response = await api.updateUserInfo({
                ...userData,
                id: userData.id
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY })
        },
        onError: (error) => {
            console.error("User update failed:", error);
        },
    });

    return {
        updateUserInfo,
        isPending,
        isError,
        updateError: error,
        updateData: data,
        isUpdateSuccess: isSuccess,
        resetUpdate: reset
    };
}