import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import SettingNavigation from '@/Components/Settings/SettingsComponent';
import Example from '@/Layouts/DashboardLayoutNew';
import Pautan from '@/Components/Settings/LinkComponent';



const Settings = () => {


  return (
    <Example>
    <main className="">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <div>
            <PageTitle title="Pautan" />
            <hr className="file-directory-underline" />
            <Pautan />
            </div>
        </div>
    </main>
    </Example>
  );
};

export default Settings;
