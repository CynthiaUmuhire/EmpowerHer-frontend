import { Link } from "react-router-dom"
import EHInput from "./EHInput"
import Links from "@/routes/Links"
import CustomButton from "./customButton"

function Login() {
    return (
        <div className='flex flex-col w-full gap-6'>
            <div className="flex flex-col gap-6 ">
                <EHInput placeholder="Enter your email address" label={'Email address'} type='email' />
                <EHInput placeholder="Password" label={'Your Password'} type="password" />
            </div>
            <div className="flex justify-between">
                <Link to={Links.Register} className="text-secondary-400 text-sm font-light">No account yet? <strong>Register here</strong></Link>
                <Link to={'/forgot-password'} className="text-secondary-400 text-sm font-light">Forgot Password?</Link>
            </div>
            <CustomButton variant={'secondary'}>
                Login
            </CustomButton>
            <div className="flex flex-col justify-center gap-2">
                <hr className="text-primary-200" />
                <span className="text-primary-200 font-light text-sm text-center"> or continue with</span>
            </div>
            <div className="flex justify-around ">
                <p>Login with Google</p>
            </div>
        </div>
    )
}

export default Login