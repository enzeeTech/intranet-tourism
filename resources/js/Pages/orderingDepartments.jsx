import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Example from '../Layouts/DashboardLayoutNew';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import { usePage } from '@inertiajs/react';
import { useCsrf } from '@/composables';

const OrderingDepartments = () => {
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState("");
    const { props } = usePage();
    const [isLoading, setIsLoading] = useState(false);
    const csrfToken = useCsrf();

    const fetchDepartments = async () => {
        setIsLoading(true);
        let allDepartments = [];
        let currentPage = 1;
        let totalPages = 1;
    
        try {
            while (currentPage <= totalPages) {
                const response = await fetch(`/api/crud/departments?page=${currentPage}`, {
                    method: 'GET',
                    headers: { Accept: 'application/json' }
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
    
                // Log the data to see its structure
                console.log('Fetched data:', data);
    
                const departmentsArray = data.data?.data || []; // Use `data.data.data` if that is the correct path
                totalPages = data.data?.last_page || 1; // Adjust according to the API response structure
    
                if (Array.isArray(departmentsArray)) {
                    allDepartments = allDepartments.concat(departmentsArray.map(department => ({
                        id: department.id,
                        name: department.name,
                        order: department.order,
                        imageUrl: department.image || '/assets/default-department.png',
                    })));
                } else {
                    throw new Error('Expected an array but received: ' + typeof departmentsArray);
                }
    
                currentPage++;
            }
    
            // Sort departments by id in ascending order
            allDepartments.sort((a, b) => a.id - b.id);
            setDepartments(allDepartments);
    
        } catch (error) {
            console.error('Error:', error);
        }
    
        setIsLoading(false);
    };
    

    useEffect(() => {
        fetchDepartments();
    }, []);

    const updateOrderAttributes = (departments) => {
        return departments.map((department, index) => ({
            ...department,
            order: index,
        }));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedData = Array.from(departments);
        const [reorderedItem] = reorderedData.splice(result.source.index, 1);
        reorderedData.splice(result.destination.index, 0, reorderedItem);

        // Update department order attributes
        const updatedDepartments = updateOrderAttributes(reorderedData);
        setDepartments(updatedDepartments);
    };

    const handleMoveUp = (index) => {
        if (index === 0) return;
        const newData = [...departments];
        [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
        setDepartments(updateOrderAttributes(newData));
    };

    const handleMoveDown = (index) => {
        if (index === departments.length - 1) return;
        const newData = [...departments];
        [newData[index + 1], newData[index]] = [newData[index], newData[index + 1]];
        setDepartments(updateOrderAttributes(newData));
    };

    const updateOrderInDatabase = async (department) => {
        const url = `/api/crud/departments/${department.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken, // Ensure the CSRF token is provided if required
            },
            body: JSON.stringify({ 
                id: department.id,
                order: department.order }), // Send the order in the body
        };
    
        try {
            const response = await fetch(url, options);
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error response from server for department ID ${department.id}: ${errorText}`);
                return null;
            }
    
            const data = await response.json();
    
            if (data && data.success) {
                console.log(`Success: Updated department ID ${department.id} with new order`, data);
                return data;
            } else {
                console.error(`Empty or invalid response for department ID ${department.id}`);
                return null;
            }
        } catch (error) {
            console.error(`Error updating department ID ${department.id}:`, error);
            return null;
        }
    };
    
    const handleSave = async () => {
        try {
            const updatePromises = departments.map(department => updateOrderInDatabase(department));
            const results = await Promise.all(updatePromises);
    
            // Filter out null results before checking for success
            const successfulUpdates = results.filter(result => result && result.success);
    
            if (successfulUpdates.length === departments.length) {
                console.log('All departments updated successfully');
            } else {
                console.log('Some departments failed to update');
            }
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };
    
    
    const handleBack = () => {
        window.location.href = '/orderingDepartments';
    };

    return (
        <Example>
            <div className="flex-row">
                <div className="flex">
                    <main className="w-full mt-5 xl:pl-96 max-w-[1400px]">
                        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-bold text-gray-900">Manage Department Ordering</h1>
                                <div className="flex space-x-4">
                                    <button onClick={handleBack} className="text-lg font-semibold text-black">Back</button>
                                    <button type="button" className="px-4 py-2 text-lg font-semibold text-white bg-red-500 rounded-full hover:bg-red-700" onClick={handleSave}>Save</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[1050px] mb-10 ml-8">
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="departments">
                                    {(provided) => (
                                        <table className="min-w-full divide-y divide-gray-200" {...provided.droppableProps} ref={provided.innerRef}>
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-lg font-bold text-left text-gray-900">Name</th>
                                                    <th className="px-4 py-3 text-lg font-bold text-left text-gray-900">Ordering</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {departments.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                                                        {(provided) => (
                                                            <tr
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className="bg-white border-t border-gray-200"
                                                            >
                                                                <td className="px-6 py-4 text-base font-bold text-black pr-60 whitespace-nowrap" {...provided.dragHandleProps}>
                                                                    <img src={item.imageUrl} alt={item.name} className="inline-block object-cover w-10 mr-6 rounded-full h-11" />
                                                                    {item.name}
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
                                                                            disabled={index === departments.length - 1}
                                                                            style={{ opacity: index === departments.length - 1 ? 0.6 : 1 }}
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

export default OrderingDepartments;
