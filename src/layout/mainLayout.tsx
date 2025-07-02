import { EHNavigation } from "@/components/navigation/EHNavigation";
import Spinner from "@/components/ui/spinner";
import Links from "@/routes/Links";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
    const navigate = useNavigate();
    const [checkedAuth, setCheckedAuth] = useState(false);
    const isAuthenticated = localStorage.getItem('token') !== null;
    useEffect(() => {
        if (!isAuthenticated) {
            navigate(Links.auth.Login, { replace: true });
        } else {
            setCheckedAuth(true);
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated && !checkedAuth) {
        return <section className="flex items-center justify-center h-screen bg-secondary-50">
            <Spinner />
        </section>;
    }

    return (
        <main className=" flex flex-col h-screen bg-secondary-50  text-primary text-sm md:text-base">
            <header className="px-10">
                <EHNavigation />
            </header>
            <div className="grow overflow-y-scroll  bg-secondary-100">
                <Outlet />
            </div>
            <div>
                <div className="bg-primary-800 text-secondary-50 py-5 text-center">
                    <span className="text-primary-200 text-xs md:text-sm">@{new Date().getFullYear()} All rights reserved</span>
                </div>
            </div>
        </main>
    )
}