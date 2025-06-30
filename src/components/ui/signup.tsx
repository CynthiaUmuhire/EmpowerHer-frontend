import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./customButton";
import EHInput from "./EHInput";
import Links from "@/routes/Links";
import { useEffect, useRef } from "react";
import useRegisterUser from "@/hooks/useRegisterUser";
import Spinner from "./spinner";

export default function Signup() {
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLSelectElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const { registerUser, isPending, isRegistrationSuccess, isError, resetRegistration } = useRegisterUser()

    const handleRegister = async () => {
        const email = emailRef.current?.value;
        const phoneNumber = phoneNumberRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;
        const username = usernameRef.current?.value;
        const role = roleRef.current?.value;
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        // TODO: make a better call here !!!
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        registerUser({
            name: username || '',
            email: email || '',
            phoneNumber: phoneNumber || '',
            password: password || '',
            role: role as 'mother' | 'facilitator',
            firstName: firstName || '',
            lastName: lastName || ''
        })


        if (isError) {
            alert("Registration failed. Please check your details and try again.");
            resetRegistration()
        }
    };

    useEffect(() => {
        navigate(Links.auth.Login);
    }, [isRegistrationSuccess])
    return (
        <div className='flex flex-col w-full gap-3'>
            <div className="flex flex-col gap-4 ">
                <div className="flex gap-6 items-center">
                    <EHInput placeholder="Enter your first name" label={'First Name'} type='text' ref={firstNameRef} />
                    <EHInput placeholder="Enter your last name" label={'Last Name'} type='text' ref={lastNameRef} />
                </div>
                <EHInput placeholder="Enter your preferred name" label={'User name'} type='text' ref={usernameRef} />
                <div className="flex justify-between items-center">
                    <p>Pick a role</p>
                    <select className=" text-primary-400 p-2 rounded-md" ref={roleRef}>
                        <option value="mother">Mother</option>
                        <option value="facilitator">Facilitator</option>
                    </select>
                </div>
                <EHInput placeholder="Enter your email address" label={'Email Address'} type='email' ref={emailRef} />
                <EHInput placeholder="Your phone number" label={'Phone Number'} type="number" ref={phoneNumberRef} />
                <EHInput placeholder="Password" label={'Your Password'} type="password" ref={passwordRef} />
                <EHInput placeholder="Confirm Password" label={'Confirm Password'} type="password" ref={confirmPasswordRef} />
            </div>

            <div className="flex justify-between flex-row-reverse">
                <Link to={Links.auth.Login} className="text-secondary-400 text-sm font-light ">Already have an account? <strong>Login</strong></Link>
            </div>
            <CustomButton variant={'secondary'} onClick={handleRegister} disabled={isPending || isRegistrationSuccess}>
                Register
                {isPending && <Spinner />}
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