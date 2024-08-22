import React, { useState, useEffect } from "react";
import "./Roles.css";
import { useCsrf } from "@/composables";

export default function Roles() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const csrfToken = useCsrf();

    const roleNameMap = {
        1: { name: "Super Admin", bgColor: "bg-red-100 text-red-700" },
        2: { name: "Department Admin", bgColor: "bg-blue-100 text-blue-700" },
        3: { name: "Community Admin", bgColor: "bg-yellow-100 text-yellow-700" }
    };

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
                return { name: data.data.name, id: id };
            } else {
                console.error('Failed to fetch department name:', response.statusText);
                return { name: "No department", id: null };
            }
        } catch (error) {
            console.error('Error fetching department name:', error);
            return { name: "No department", id: null };
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

    const fetchCommunityName = async (id) => {
        try {
            const response = await fetch(`/api/communities/communities/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });
            if (response.ok) {
                const data = await response.json();
                return { name: data.data.name, id: data.data.id };
            } else {
                console.error('Failed to fetch community name:', response.statusText);
                return { name: "No community", id: null };
            }
        } catch (error) {
            console.error('Error fetching community name:', error);
            return { name: "No community", id: null };
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
                const usersMap = {};

                await Promise.all(
                    data.data.data.map(async (userRole) => {
                        if ([1, 2, 3].includes(userRole.role_id)) {
                            const userResponse = await fetch(`/api/users/users/${userRole.model_id}?with[]=profile&with[]=employmentPosts`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-CSRF-TOKEN': csrfToken || '',
                                },
                            });

                            if (userResponse.ok) {
                                const userData = await userResponse.json();

                                const department = Array.isArray(userData.data.employment_posts) && userData.data.employment_posts.length > 0
                                    ? await fetchDepartmentName(userData.data.employment_posts[0].department_id)
                                    : { name: "No department", id: null };

                                const titleName = Array.isArray(userData.data.employment_posts) && userData.data.employment_posts.length > 0
                                    ? await fetchTitleName(userData.data.employment_posts[0].business_post_id)
                                    : "No title";

                                const userId = userData.data.id;

                                if (!usersMap[userId]) {
                                    usersMap[userId] = {
                                        name: userData.data.name,
                                        id: userId,
                                        title: titleName,
                                        department: department,
                                        image: userData.data.profile.image || '/assets/dummyStaffPlaceHolder.jpg',
                                        status: userData.data.is_active,
                                        roles: [],
                                    };
                                }

                                if (userRole.role_id === 3) { 
                                    const community = await fetchCommunityName(userRole.community_id);
                                    usersMap[userId].community = community;
                                }

                                usersMap[userId].roles.push(roleNameMap[userRole.role_id] || { name: "Unknown Role", bgColor: "bg-gray-100 text-gray-700" });
                            } else {
                                console.error(`Failed to fetch user details for user ID ${userRole.model_id}:`, userResponse.statusText);
                            }
                        }
                    })
                );

                const usersWithRoles = Object.values(usersMap);
                setPeople(usersWithRoles);
                setLoading(false);
            } else {
                console.error('Failed to fetch users with roles:', response.statusText);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching users with roles:', error);
            setLoading(false);
        }
    };

    const handleCommunityClick = (community) => {
        setSelectedCommunity(community);
        setShowPopup(true);
    };

    useEffect(() => {
        fetchUsersWithRoles();
    }, [csrfToken]);

    return (
        <div className="flow-root">
            <div className="container p-8 mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Roles</h1>
                        <p className="text-gray-600">
                            View users with roles
                        </p>
                    </div>
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
                                        >
                                            Roles
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {people.map(person => (
                                        <tr key={person.id}>
                                            <td className="py-5 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-0">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-11 w-11">
                                                        <img
                                                            alt=""
                                                            src={person.image.startsWith('avatar/') ? `/storage/${person.image}` : person.image}
                                                            className="h-12 rounded-full w-11"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-bold text-gray-900">
                                                            {person.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                                                <div className="font-bold text-gray-900">
                                                    {person.title}
                                                </div>
                                            </td>
                                            <td className="px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                                                {person.department.name}
                                            </td>
                                            <td className="px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                                                {person.roles.map((role, index) => {
                                                    if (role.name === "Department Admin") {
                                                        return (
                                                            <a
                                                                key={index}
                                                                href={`/departmentInner?departmentId=${person.department.id}`}
                                                                className={`flex items-center justify-center text-center px-4 py-2 mt-2 text-xs font-medium rounded-full ${role.bgColor} hover:bg-blue-200 cursor-pointer`}
                                                            >
                                                                {role.name}
                                                            </a>
                                                        );
                                                    } else if (role.name === "Community Admin" && person.community) {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className={`flex items-center justify-center text-center px-4 py-2 mt-2 text-xs font-medium rounded-full ${role.bgColor} hover:bg-yellow-200 cursor-pointer`}
                                                            >
                                                                <button
                                                                    onClick={() => handleCommunityClick(person.community)}
                                                                    className="flex items-center justify-center w-full h-full"
                                                                >
                                                                    {role.name}
                                                                </button>
                                                            </div>
                                                        );
                                                    } else {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className={`flex items-center justify-center text-center px-4 py-2 mt-2 text-xs font-medium rounded-full ${role.bgColor}`}
                                                            >
                                                                {role.name}
                                                            </div>
                                                        );
                                                    }
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {showPopup && selectedCommunity && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="p-8 bg-white rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold text-gray-800">Community Information</h2>
                            <hr className="my-1 border-gray-300 " />
                            <p className="mt-4 text-gray-600">
                                <a
                                    href={`/communityInner?communityId=${selectedCommunity.id}`}
                                    className="text-blue-600 underline"
                                >
                                    {selectedCommunity.name}
                                </a>
                            </p>
                            <div className="flex justify-end mt-10">
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
