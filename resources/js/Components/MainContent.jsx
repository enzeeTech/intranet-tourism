import React from 'react';
import MyComponent from '../Pages/Departments';
import StaffDirectory from '../Pages/StaffDirectory';
import Calendar from '../Pages/Calendar';
//import GroupsContent from './GroupsContent';
import File from '../Pages/fileManagement';
//import LinksContent from './LinksContent';
//import SettingsContent from './SettingsContent';
//import LogoutContent from './LogoutContent';

const MainContent = ({ content }) => {
    const renderContent = () => {
        switch (content) {
            case 'DashboardContent':
                return <DashboardContent />;
            case 'StaffDirectoryContent':
                return <StaffDirectory />;
            case 'CalendarContent':
                return <Calendar />;
            case 'DepartmentsContent':
                return <MyComponent />;
            case 'GroupsContent':
                return <GroupsContent />;
            case 'FileManagementContent':
                return <File />;
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
