import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { NavLink } from 'react-router-dom'

type CustomdropDownProps = {
    path: string;
    name: string;
    key: string;
}
export default function CustomdropDown({ path, name, key }: CustomdropDownProps) {
    return (
        <DropdownMenuItem className="text-primary-800 w-full pl-4 flex flex-col gap-2 hover:underline cursor-pointer" key={key}>
            <NavLink to={path} className={({ isActive }) =>
                isActive ? "text-secondary-800 w" : "text-primary-800"
            }>
                {name}
            </NavLink>
        </DropdownMenuItem>

    )
}


