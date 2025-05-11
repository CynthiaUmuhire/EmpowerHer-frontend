import { useNavigate } from "react-router-dom"
import notFoundIcon from '../assets/404.json'
import Lottie from "lottie-react"
import CustomButton from "@/components/ui/customButton"

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <main>
            <div className="bg-gray-50">
                <div className="flex h-screen">
                    <div className="m-auto text-center">
                        <div>
                            <Lottie animationData={notFoundIcon} loop={true} autoplay={true} className="w-1/2 m-auto" />
                        </div>
                        <p className="text-sm md:text-base text-slate-500 p-2 my-6">
                            Page not found!
                        </p>
                        <CustomButton variant='secondary' onClick={() => navigate(-1)}>Go Back</CustomButton>
                    </div>
                </div>
            </div>
        </main>
    )
}
