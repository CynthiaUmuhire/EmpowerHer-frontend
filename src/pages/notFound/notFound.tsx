import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"

import notFoundIcon from "../../assets/notFound.svg"

export default function NotFound() {
    return (
        <main>
            <div className="bg-gray-50">
                <div className="flex h-screen">
                    <div className="m-auto text-center">
                        <div>
                            <img src={notFoundIcon} />
                        </div>
                        <p className="text-sm md:text-base text-slate-500 p-2 my-6">
                            Page not found!
                        </p>
                        <Link className={buttonVariants({ variant: "default" })} to="/">Redirect Home</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
