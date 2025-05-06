import Links from "@/routes/Links";
import { NavLink } from "react-router-dom";
import CustomdropDown from "../ui/customdropDown";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const arrayLinks = Object.entries(Links);
export function EHNavigation() {
    return (
        <section>
            <div className="flex items-center justify-between bg-secondary-50 p-4">
                <div>
                    <strong className="text-secondary-800">EmpowerHer</strong>
                </div>
                <div className="md:flex gap-4 hidden ">
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
                <div className="px-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="px-4 text-center">Menu</DropdownMenuTrigger>
                        <DropdownMenuContent className=''>
                            {arrayLinks.map((link) => link[0] !== "NotFound" && (
                                <CustomdropDown
                                    key={link[0]}
                                    path={link[1]}
                                    name={link[0]}
                                />
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </section>
    )
}