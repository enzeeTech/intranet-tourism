import React from 'react';
import DashboardContent from './DashboardContent';
import StaffDirectoryContent from './StaffDirectoryContent';
import CalendarContent from './CalendarContent';
import DepartmentsContent from './DepartmentsContent';
import GroupsContent from './GroupsContent';
import FileManagementContent from './FileManagementContent';
import LinksContent from './LinksContent';
import SettingsContent from './SettingsContent';
import LogoutContent from './LogoutContent';

const MainContent = ({ content }) => {
    const renderContent = () => {
        switch (content) {
            case 'DashboardContent':
                return <DashboardContent />;
            case 'StaffDirectoryContent':
                return <StaffDirectoryContent />;
            case 'CalendarContent':
                return <CalendarContent />;
            case 'DepartmentsContent':
                return <DepartmentsContent />;
            case 'GroupsContent':
                return <GroupsContent />;
            case 'FileManagementContent':
                return <FileManagementContent />;
            case 'LinksContent':
                return <LinksContent />;
            case 'SettingsContent':
                return <SettingsContent />;
            case 'LogoutContent':
                return <LogoutContent />;
            default:
                return <div>Select an option from the sidebar.</div>;
        }
    };

    return (
        <main className="flex flex-col ml-5 w-[73%] max-md:ml-0 max-md:w-full">
            {renderContent()}
        </main>
    );
};

export default MainContent;
