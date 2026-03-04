import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Divider,
} from "@heroui/react";
import { useContext } from "react";
import { authObject } from "../../context/TokenContext/TokenContext";
import { Link } from "react-router-dom";
import DarkModeToggle from './../DarkModeButton/DarkModeButton';

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
    const {clearToken, user} = useContext(authObject)
    return (
        <Navbar>
        <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
            <Link color="foreground" to="">
                Home
            </Link>
            </NavbarItem>
            <NavbarItem isActive>
            <Link aria-current="page" color="secondary" href="#">
                Customers
            </Link>
            </NavbarItem>
            <NavbarItem>
            <Link color="foreground" href="#">
                Integrations
            </Link>
            </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={user?.photo}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">@{user?.username || user?.name}</p>
                </DropdownItem>
                <DropdownItem key="profile" color="danger">
                    <Link to='/profile' className="w-full h-full block -my-2  py-2">
                        Profile
                    </Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={clearToken}>
                Log Out
                </DropdownItem>
                <DropdownItem >
                    <Divider />
                </DropdownItem>
                <DropdownItem>
                    <DarkModeToggle />
                </DropdownItem>
            </DropdownMenu>
            </Dropdown>
        </NavbarContent>
        </Navbar>
    );
}
