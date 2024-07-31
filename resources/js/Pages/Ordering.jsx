import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Example from '../Layouts/DashboardLayoutNew';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import { usePage } from '@inertiajs/react';

const Ordering = () => {
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const { props } = usePage();
    const [staffMembers, setStaffMembers] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState("");
    const departmentId = props.departmentId;
    const [isLoading, setIsLoading] = useState(false);

    const fetchStaffMembers = async (departmentId) => {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/crud/employment_posts?department_id=${departmentId}`, {
            method: "GET",
            headers: { Accept: 'application/json' }
            });
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            const data = await response.json();

            const members = data.members.map(member => ({
            id: member.user_id,
            name: member.name,
            role: member.title,
            status: 'Online',
            imageUrl: member.image,
            workNo: member.work_phone,
            phoneNo: member.phone_no,
            isDeactivated: member.is_active,
            order: member.order,
            }));

            setStaffMembers(members);
        } catch (error) {
            console.error("Error:", error);
        }
        setIsLoading(false);
    };
    
    useEffect(() => {
        if (departmentId) {
          fetchStaffMembers(departmentId);
        }
      }, [departmentId]);


    const updateOrderAttributes = (members) => {
        return members.map((member, index) => ({
            ...member,
            order: index.toString(),
        }));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedData = Array.from(staffMembers);
        const [reorderedItem] = reorderedData.splice(result.source.index, 1);
        reorderedData.splice(result.destination.index, 0, reorderedItem);

        setStaffMembers(updateOrderAttributes(reorderedData));
    };

    const handleMoveUp = (index) => {
        if (index === 0) return;
        const newData = [...staffMembers];
        [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
        setStaffMembers(updateOrderAttributes(newData));
    };

    const handleMoveDown = (index) => {
        if (index === staffMembers.length - 1) return;
        const newData = [...staffMembers];
        [newData[index + 1], newData[index]] = [newData[index], newData[index + 1]];
        setStaffMembers(updateOrderAttributes(newData));
    };

    const updateOrderInDatabase = async (id, order) => {
        try {
            const response = await fetch(`/api/crud/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order: order }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update order for user with ID ${id}`);
            }

            const responseBody = await response.text();
            return responseBody ? JSON.parse(responseBody) : {};
        } catch (error) {
            console.error('Error updating order:', error);
            return null;
        }
    };

    const handleSave = async () => {
        setIsNotificationVisible(true);
        setNotificationMessage("Saving changes...");
        
        const updatePromises = staffMembers.map((member) => updateOrderInDatabase(member.id, member.order));
        
        const results = await Promise.all(updatePromises);

        const success = results.every(result => result !== null);
        if (success) {
            setNotificationMessage("Changes saved successfully!");
        } else {
            setNotificationMessage("Failed to save some changes.");
        }

        setTimeout(() => {
            setIsNotificationVisible(false);
            window.location.href = `/staffDirectory?departmentId=${props.departmentId}`;
        }, 1500);
    };

    const handleBack = () => {
        window.location.href = `/staffDirectory?departmentId=${props.departmentId}`;
    };

    return (
        <Example>
            <div className="flex-row ">
                <div className="flex">
                    <main className="w-full mt-5 xl:pl-96 max-w-[1400px]">
                        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-bold text-gray-900 ">Manage Ordering</h1>
                                <div className="flex space-x-4">
                                    <button onClick={handleBack} className="text-lg font-semibold text-black">Back</button>
                                    <button className="px-4 py-2 text-lg font-semibold text-white bg-red-500 rounded-full hover:bg-red-700" onClick={handleSave}>Save</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[1050px] mb-10 ml-8">
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="staff">
                                    {(provided) => (
                                        <table className="min-w-full divide-y divide-gray-200" {...provided.droppableProps} ref={provided.innerRef}>
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-lg font-bold text-left text-gray-900">Name</th>
                                                    <th className="px-4 py-3 text-lg font-bold text-left text-gray-900">Ordering</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {staffMembers.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                                                        {(provided) => (
                                                            <tr
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className="bg-white border-t border-gray-200"
                                                            >
                                                                <td className="px-6 py-4 text-base font-bold text-black pr-60 whitespace-nowrap" {...provided.dragHandleProps}>
                                                                    <img src={item.imageUrl === '/assets/dummyStaffPlaceHolder.jpg' ? '/assets/dummyStaffPlaceHolder.jpg' : `/avatar/full/${item.imageUrl}`} alt={item.name} className="inline-block object-cover w-10 mr-6 rounded-full h-11 " />
                                                                    {item.name}
                                                                    {item.isDeactivated && <span className="ml-2 text-red-500">(Deactivated)</span>}
                                                                </td>
                                                                <td className="px-1 py-4 text-sm font-semibold text-black whitespace-nowrap">
                                                                    <div className="flex items-center">
                                                                        <button
                                                                            className="px-2"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleMoveUp(index);
                                                                            }}
                                                                            disabled={index === 0}
                                                                            style={{ opacity: index === 0 ? 0.6 : 1 }}
                                                                        >
                                                                            <img src="assets/orderingup.svg" alt="Up" />
                                                                        </button>
                                                                        <button
                                                                            className="px-2"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleMoveDown(index);
                                                                            }}
                                                                            disabled={index === staffMembers.length - 1}
                                                                            style={{ opacity: index === staffMembers.length - 1 ? 0.6 : 1 }}
                                                                        >
                                                                            <img src="assets/orderingdown.svg" alt="Down" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </tbody>
                                        </table>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </main>
                    <aside className="fixed bottom-0 hidden px-4 py-6 overflow-y-auto border-r border-gray-200 left-20 top-16 w-96 sm:px-6 lg:px-8 xl:block">
                        <style>
                            {`
                            aside::-webkit-scrollbar {
                                width: 0px;
                                background: transparent;
                            }
                            `}
                        </style>
                        <div className="file-directory-header">
                            <PageTitle title="Staff Directory" />
                        </div>
                        <hr className="file-directory-underline" />
                        <div>
                            <FeaturedEvents />
                            <WhosOnline />
                        </div>
                    </aside>
                </div>
            </div>
            {isNotificationVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
                    <div className="p-4 bg-white rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">{notificationMessage}</p>
                    </div>
                </div>
            )}
        </Example>
    );
};

export default Ordering;
