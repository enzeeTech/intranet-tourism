import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Example from '../Layouts/DashboardLayoutNew';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';

const Ordering = () => {
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const department = "Some Department 1"; // Replace with the actual department logic
    const [data, setData] = useState([
        { id: 1, name: 'Iskander Mirza', image: '/assets/dummyStaffImage.png' },
        { id: 2, name: 'Nor Rahimah Binti Ariffin', image: '/assets/dummyImage2.png' },
        { id: 3, name: 'Edzuar Zar Bin Ayob Azari', image: '/assets/dummyImage3.png' },
        { id: 4, name: 'Edzuar Zar Bin Ayob Azari', image: '/assets/dummyImage4.png' },
        { id: 5, name: 'Hishamuddin Mustafa', image: '/assets/dummyImage5.png' },
        { id: 6, name: 'Hishamuddin Mustafa', image: '/assets/dummyImage6.png'  },
        { id: 7, name: 'Hishamuddin Mustafa', image: '/assets/dummyImage7.png' },
        { id: 8, name: 'Edzuar Zar Bin Ayob Azari', image: '/assets/dummyImage8.png' },
    ]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedData = Array.from(data);
        const [reorderedItem] = reorderedData.splice(result.source.index, 1);
        reorderedData.splice(result.destination.index, 0, reorderedItem);

        setData(reorderedData);
    };

    const handleSave = () => {
        console.log("Updated data:", data);
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 1500);
    };

    return (
        <Example>
            <div className="flex-row ">
                <div className="flex">
                    <main className="w-full mt-5 xl:pl-96 max-w-[1500px]">
                        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-bold text-gray-900 ">Manage Ordering</h1>
                                <div className="flex space-x-4">
                                    <a href="/staffDirectory" className="text-lg font-semibold text-black">Back</a>
                                    <button className="px-6 py-1 text-base font-bold text-white bg-[#FF5436] rounded-full" onClick={handleSave}>Save</button>
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
                                                {data.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                                                        {(provided) => (
                                                            <tr
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className="bg-white border-t border-gray-200"
                                                            >
                                                                <td className="px-6 py-4 text-base font-bold text-black pr-60 whitespace-nowrap" {...provided.dragHandleProps}>
                                                                    <img src={item.image} alt={item.name} className="inline-block object-cover w-10 mr-6 rounded-full h-11 " />
                                                                    {item.name}
                                                                </td>
                                                                <td className="px-1 py-4 text-sm font-semibold text-black whitespace-nowrap">
                                                                    <div className="flex items-center">
                                                                        <button
                                                                            className="px-2"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                if (index === 0) return;
                                                                                const newData = [...data];
                                                                                [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
                                                                                setData(newData);
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
                                                                                if (index === data.length - 1) return;
                                                                                const newData = [...data];
                                                                                [newData[index + 1], newData[index]] = [newData[index], newData[index + 1]];
                                                                                setData(newData);
                                                                            }}
                                                                            disabled={index === data.length - 1}
                                                                            style={{ opacity: index === data.length - 1 ? 0.6 : 1 }}
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
                <div className="fixed z-50 flex items-center justify-center w-full top-20">
                    <div className="p-4 mb-4 bg-white rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">Data saved successfully!</p>
                    </div>
                </div>
            )}
        </Example>
    );
};

export default Ordering;
