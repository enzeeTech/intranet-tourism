import React, { useState } from 'react';
import Layout from '../Layouts/DashboardLayout';
import Sidebar from '../Components/SideNavBar';
import MainContent from '../Components/MainContent';

const Dashboard = () => {
    const [content, setContent] = useState(null);

    return (
        <Layout>
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <aside className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
                    <Sidebar setContent={setContent} />
                </aside>
                <MainContent content={content} />
            </div>
        </Layout>
    );
};

export default Dashboard;
