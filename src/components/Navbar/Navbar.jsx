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
import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "./../DarkModeButton/DarkModeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faAddressBook,
    faGear,
    faHome,
    faUser,
    faBell,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/tawasoulIcon.png";

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
    const { clearToken, user } = useContext(authObject);
    return (
        <Navbar>
            <NavbarBrand>
                <img src={logo} alt="tawasoul logo" className="h-20" />
                {/* <p className="font-bold text-inherit">ACME</p> */}
            </NavbarBrand>

            <NavbarContent className="flex gap-4" justify="center">
                <NavbarItem>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary font-bold"
                                : "text-default-500"
                        }
                        to="/"
                    >
                        <FontAwesomeIcon icon={faHome} /> <span className="hidden sm:inline">Home</span> 
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary font-bold"
                                : "text-default-500"
                        }
                        to="/profile"
                    >
                        <FontAwesomeIcon icon={faUser} /> <span className="hidden sm:inline">Profile</span> 
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary font-bold"
                                : "text-default-500"
                        }
                        to="/UnderProcess"
                    >
                        <FontAwesomeIcon icon={faBell} /> <span className="hidden sm:inline">Notification</span> 
                    </NavLink>
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
                            <p className="font-semibold">
                                @{user?.username || user?.name}
                            </p>
                        </DropdownItem>
                        <DropdownItem key="profile" color="default">
                            <Link
                                to="/settings"
                                className="w-full h-full block -my-2  py-2"
                            >
                                <FontAwesomeIcon
                                    icon={faGear}
                                    className="me-1"
                                />{" "}
                                Settings
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="profile" color="default">
                            <Link
                                to="/profile"
                                className="w-full h-full block -my-2  py-2"
                            >
                                <FontAwesomeIcon
                                    icon={faAddressBook}
                                    className="me-1"
                                />{" "}
                                Profile
                            </Link>
                        </DropdownItem>
                        <DropdownItem
                            key="logout"
                            color="danger"
                            onClick={clearToken}
                        >
                            <FontAwesomeIcon
                                icon={faArrowRightFromBracket}
                                className="me-1"
                            />{" "}
                            Log Out
                        </DropdownItem>
                        <DropdownItem>
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
