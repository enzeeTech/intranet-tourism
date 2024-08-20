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
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0); 
    const csrfToken = useCsrf();

    const fetchDepartments = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { Accept: 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const departmentsArray = data.data.data.map((department) => ({
                id: department.id,
                name: department.name,
                order: department.order,
                imageUrl: department.banner ? `/storage/${department.banner}` : 'assets/departmentsDefault.jpg',
            }));

            setDepartments((prevDepartments) => {
                const allDepartments = [...prevDepartments, ...departmentsArray];
                return allDepartments.sort((a, b) => a.order - b.order); 
            });

            if (data.data.next_page_url) {
                fetchDepartments(data.data.next_page_url);
            } else {
                setIsLoading(false);
            }

        } catch (error) {
            console.error('Error fetching departments:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        setDepartments([]); 
        fetchDepartments('/api/department/departments');
    }, []);

    const updateOrderAttributes = (departments) => {
        return departments.map((department, index) => ({
            ...department,
            order: index + 1, 
        }));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
    
        const reorderedData = Array.from(departments);
        const [reorderedItem] = reorderedData.splice(result.source.index, 1);
        reorderedData.splice(result.destination.index, 0, reorderedItem);
    
        const updatedDepartments = updateOrderAttributes(reorderedData);
    
        setDepartments(updatedDepartments);
    };

    const updateOrderInDatabase = async (department) => {
        const url = `/api/department/departments/${department.id}`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '',
            },
            body: JSON.stringify({ 
                _method: 'PATCH',
                name: department.name,
                order: department.order
            }),
        };

        try {
            const response = await fetch(url, options);
            if (response.status === 204) {
                return { success: true };
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error response from server for department ID ${department.id}: ${errorText}`);
                return null;
            }

            const data = await response.json();
            if (data && data.success) {
                return data;
            } else {
                console.error(`Unexpected response for department ID ${department.id}`);
                return null;
            }
        } catch (error) {
            console.error(`Error updating department ID ${department.id}:`, error);
            return null;
        }
    };

    const handleSave = async () => {
        setNotificationMessage("Updating departments...");
        setIsNotificationVisible(true);
        setProgress(0); 

        try {
            const totalDepartments = departments.length;
            const updatePromises = departments.map(async (department, index) => {
                const result = await updateOrderInDatabase(department);
                if (result && result.success) {
                    setProgress(((index + 1) / totalDepartments) * 100); 
                }
                return result;
            });

            const results = await Promise.all(updatePromises);
    
            const successfulUpdates = results.filter(result => result && result.success);
    
            if (successfulUpdates.length === departments.length) {
                setNotificationMessage("Changes saved successfully");
            } else {
                setNotificationMessage("Some departments failed to update");
            }
        } catch (error) {
            setNotificationMessage("Error saving order");
        } finally {
            setTimeout(() => {
                setIsNotificationVisible(false);
                window.location.href = '/departments';
            }, 3000);
        }
    };

    const handleBack = () => {
        window.location.href = '/departments';
    };

    return (
        <Example>
    <div className="flex-row">
        <div className="">
            <main className="w-full mt-5 xl:pl-96  max-w-[1580px]">
                <div className="px-4 py-10 sm:px-0 lg:px-8 lg:py-6">
                <div className="flex items-center justify-between sm:mx-4 md:mr-8 lg:mr-10">
                    <h1 className="text-4xl font-bold text-gray-900 justify-start">Manage Ordering</h1>
                    <div className="flex space-x-4 mr-10">
                        <button onClick={handleBack} className="font-bold text-black text-md">Back</button>
                        <button type="button" className="px-4 py-2 font-bold text-white bg-red-500 rounded-full text-md hover:bg-red-700 " onClick={handleSave}>Save</button>
                    </div>
                </div>
                </div>
                <div className="flex flex-col px-10 py-4 bg-white rounded-2xl shadow-custom max-w-[1050px] mb-10 ml-8 mr-8 sm:px-6 lg:px-8 lg:py-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64 max-w-[1050px]">
                            <div className="w-16 h-16 border-b-2 border-gray-900 max-w-[1050px] rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="departments">
                                    {(provided) => (
                                    <table className="w-full table-fixed bg-white divide-y divide-gray-200" {...provided.droppableProps} ref={provided.innerRef}>
                                        <thead>
                                        <tr className="bg-white">
                                            <th className="px-0 py-3 font-bold text-left text-gray-700 text-md w-3/5">Name</th>
                                            <th className="px-14 max-md:px-0 py-3 font-bold text-right text-gray-700 text-md w-1/5">Ordering</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {departments.map((item, index) => (
                                            <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                                            {(provided) => (
                                                <tr
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className="w-full bg-white border-t border-gray-200"
                                                >
                                                <td
                                                    className="bg-white flex items-center px-0 py-4 text-base font-bold text-black whitespace-normal overflow-hidden"
                                                    {...provided.dragHandleProps}
                                                >
                                                    <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-[80px] h-[40px] sm:w-[100px] sm:h-[50px] lg:w-[120px] lg:h-[60px] rounded-md object-cover mr-4"
                                                    />
                                                    <span className="whitespace-normal text-xs sm:text-sm md:text-base lg:text-lg">
                                                    {item.name}
                                                    </span>
                                                </td>
                                                <td className="flex-col w-full pl-24 max-md:pl-6 items-center justify-end max-md:justify-end px-4 py-4 space-x-0">
                                                    <button
                                                    className="px-2"
                                                    onClick={(e) => e.stopPropagation()}
                                                    disabled={index === 0}
                                                    style={{ opacity: index === 0 ? 0.6 : 1 }}
                                                    >
                                                    <img src="/assets/orderingup.svg" alt="Move Up" />
                                                    </button>
                                                    <button
                                                    className="px-2"
                                                    onClick={(e) => e.stopPropagation()}
                                                    disabled={index === departments.length - 1}
                                                    style={{ opacity: index === departments.length - 1 ? 0.6 : 1 }}
                                                    >
                                                    <img src="/assets/orderingdown.svg" alt="Move Down" />
                                                    </button>
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


                        </>
                    )}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="p-4 bg-white rounded-lg shadow-lg">
                <p className="text-lg font-semibold">{notificationMessage}</p>
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full">
                        <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }}>
                            {/* {progress.toFixed(0)}% */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
</Example>

    );
};

export default OrderingDepartments;


