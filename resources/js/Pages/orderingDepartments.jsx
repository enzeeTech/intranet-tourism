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
    
        try {
            const response = await fetch('/api/crud/departments', {
                method: 'GET',
                headers: { Accept: 'application/json' }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Fetched result:', result); // Log the entire result to debug
    
            // Check if 'data' key exists and is an array
            if (result && result.data && Array.isArray(result.data)) {
                const departmentsArray = result.data;
    
                // Map and process departments data
                const departmentsData = departmentsArray.map(department => ({
                    id: department.id,
                    name: department.name,
                    order: department.order,
                    imageUrl: department.banner || '/assets/default-department.png', // Use 'banner' field for image URL
                }));
    
                // Sort departments by 'order'
                departmentsData.sort((a, b) => a.order - b.order);
                setDepartments(departmentsData);
            } else {
                console.error('Error: Expected an array but received:', result.data);
                throw new Error('Expected an array but received: ' + typeof result.data);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
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

        setDepartments(updateOrderAttributes(reorderedData));
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
        try {
            const response = await fetch(`/api/crud/departments/${department.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify({
                    order: department.order,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update order for department with ID ${department.id}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating order:', error);
            return null;
        }
    };

    const handleSave = async () => {
        setIsNotificationVisible(true);
        setNotificationMessage('Saving changes...');

        const updatePromises = departments.map(department => updateOrderInDatabase(department));
        const results = await Promise.all(updatePromises);

        const success = results.every(result => result !== null);
        if (success) {
            setNotificationMessage('Changes saved successfully!');
        } else {
            setNotificationMessage('Failed to save some changes.');
        }

        setTimeout(() => {
            setIsNotificationVisible(false);
            window.location.href = '/staffDirectory';
        }, 1500);
    };

    const handleBack = () => {
        window.location.href = '/staffDirectory';
    };

    return (
        <Example>
            <div className="flex-row ">
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
                                                                <td className="px-6 py-4 text-base font-bold text-black whitespace-nowrap">
                                                                    <div className="flex">
                                                                        <button
                                                                            type="button"
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
                                                                            type="button"
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
                </div>
            </div>
        </Example>
    );
};

export default OrderingDepartments;
