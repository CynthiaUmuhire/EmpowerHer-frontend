import { Link, useNavigate } from "react-router-dom"
import EHInput from "./EHInput"
import Links from "@/routes/Links"
import CustomButton from "./customButton"
import { useRef } from "react";
import api from "@/api/api";
import useUserLogin from "@/hooks/useUserlogin";
import Spinner from "./spinner";

function Login() {
    const identifierRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { login, isPending, isError, isSuccess } = useUserLogin();
    const handleLogin = async () => {
        const identifier = identifierRef.current?.value;
        const password = passwordRef.current?.value;

        if (!identifier || !password) {
            alert("Please fill in all fields");
            return;
        }

        login({ identifier, password });
        if (isSuccess) {
            console.log("Login successful");
            navigate(Links.protected.Home);
        } else if (isError) {
            alert("Login failed. Please check your credentials.");
        }
    }
    return (
        <div className='flex flex-col w-full gap-6'>
            <div className="flex flex-col gap-6 ">
                <EHInput placeholder="Enter your phone number" label={'Your phone number'} type='tel' ref={identifierRef} />
                <EHInput placeholder="Password" label={'Your Password'} type="password" ref={passwordRef} />
            </div>
            <div className="flex justify-between">
                <Link to={Links.auth.Register} className="text-secondary-400 text-sm font-light">No account yet? <strong>Register here</strong></Link>
                <Link to={'/forgot-password'} className="text-secondary-400 text-sm font-light">Forgot Password?</Link>
            </div>
            <CustomButton variant={'secondary'} onClick={handleLogin} disabled={isPending}>
                Login
                {isPending && <Spinner />}
            </CustomButton>
        </div>
    )
}

export default Login