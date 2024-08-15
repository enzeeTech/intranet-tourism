import React, { useState, useEffect } from "react";
import "./Roles.css";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useCsrf } from '@/composables';

const initialPeople = [
    {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        department: "Optimization",
        email: "lindsay.walton@example.com",
        role: "",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Courtney Henry",
        title: "Designer",
        department: "Intranet",
        email: "courtney.henry@example.com",
        role: "",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Tom Cook",
        title: "Director of Product",
        department: "Directives",
        email: "tom.cook@example.com",
        role: "",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Whitney Francis",
        title: "Copywriter",
        department: "Program",
        email: "whitney.francis@example.com",
        role: "",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Leonard Krasner",
        title: "Senior Designer",
        department: "Mobility",
        email: "leonard.krasner@example.com",
        role: "",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
];

export default function Roles() {
    const [people, setPeople] = useState(initialPeople);
    const [roles, setRoles] = useState([]);
    const csrfToken = useCsrf();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch('/api/permission/roles', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken || '',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const roles = data.data.data.map(role => ({
                        id: role.id,
                        name: role.name,
                    }));
                    setRoles(roles);
                } else {
                    console.error('Failed to fetch roles:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, [csrfToken]);

    const handleRoleChange = (email, newRole) => {
        setPeople(prevPeople =>
            prevPeople.map(person =>
                person.email === email ? { ...person, role: newRole } : person
            )
        );
    };

    return (
        <div className="flow-root">
            <div className="container p-8 mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Roles
                        </h1>
                        <p className="text-gray-600">
                            Manage the role here to Admin or Super Admin.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-full"
                    >
                        Assign As Admin
                    </button>
                </div>
                <div className="box-container -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-1">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-0"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                                        style={{ width: "12rem" }}
                                    >
                                        Role
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {people.map(person => (
                                    <tr key={person.email}>
                                        <td className="py-5 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-11 w-11">
                                                    <img alt="" src={person.image} className="rounded-full h-11 w-11" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-bold text-gray-900">
                                                        {person.name}
                                                    </div>
                                                    <div className="mt-1 text-gray-500">
                                                        {person.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                                            <div className="font-bold text-gray-900">
                                                {person.title}
                                            </div>
                                            <div className="mt-1 text-gray-500">
                                                {person.department}
                                            </div>
                                        </td>
                                        <td className="px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                                            <span className="inline-flex items-center px-4 py-2 text-xs font-medium text-green-700 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" style={{ width: "100%" }}>
                                                    {person.role.name || 'Select Role'}
                                                    <ChevronDownIcon aria-hidden="true" className="w-5 h-5 -mr-1 text-gray-400" />
                                                </MenuButton>
                                                <MenuItems className="absolute right-0 z-10 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {roles.map(role => (
                                                        <MenuItem key={role.id} as="button" onClick={() => handleRoleChange(person.email, role)} className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
                                                            {role.name}
                                                        </MenuItem>
                                                    ))}
                                                </MenuItems>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
