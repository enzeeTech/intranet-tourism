import React, { useState } from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import Example from '@/Layouts/DashboardLayoutNew';
import SettingNavigation from '@/Components/Settings/SettingsComponent';
import { SettingsPage } from '@/Components/Settings/SettingsPage';

const Settings = () => {
    const [currentPage, setCurrentPage] = useState('Basic Settings');

    return (
        <Example>
            <div className='flex justify-center'>
                <aside className="w-3/12 bottom-0 left-20 top-16 hidden overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:block xl:block md:block">
                    <div className="file-directory-header"></div>
                    <PageTitle title="Settings" />
                    <hr className="file-directory-underline" />
                    <SettingNavigation current={currentPage} setCurrent={setCurrentPage} />
                    <div></div>
                </aside>
                <div className="w-9/12">
                    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                        <div>
                            <SettingsPage currentPage={currentPage} />
                        </div>
                    </div>
                </div>

            </div>
        </Example>
    );
};
{/* <div class="flex justify-center p-4">
<div class="w-9/12 bg-white shadow-md rounded-lg p-4 m-2">
  <h2 class="text-xl font-semibold mb-2">Column 1</h2>
  <p>This is the content of column 1.</p>
</div>
<div class="w-3/12 bg-white shadow-md rounded-lg p-4 m-2">
  <h2 class="text-xl font-semibold mb-2">Column 2</h2>
  <p>This is the content of column 2.</p>
</div>
</div> */}
export default Settings;
