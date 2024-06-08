import React from 'react';
import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Account Settings', href: '#', icon: HomeIcon },
    { name: 'Themes', href: '#', icon: UsersIcon },
    { name: 'Advance Settings', href: '#', icon: FolderIcon },
    { name: 'Departments', href: '#', icon: CalendarIcon },
    { name: 'Categories', href: '#', icon: DocumentDuplicateIcon },
    { name: 'Requests', href: '#', icon: ChartPieIcon },
    { name: 'Audit Trail', href: '#', icon: ChartPieIcon },
    { name: 'Feedback', href: '#', icon: ChartPieIcon },
    { name: 'Birthday Template', href: '#', icon: ChartPieIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

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
                            <item.icon
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
