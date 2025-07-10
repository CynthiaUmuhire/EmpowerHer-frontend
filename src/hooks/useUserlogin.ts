import api from "@/api/api";
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
            localStorage.setItem('token', data.jwt);
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