import Links from "@/routes/Links";
import { NavLink } from "react-router-dom";

const arrayLinks = Object.entries(Links);
export function EHNavigation() {
    return (
        <section>
            <div className="flex items-center justify-between bg-secondary-50 p-4">
                <div>
                    <strong className="text-secondary-800">EmpowerHer</strong>
                </div>
                <div className="flex gap-4">
                    {arrayLinks.map((link) => link[0] !== "NotFound" && (
                        <NavLink
                            key={link[0]}
                            to={link[1]}
                            className={({ isActive }) =>
                                isActive ? "text-secondary-800" : "text-primary-800"
                            }
                        >
                            {link[0]}
                        </NavLink>
                    ))}
                </div>
            </div>
        </section>
    )
}