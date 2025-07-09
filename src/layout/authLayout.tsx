import Links from "@/routes/Links";
import { BarChart3 } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <main className=" flex flex-col h-screen bg-secondary-50  text-primary text-sm md:text-base">
            <div className="grow overflow-scroll">
                <Outlet />
            </div>
            <div className="bg-primary-800 text-secondary-50 py-5 text-center">
                <Link to={Links.auth.analytics} className="text-accent-100 p-4 text-center flex gap-1">
                    <BarChart3 className="" />
                    <p>Analytics</p>
                </Link>
                <span className="text-primary-200 text-xs md:text-sm">@{new Date().getFullYear()} All rights reserved</span>
            </div>
        </main>
    )
}