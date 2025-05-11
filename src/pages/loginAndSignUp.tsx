import Login from "../components/ui/login";
import Lottie from 'lottie-react'
import pregnantWoman from '@/assets/PregnantWoman.json'
import { NavLink, useLocation } from "react-router-dom";
import Links from "@/routes/Links";
import Signup from "@/components/ui/signup";
export default function LoginAndSignUp() {
    const { pathname } = useLocation();

    return (
        <section className='h-full overflow-hidden'>
            <div className='flex h-screen'>
                <div className=' h-full inline-flex w-1/2 bg-secondary-400 items-center justify-center'>
                    <div className=''>
                        <Lottie animationData={pregnantWoman} loop className='h-80 w-full' />
                    </div>
                </div>
                <div className="flex flex-col h-full w-1/2 items-start justify-center p-10 text-primary-400">
                    <div className="flex gap-4 mb-6">
                        <NavLink to={Links.Login} className={({ isActive }) => isActive ? "text-secondary-400 border-b-2 border-secondary-400 p-4 text-center" : " p-4 text-center"} >Login</NavLink>
                        <NavLink to={Links.Register} className={({ isActive }) => isActive ? "text-secondary-400 border-b-2 border-secondary-400  p-4 text-center" : "p-4 text-center"}>Register</NavLink>
                    </div>
                    {pathname === Links.Login ? <Login /> : <Signup />}
                </div>
            </div>
        </section>

    )
}