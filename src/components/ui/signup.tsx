import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./customButton";
import EHInput from "./EHInput";
import Links from "@/routes/Links";
import { useEffect } from "react";
import useRegisterUser from "@/hooks/useRegisterUser";
import Spinner from "./spinner";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z.string().email("Email must be valid").trim(),
    phoneNumber: z.coerce.string({ message: "Phone number must be valid" }).min(10),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    role: z.enum(["mother", "facilitator"]),
    firstName: z.string().min(2, { message: "The first name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "The last name must be at least 2 characters" }),
    name: z.string().min(1, { message: "The name must be provided" })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ["confirmPassword"]
});

export type RegistrationFormValues = z.infer<typeof formSchema>;

export default function Signup() {

    const navigate = useNavigate()
    const { registerUser, isPending, isRegistrationSuccess, isError, resetRegistration } = useRegisterUser()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegistrationFormValues>({
        resolver: zodResolver(formSchema),
    });
    const onSubmit = (data: RegistrationFormValues) => {
        console.log('data')
        registerUser(data)
        if (isError) {
            toast.error("Registration failed. Please check your details and try again.");
            resetRegistration()
        }
    }

    useEffect(() => {
        if (isRegistrationSuccess) {
            toast.success('Registration successful')
            navigate(Links.auth.Login);
        }
    }, [isRegistrationSuccess])
    return (
        <div className='flex flex-col w-full gap-3'>
            <form className="flex flex-col gap-4 " >
                <div className="flex gap-6 items-center">
                    <EHInput placeholder="Enter your first name" label={'First Name'} type='text' {...register('firstName')} />
                    {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
                    <EHInput placeholder="Enter your last name" label={'Last Name'} type='text'  {...register('lastName')} />
                    {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
                </div>
                <EHInput placeholder="Enter your preferred name" label={'User name'} type='text' {...register('name')} />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                <div className="flex justify-between items-center">
                    <p>Pick a role</p>
                    <select className=" text-primary-400 p-2 rounded-md" {...register('role')}>
                        <option value="mother">Mother</option>
                        <option value="facilitator">Facilitator</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-xs italic">{errors.role.message}</p>}
                </div>
                <EHInput placeholder="Enter your email address" label={'Email Address'} type='email' {...register('email')} />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                <EHInput placeholder="Your phone number" label={'Phone Number'} type="number" {...register('phoneNumber')} />
                {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>}
                <EHInput placeholder="Password" label={'Your Password'} type="password" {...register('password')} />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                <EHInput placeholder="Confirm Password" label={'Confirm Password'} type="password" {...register('confirmPassword')} />
                {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
            </form>

            <div className="flex justify-between flex-row-reverse">
                <Link to={Links.auth.Login} className="text-secondary-400 text-sm font-light ">Already have an account? <strong>Login</strong></Link>
            </div>
            <CustomButton type="submit" variant={'secondary'} disabled={isPending || isRegistrationSuccess || isSubmitting} onClick={handleSubmit(onSubmit)}>
                Register
                {isPending || isSubmitting && <Spinner />}
            </CustomButton>
            <div className="flex flex-col justify-center gap-2">
                <hr className="text-primary-200" />
                <span className="text-primary-200 font-light text-sm text-center"> or continue with</span>
            </div>
            <div className="flex justify-around ">
                <p>Register with USSD Credentials</p>
            </div>
        </div>
    )
}