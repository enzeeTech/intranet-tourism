import React from 'react';

function ProfileNav({ activeTab, setActiveTab }) {
    const tabs = [
        { name: 'Activities', key: 'activities' },
        { name: 'Bio', key: 'bio' },
        { name: 'Gallery', key: 'gallery' },
        { name: 'Files', key: 'files' }
    ];

    return (
        <nav className="flex gap-5 justify-between mt-14 ml-28 mr-28 max-w-full text-sm font-semibold text-center whitespace-nowrap text-neutral-800 text-opacity-30 w-auto max-md:flex-wrap max-md:mt-10">
            {tabs.map(tab => (
                <span
                    key={tab.key}
                    className={`cursor-pointer ${activeTab === tab.key ? "font-bold text-blue-500" : "text-stone-300"}`}
                    onClick={() => setActiveTab(tab.key)}
                >
                    {tab.name}
                </span>
            ))}
        </nav>
    );
}

export default ProfileNav;
