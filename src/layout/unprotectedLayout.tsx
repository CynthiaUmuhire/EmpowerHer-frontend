import { Outlet } from "react-router-dom";

export default function UnprotectedLayout() {
    return (
        <main className=" flex flex-col h-screen bg-secondary-50  text-primary text-sm md:text-base">
            <Outlet />
        </main>
    )
}