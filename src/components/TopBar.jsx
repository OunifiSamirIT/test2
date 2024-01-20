import React, { Fragment } from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SetTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";
import Logo from "../assets/ODIN2.png";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(SetTheme(themeValue));
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("user");

    // Dispatch logout action to reset user state

    // Use useNavigate to redirect to the login page
    navigate("/login");
  };
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const userId = storedUserData.id;

  console.log(storedUserData);

  const userNavigation = [
    { name: "Your Profile", href: "/profile/edit" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "/login", onClick: () => handleLogout() },
  ];
  return (
    <div className="topbar h-[50%] w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2  rounded text-white">
          <img
            src={Logo}
            // alt={userpf?.email}
            className="w-10 h-12 p-1  object-cover "
          />
        </div>
      </Link>

      <nav className="flex-grow flex justify-center">
        <Link to={`/gallery/${userId}`} className="text-ascent-1 mt-1 mx-3">
          Gallery{" "}
        </Link>
        <Link to="/link2" className="text-ascent-1 mt-1 mx-3">
          Events{" "}
        </Link>
        <Link to="/link3" className="text-ascent-1 mt-1 mx-3">
          Camps{" "}
        </Link>
        <Link to="/link4" className="text-ascent-1 mt-1 mx-3">
          Setting{" "}
        </Link>
        <Link to="/addFriend" className="text-ascent-1 mt-1 mx-3">
          Add Friend{" "}
        </Link>
      </nav>
      {/* ICONS */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>

        <>
          {" "}
          <span className="text-base font-semibold leading-7 text-gray-900">
            {storedUserData.login}{" "}
          </span>
          {/* <img
              class="h-10 w-10  rounded-full"
              src="/src/assets/log.jpg"
              alt="User Image"
            /> */}
        </>

        <div>
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-6 w-6 rounded-full"
                  src="/src/assets/log.jpg"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-black"
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
