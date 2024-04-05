import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const Sidebar = () => {

    // Path to buttons
    const buttons = [
        { inactive: "assets/dashboard.png", active: "assets/dashboardActive.png" },
        { inactive: "assets/staffDirectory.png", active: "assets/staffDirectoryActive.png" },
        { name: "Calendar", to:'/calendar', inactive: "assets/calendar.png", active: "assets/calendarActive.png" },
        { inactive: "assets/departments.png", active: "assets/departmentsActive.png" },
        { inactive: "assets/groups.png", active: "assets/groupsActive.png" },
        { inactive: "assets/fileManagement.png", active: "assets/fileManagementActive.png" },
        { inactive: "assets/links.png", active: "assets/linksActive.png" },
        { inactive: "assets/settings.png", active: "assets/settingsActive.png" },
        { inactive: "assets/logout.png", active: "assets/logout.png" }
    ]

    // State to track the active button index
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <aside className="h-screen mt-1 text-white bg-white shadow-lg w-30">
            <nav className="flex flex-col p-4 space-y-2 ">
                {buttons.map((button, i) => (
                    <InertiaLink 
                        key={i} 
                        href={button.to} 
                        className={`z-10 w-full flex justify-center ${activeIndex === i ? 'active' : ''}`} 
                        onClick={() => setActiveIndex(i)}
                    >
                        <img src={activeIndex === i ? button.active : button.inactive} alt={button.name} className="w-12 h-12 mx-auto" />
                    </InertiaLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
