import React, { useState } from 'react';
import SettingNavigation from './SettingsComponent';

const SettingsPage = () => {
    const [currentPage, setCurrentPage] = useState('Account Settings');

    const renderContent = () => {
        switch (currentPage) {
            case 'Account Settings':
                return <div>Account Settings Content</div>;
            case 'Themes':
                return <div>Themes Content</div>;
            case 'Advance Settings':
                return <div>Advance Settings Content</div>;
            case 'Departments':
                return <div>Departments Content</div>;
            case 'Categories':
                return <div>Categories Content</div>;
            case 'Requests':
                return <div>Requests Content</div>;
            case 'Audit Trail':
                return <div>Audit Trail Content</div>;
            case 'Feedback':
                return <div>Feedback Content</div>;
            case 'Birthday Template':
                return <div>Birthday Template Content</div>;
            default:
                return <div>Select an option</div>;
        }
    };

    return (
        <div className="flex">
            <SettingNavigation current={currentPage} setCurrent={setCurrentPage} />
            <main className="flex-1 p-4">
                {renderContent()}
            </main>
        </div>
    );
};

export default SettingsPage;
