import api from "@/api/api";
import { NewUser } from "@/types";
import { useMutation } from "@tanstack/react-query";


export default function useRegisterUser() {
    const {
        mutate: registerUser,
        isPending,
        isError,
        error,
        data,
        isSuccess,
        reset
    } = useMutation<any, Error, NewUser>({
        mutationFn: async (userData: NewUser) => {
            const response = await api.register({
                name: userData.name,
                phoneNumber: userData.phoneNumber,
                password: userData.password,
                email: userData.email,
                role: userData.role,
                firstName: userData.firstName,
                lastName: userData.lastName
            });
            return response;
        },
        onSuccess: (data) => {
            console.log("User registered successfully", data);
        },
        onError: (error) => {
            console.error("Registration failed:", error);
        },
    });

    return {
        registerUser,
        isPending,
        isError,
        registrationError: error,
        registrationData: data,
        isRegistrationSuccess: isSuccess,
        resetRegistration: reset
    };
}