import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { usePage } from '@inertiajs/react';
import NotificationPopup from '../Components/Noti-popup-test';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

// ----------------------------//
export default function Header({ setSidebarOpen }) {
    const { props } = usePage();
    const { id } = props; // Access the user ID from props
    const [userData, setUserData] = useState({
        name: "",
        profileImage: "",
    });

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [csrfToken, setCsrfToken] = useState(null);

    const notificationRef = useRef();

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
        setIsActive(!isActive);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setIsPopupVisible(false);
            setIsActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        setCsrfToken(token);
    }, []);

    useEffect(() => {
        console.log("Fetching user data...");
        fetch(`/api/crud/users/${id}?with[]=profile`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            //-----------------------------//
            .then(({ data }) => {
                // const firstName = data.name.split(' ')[0];
                setUserData(pv => ({
                    ...pv, ...data,
                    name: data.name,
                    profileImage: data.profile && data.profile.image ? `/storage/${data.profile.image}` : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${data.name}&rounded=true`
                }));
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [id]);

    const handleLogout = (event) => {
        event.preventDefault();
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
        })
            .then(() => {
                window.location.href = '/';
            })
            .catch((err) => console.error(err));
    };

    const userNavigation = [
        { name: 'Your profile', href: '../profile' },
        { name: 'Log out', href: '/logout', onClick: handleLogout },
    ];

    const getIconSrc = () => {
        if (isActive) {
            return "/assets/bell-active.svg";
        } else if (isHovered) {
            return "/assets/bell-hover.svg";
        } else {
            return "/assets/bell.svg";
        }
    };

    return (
        <div className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex items-center self-stretch flex-1 gap-x-4 lg:gap-x-6">
                <img
                    className="h-8 w-[70px] hidden lg:block"
                    src="/assets/Jomla logo red.svg"
                    alt="Jomla Logo"
                />
                <form className="relative flex flex-1" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                        Search
                    </label>
                    <MagnifyingGlassIcon
                        className="absolute inset-y-0 left-0 w-5 h-full text-gray-400 pointer-events-none"
                        aria-hidden="true"
                    />
                    <input
                        id="search-field"
                        className="block w-full h-full py-0 pl-8 pr-0 text-gray-900 border-0 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                        placeholder="Search..."
                        type="search"
                        name="search"
                    />
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <div className="relative" ref={notificationRef}>
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 -mt-0.5"
                            onClick={togglePopup}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img src={getIconSrc()} className="w-6 h-6" aria-hidden="true" />
                        </button>
                        {isPopupVisible && (
                            <NotificationPopup />
                        )}
                    </div>

                    {/* Separator */}
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                    {/* Profile dropdown */} {/*//------------------------//*/}
                    <Menu as="div" className="relative">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full bg-gray-50"
                                src={userData.profileImage}
                                alt=""
                            />
                            <span className="hidden lg:flex lg:items-center">
                                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                    {userData.name}
                                </span>
                                <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400" aria-hidden="true" />
                            </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                            <a
                                                href={item.href}
                                                className={classNames(
                                                    active ? 'bg-gray-50' : '',
                                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                )}
                                                onClick={item.name === 'Log out' ? handleLogout : null}
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
}
