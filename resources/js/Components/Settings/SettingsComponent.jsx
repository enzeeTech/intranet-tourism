import React from 'react';
import classNames from 'classnames'

const navigation = [
    { name: 'Basic Settings', href: '#', src: "assets/Dashboard Active.svg" },
    { name: 'Themes', href: '#', src: "assets/Dashboard Active.svg" },
    { name: 'Advance Settings', href: '#', src: "assets/Dashboard Active.svg" },
    { name: 'Departments', href: '#', src: "assets/Dashboard Active.svg" },
    { name: 'Media', href: '#', src: "assets/Dashboard Active.svg" },
    { name: 'Requests', href: '#', src: "assets/Dashboard Active.svg" },
    { name: 'Audit Trail', href: '#', src: "assets/Dashboard Active.svg" },
    { name: 'Feedback', href: '#', src: "assets/Dashboard Active.svg" },
    { name: 'Birthday Template', href: '#', src: "assets/Dashboard Active.svg" },
    { name: 'Pautan', href: '#', src: "assets/Dashboard Active.svg" },
];

const SettingNavigation = ({ current, setCurrent }) => {
    return (
        <nav className="flex flex-1 flex-col" aria-label="Sidebar">
            <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                    <li key={item.name}>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrent(item.name);
                            }}
                            className={classNames(
                                item.name === current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                        >
                            <img
                                src={item.src}
                                alt={`${item.name} icon`}
                                className={classNames(
                                    item.name === current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                    'h-6 w-6 shrink-0'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SettingNavigation;