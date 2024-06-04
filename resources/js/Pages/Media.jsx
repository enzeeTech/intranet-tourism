import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import { Image } from '@/Components/Reusable/Media';
import { Video } from '@/Components/Reusable/Media';
import Example from '../Layouts/DashboardLayoutNew';
import { Filter } from '@/Components/Reusable/Media';
import './css/StaffDirectory.css';
import '../Components/Reusable/css/FileManagementSearchBar.css'




const Media = () => {


  return (
    <Example>
    <main className="xl:pl-96">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <div>
                <Filter />
                <Image />
                    <div className='mt-16'></div>
                <Video />
            </div>
        </div>
    </main>
    <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div className="file-directory-header">
          <PageTitle title="Media" />
        </div>
        <hr className="file-directory-underline" />

        <div>
            <FeaturedEvents />
            <WhosOnline />
        </div>
    </aside>
    </Example>
  );
};

export default Media;
