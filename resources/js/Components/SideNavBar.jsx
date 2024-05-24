import React, { useState, useEffect } from 'react';

const Sidebar = ({ setContent }) => {
    const buttons = [
        { inactive: "assets/dashboard.png", content: 'DashboardContent', active: "assets/dashboardActive.png", text: "Dashboard" },
        { inactive: "assets/staffDirectory.png", content: 'StaffDirectoryContent', active: "assets/staffDirectoryActive.png", text: "Staff Directory" },
        { inactive: "assets/calendar.png", content: 'CalendarContent', active: "assets/calendarActive.png", text: "Calendar" },
        { inactive: "assets/departments.png", content: 'DepartmentsContent', active: "assets/departmentsActive.png", text: "Departments" },
        { inactive: "assets/groups.png", content: 'GroupsContent', active: "assets/groupsActive.png", text: "Groups" },
        { inactive: "assets/fileManagement.png", content: 'FileManagementContent', active: "assets/fileManagementActive.png", text: "File Management" },
        { inactive: "assets/links.png", content: 'LinksContent', active: "assets/linksActive.png", text: "Links" },
        { inactive: "assets/settings.png", content: 'SettingsContent', active: "assets/settingsActive.png", text: "Settings" },
        { inactive: "assets/logout.png", content: 'LogoutContent', active: "assets/logout.png", text: "Logout" }
    ];

    const [activeIndex, setActiveIndex] = useState(null);
    const [showText, setShowText] = useState(null);
    const [showTextPosition, setShowTextPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = (text, event) => {
        const rect = event.target.getBoundingClientRect();
        setShowText(text);
        setShowTextPosition({ top: rect.top + window.scrollY, left: rect.left + rect.width + window.scrollX });
    };

    const handleMouseLeave = () => {
        setShowText(null);
    };

    return (
        <aside className="h-screen mt-1 text-white bg-white shadow-lg w-30 sticky top-0 relative">
            <nav className="flex flex-col p-4 space-y-2">
                {buttons.map((button, i) => (
                    <a
                        href="#"
                        key={i}
                        className={`z-10 w-full flex justify-center ${activeIndex === i ? 'active' : ''}`}
                        onClick={() => {
                            setActiveIndex(i);
                            setContent(button.content);
                        }}
                        onMouseEnter={(event) => handleMouseEnter(button.text, event)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={activeIndex === i ? button.active : button.inactive}
                            alt={button.text || ""}
                            className="w-12 h-12 mx-auto"
                        />
                    </a>
                ))}
            </nav>
            {showText && (
                <div
                    className="absolute bg-gray-700 text-white text-xs rounded py-1 px-2 z-20"
                    style={{ top: showTextPosition.top, left: showTextPosition.left }}
                >
                    {showText}
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
