import React, { useState, useEffect } from 'react';

const Sidebar = () => {
    // Path to buttons
    const buttons = [
        { inactive: "assets/dashboard.png", active: "assets/dashboardActive.png", text: "Dashboard" },
        { inactive: "assets/staffDirectory.png", to: '/staffDirectory', active: "assets/staffDirectoryActive.png", text: "Staff Directory" },
        { name: "Calendar", to:'/calendar', inactive: "assets/calendar.png", active: "assets/calendarActive.png", text: "Calendar" },
        { inactive: "assets/departments.png", to: '/departments', active: "assets/departmentsActive.png", text: "Departments" },
        { inactive: "assets/groups.png", to: '/community', active: "assets/groupsActive.png", text: "Groups" },
        { inactive: "assets/fileManagement.png", to: '/fileManagement', active: "assets/fileManagementActive.png", text: "File Management" },
        { inactive: "assets/links.png", active: "assets/linksActive.png", text: "Links" },
        { inactive: "assets/settings.png", active: "assets/settingsActive.png", text: "Settings" },
        { inactive: "assets/logout.png", to: '/logout', active: "assets/logout.png", text: "Logout" }
    ];

    const [activeIndex, setActiveIndex] = useState(null);
    const [activeText, setActiveText] = useState(null);
    const [showText, setShowText] = useState(null);
    const [showTextPosition, setShowTextPosition] = useState({ top: 0, left: 0 });
    const [csrfToken, setCsrfToken] = useState(null);

    // Fetch the CSRF token once
    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        setCsrfToken(token);
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            }
        })
            .then(() => {
                window.location.href = '/';
            })
            .catch(err => console.error(err));
    };

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
                        href={button.to || '#'} // Use '#' as fallback to avoid warnings
                        key={i}
                        className={`z-10 w-full flex justify-center ${activeIndex === i ? 'active' : ''}`}
                        onClick={() => {
                            setActiveIndex(i);
                            setActiveText(button.text);
                            if (button.to === '/logout') {
                                handleLogout();
                            }
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
