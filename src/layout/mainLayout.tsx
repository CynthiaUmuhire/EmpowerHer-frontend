import { EHNavigation } from "@/components/navigation/EHNavigation";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <main className=" flex flex-col h-screen bg-secondary-50  text-primary text-sm md:text-base">
            <header className="px-10">
                <EHNavigation />
            </header>
            <div className="grow overflow-scroll bg-secondary-100">
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