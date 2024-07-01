import React, { useState, useEffect } from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import Example from '@/Layouts/DashboardLayoutNew';
import SettingNavigation from '@/Components/Settings/SettingsComponent';
import { SettingsPage } from '@/Components/Settings/SettingsPage';

const Settings = () => {
    const [currentPage, setCurrentPage] = useState('Basic Settings');

    useEffect(() => {
        const savedPage = localStorage.getItem('currentSettingsPage');
        if (savedPage) {
            setCurrentPage(savedPage);
        }
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        localStorage.setItem('currentSettingsPage', page);
    };

    return (
        <Example>
            <main className="xl:pl-96 lg:pl-96">
                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                    <div>
                        <SettingsPage currentPage={currentPage} />
                    </div>
                </div>
            </main>
            <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:block xl:block">
                <div className="file-directory-header"></div>
                <PageTitle title="Settings" />
                <hr className="file-directory-underline" />
                <SettingNavigation current={currentPage} setCurrent={handlePageChange} />
                <div></div>
            </aside>
        </Example>
    );
};

export default Settings;
