import { Link, useNavigate } from "react-router-dom"
import EHInput from "./EHInput"
import Links from "@/routes/Links"
import CustomButton from "./customButton"
import { useEffect, useRef, useState } from "react";
import useUserLogin from "@/hooks/useUserlogin";
import Spinner from "./spinner";
import RoleSelector from "./roleselector";
import { BACKEND_URL } from "@/config";

function Login() {
    const identifierRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [role, setRole] = useState<string | null>(null)
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
        if (isError) {
            alert("Login failed. Please check your credentials.");
        }
    }
    const handleContinueToLogin = () => {
        if (role === 'mother') {
            setCurrentStep(2);
        }
        if (role === 'facilitator') {
            window.location.href = `${BACKEND_URL}/admin/auth/login`
        }
    };
    useEffect(() => {
        if (isSuccess) {
            console.log("Login successful");
            navigate(Links.protected.Home);
        }
    }, [isSuccess, navigate]);
    return (
        <div className='flex flex-col w-full gap-6'>
            {currentStep === 1 && (
                <RoleSelector
                    setRole={setRole}
                    onContinue={handleContinueToLogin}
                />
            )}
            {currentStep === 2 && (
                <><div className="flex flex-col gap-6 ">
                    <EHInput placeholder="Phone or username" label={'User name or phone number'} type='tel' ref={identifierRef} />
                    <EHInput placeholder="Password" label={'Your Password'} type="password" ref={passwordRef} />
                </div><div className="flex justify-between">
                        <Link to={Links.auth.Register} className="text-secondary-400 text-sm font-light">No account yet? <strong>Register here</strong></Link>
                        <Link to={'/forgot-password'} className="text-secondary-400 text-sm font-light">Forgot Password?</Link>
                    </div><CustomButton variant={'secondary'} onClick={handleLogin} disabled={isPending}>
                        Login
                        {isPending && <Spinner />}
                    </CustomButton></>
            )}


        </div>
    )
}

export default Login

