import { Link } from "react-router-dom";
import CustomButton from "./customButton";
import EHInput from "./EHInput";
import Links from "@/routes/Links";

export default function Signup() {
    return (
        <div className='flex flex-col w-full gap-3'>
            <div className="flex flex-col gap-4 ">
                <EHInput placeholder="Enter your email address" label={'Email Address'} type='email' />
                <EHInput placeholder="Your phone number" label={'Phone Number'} type="number" />
                <EHInput placeholder="Password" label={'Your Password'} type="password" />
                <EHInput placeholder="Confirm Password" label={'Confirm Password'} type="password" />
            </div>
            <div className="flex justify-between flex-row-reverse">
                <Link to={Links.Login} className="text-secondary-400 text-sm font-light ">Already have an account? <strong>Login</strong></Link>
            </div>
            <CustomButton variant={'secondary'}>
                Register
            </CustomButton>
            <div className="flex flex-col justify-center gap-2">
                <hr className="text-primary-200" />
                <span className="text-primary-200 font-light text-sm text-center"> or continue with</span>
            </div>
            <div className="flex justify-around ">
                <p>Register with USSD Credentials</p>
                <p>Register with Google</p>
            </div>
        </div>
    )
}