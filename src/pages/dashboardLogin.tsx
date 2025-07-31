import CenteredContent from "@/components/ui/CenteredContent";
import CustomButton from "@/components/ui/customButton";
import EHInput from "@/components/ui/EHInput";
import Spinner from "@/components/ui/spinner";
import useAdminLogin from "@/hooks/useAdminLogin";
import Links from "@/routes/Links";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function DashboardLogin() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { login, isPending, isError, isSuccess } = useAdminLogin();
    const handleLogin = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            toast.info("Please fill in all fields");
            return;
        }

        login({ email, password });
        if (isError) {
            toast.error("Login failed. Please check your credentials.");
        }
    }
    useEffect(() => {
        if (isSuccess) {
            navigate(Links.protected.Dashboard);
        }
    }, [isSuccess, navigate]);
    return (
        <section className="flex flex-col gap-20 mb-20">
            <div className="h-64 bg-gradient-to-r from-secondary-400 to-secondary-800 text-secondary-50">
                <CenteredContent>
                    <div className=" h-full gap-5 flex flex-col items-start justify-center">
                        <h1 className="font-bold text-2xl md:text-7xl">User Analytics Dashboard</h1>
                        <p>Login to Monitor user engagement and geographic distribution.</p>
                    </div>
                </CenteredContent>
            </div>
            <div className='flex flex-col w-full gap-6'>
                <CenteredContent>
                    <div className="flex flex-col gap-6 ">
                        <EHInput placeholder="Email" label={'Your email'} type='email' ref={emailRef} />
                        <EHInput placeholder="Password" label={'Your Password'} type="password" ref={passwordRef} />
                    </div>
                    <div className="flex justify-between my-6">
                        <Link to={Links.auth.Register} className="text-secondary-400 text-sm font-light">No account yet? <strong>Register here</strong></Link>
                        <Link to={'/forgot-password'} className="text-secondary-400 text-sm font-light">Forgot Password?</Link>
                    </div>
                    <CustomButton variant={'secondary'} onClick={handleLogin} disabled={isPending}>
                        Login
                        {isPending && <Spinner />}
                    </CustomButton>
                </CenteredContent>
            </div>
        </section>
    )
}

export default DashboardLogin

