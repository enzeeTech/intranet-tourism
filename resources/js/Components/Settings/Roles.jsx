import React, { useState, useEffect } from "react";
import "./Roles.css";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useCsrf } from '@/composables';

export default function Roles() {
    const [people, setPeople] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const csrfToken = useCsrf();

    const roleNameMap = {
        1: "Super Admin",
        2: "Department Admin",
        3: "User"
    };

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
                const fetchedRoles = data.data.data.map(role => ({
                    id: role.id,
                    name: role.name,
                }));
                setRoles(fetchedRoles);
            } else {
                console.error('Failed to fetch roles:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    console.log('roles', roles);

    const fetchDepartmentName = async (id) => {
        try {
            const response = await fetch(`/api/department/departments/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data.data.name || "No department";
            } else {
                console.error('Failed to fetch department name:', response.statusText);
                return "No department";
            }
        } catch (error) {
            console.error('Error fetching department name:', error);
            return "No department";
        }
    };

    const fetchTitleName = async (id) => {
        try {
            const response = await fetch(`/api/department/business_posts/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data.data.title || "No title";
            } else {
                console.error('Failed to fetch title name:', response.statusText);
                return "No title";
            }
        } catch (error) {
            console.error('Error fetching title name:', error);
            return "No title";
        }
    };

    const fetchUsersWithRoles = async (pageUrl = '/api/permission/model-has-roles') => {
        try {
            const response = await fetch(pageUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                const usersWithRoles = await Promise.all(
                    data.data.data.map(async (userRole) => {
                        const userResponse = await fetch(`/api/users/users/${userRole.model_id}?with[]=profile&with[]=employmentPosts`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': csrfToken || '',
                            },
                        });
    
                        if (userResponse.ok) {
                            const userData = await userResponse.json();
    
                            // Make API calls to fetch department and title names
                            const departmentName = Array.isArray(userData.data.employment_posts) && userData.data.employment_posts.length > 0
                                ? await fetchDepartmentName(userData.data.employment_posts[0].department_id)
                                : "No department";
    
                            const titleName = Array.isArray(userData.data.employment_posts) && userData.data.employment_posts.length > 0
                                ? await fetchTitleName(userData.data.employment_posts[0].business_post_id)
                                : "No title";
    
                            return {
                                name: userData.data.name,
                                id: userData.data.id,
                                title: titleName,
                                department: departmentName,
                                email: userData.data.email,
                                roles: [userRole.role_id],  
                                image: userData.data.profile.image || '/assets/dummyStaffPlaceHolder.jpg',
                                status: userData.data.is_active,
                            };
                        } else {
                            console.error(`Failed to fetch user details for user ID ${userRole.model_id}:`, userResponse.statusText);
                            return null;
                        }
                    })
                );
    
                setPeople(usersWithRoles.filter(user => user !== null));
                setLoading(false); 
    
                // Handle pagination
                setNextPageUrl(data.data.next_page_url);
                setPrevPageUrl(data.data.prev_page_url);
    
            } else {
                console.error('Failed to fetch users with roles:', response.statusText);
                setLoading(false); 
            }
        } catch (error) {
            console.error('Error fetching users with roles:', error);
            setLoading(false); 
        }
    };
    
    
    console.log('people', people);

    useEffect(() => {
        fetchRoles();
    }, [csrfToken]);

    useEffect(() => {
        if (roles.length > 0) {
            fetchUsersWithRoles();
        }
    }, [roles]);

    const handleRoleChange = (email, newRole) => {
        const user = people.find(person => person.email === email);

        if ((Array.isArray(user.roles) && user.roles.includes(2) && newRole.id === 1) || 
            (Array.isArray(user.roles) && user.roles.includes(1) && newRole.id === 3)) {

            setSelectedUser({ ...user, newRole });
            setShowConfirmPopup(true);
        } else {
            updateRole(email, newRole);
        }
    };

    const updateRole = async (email, newRole) => {
        try {
            const user = people.find(person => person.email === email);
            let updatedRoles = [];
    
            if (newRole.id === 1) {
                // Promote to Super Admin
                updatedRoles = [1];
            } else if (newRole.id === 3) {
                // Demote to User
                updatedRoles = [3];
            }
    
            const response = await fetch(`/api/permission/model-has-roles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify({
                    role_id: updatedRoles, 
                    model_id: user.id,
                }),
            });
    
            if (response.ok) {
                setPeople(prevPeople =>
                    prevPeople.map(person =>
                        person.email === email ? { ...person, roles: updatedRoles } : person
                    )
                );
            } else {
                console.error('Failed to update role:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };
    

    const confirmRoleChange = () => {
        updateRole(selectedUser.email, selectedUser.newRole);
        setShowConfirmPopup(false);
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
                            Manage the role here for user.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowConfirmPopup(true)}
                        className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Assign New Super Admin
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="-mx-4 -my-2 overflow-x-auto box-container sm:-mx-6 lg:-mx-0 shadow-custom">
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
                                            Department
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
                                                    <img
                                                        alt=""
                                                        src={person.image.startsWith('avatar/') ? `/storage/${person.image}` : person.image}
                                                        className="rounded-full h-11 w-11"
                                                    />
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
                                                {person.status ? (<span className="inline-flex items-center px-4 py-2 text-xs font-medium text-red-700 rounded-md bg-red-50 first-letter:ring-1 ring-inset ring-red-600/20">
                                                    {person.status ? 'Inactive' : 'Active'}
                                                </span>) : 
                                                (<span className="inline-flex items-center px-4 py-2 text-xs font-medium text-green-700 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20"> 
                                                    {person.status ? 'Inactive' : 'Active'}
                                                </span>)}
                                            </td>
                                            <td className="px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" style={{ width: "12rem" }}>
                                                    {person.roles && person.roles.find(roleId => roleId === 1) ? 'Super Admin' : person.roles && person.roles.find(roleId => roleId === 2) ? 'Department Admin' : 'User'}
                                                    <ChevronDownIcon aria-hidden="true" className="w-5 h-5 -mr-1 text-gray-400" />
                                                </MenuButton>
                                                <MenuItems className="absolute right-0 z-10 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {person.roles.includes(1) ? (
                                                        <MenuItem
                                                            as="button"
                                                            onClick={() => handleRoleChange(person.email, { id: 3, name: 'User' })}
                                                            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                                        >
                                                            User
                                                        </MenuItem>
                                                    ) : person.roles.includes(2) ? (
                                                        <>
                                                            <MenuItem
                                                                as="button"
                                                                onClick={() => handleRoleChange(person.email, { id: 1, name: 'Super Admin' })}
                                                                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                                            >
                                                                Super Admin
                                                            </MenuItem>
                                                            <MenuItem
                                                                as="button"
                                                                onClick={() => handleRoleChange(person.email, { id: 3, name: 'User' })}
                                                                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                                            >
                                                                User
                                                            </MenuItem>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MenuItem
                                                                as="button"
                                                                onClick={() => handleRoleChange(person.email, { id: 1, name: 'Super Admin' })}
                                                                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                                            >
                                                                Super Admin
                                                            </MenuItem>
                                                            <MenuItem
                                                                as="button"
                                                                onClick={() => handleRoleChange(person.email, { id: 2, name: 'Department Admin' })}
                                                                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                                            >
                                                                Department Admin
                                                            </MenuItem>
                                                        </>
                                                    )}
                                                </MenuItems>
                                            </Menu>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {showConfirmPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="p-8 bg-white rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold text-gray-800">Confirm Action</h2>
                            <p className="mt-2 text-gray-600">Are you sure you want to {selectedUser.newRole.name === "Super Admin" ? 'promote' : 'demote'} {selectedUser?.name} to {selectedUser.newRole.name}?</p>
                            <div className="flex justify-end mt-4 space-x-2">
                                <button
                                    onClick={() => setShowConfirmPopup(false)}
                                    className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmRoleChange}
                                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
