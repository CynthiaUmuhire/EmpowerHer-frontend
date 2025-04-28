import { EHNavigation } from "@/components/navigation/EHNavigation";
import ReachOut from "@/components/ui/reachout";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <main className=" flex flex-col h-screen bg-secondary-50  text-primary">
            <header>
                <EHNavigation />
            </header>
            <div className="grow overflow-scroll">
                <Outlet />
            </div>
            <div>
                <ReachOut />
                <div className="bg-primary-800 text-secondary-50 py-5 text-center">
                    <span className="text-primary-200 text-xs md:text-sm">@{new Date().getFullYear()} All rights reserved</span>
                </div>
            </div>
        </main>
    )
}