import api from "@/api/api";
import queryClient from "@/api/queryClient";
import { USER_QUERY_KEY } from "@/constants/queryKeys";
import { UserLoginData } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useUserLogin() {
    const { mutate: login, isPending, isError, isSuccess } = useMutation({
        mutationKey: ['userLogin'],
        mutationFn: async (userLoginData: UserLoginData) => {
            const data = await api.login(userLoginData)
            return data;
        },
        onSuccess: (data) => {
            console.log("Login successful", data);
            localStorage.setItem('token', data.jwt);
            //     queryClient.invalidateQueries
            //         // ({ queryKey: USER_QUERY_KEY })
        },
        onError: (error) => {
            console.error("Login failed:", error);
        }
    })
    return {
        login,
        isPending,
        isError,
        isSuccess
    }
}