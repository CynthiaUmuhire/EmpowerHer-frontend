import api from "@/api/api";
import { adminLoginData } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useAdminLogin() {
    const { mutate: login, isPending, isError, isSuccess } = useMutation({
        mutationKey: ['adminLogin'],
        mutationFn: async (userLoginData: adminLoginData) => {
            const data = await api.adminLogin(userLoginData)
            return data;
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('userRole', 'admin');
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