import React from 'react';

const SettingsPage = ({ currentPage }) => {
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

    return <div>{renderContent()}</div>;
};

export default SettingsPage;
