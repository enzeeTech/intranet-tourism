import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import Birthdaypopup from '../Components/Reusable/Birthdayfunction/birthdayalert';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
// import SearchMembers from '../Components/Reusable/CommunitySearch';
import SearchMembers from '../Components/Reusable/DepartmentSearch'
import Adminsection from '../Components/Adminwall';
import DepartmentDropdown from '../Components/Reusable/CommunityDropdown';
import StaffMemberCard from '../Components/Reusable/CommunityCard';
import DeactivateModal from '../Components/Reusable/DeactivateModal';
// import { ShareYourThoughtsDepart } from '@/Components/Reusable/WallPosting';


import './css/StaffDirectory.css';
import Example from '@/Layouts/DashboardLayoutNew';


const StaffDirectory = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  // Dummy departments
  const departments = [
    'All',
    'Public',
    'Private',
  ];

  // Dummy staff members
  const staffMembers = [
    {
      id: 1,
      name: 'Puspanita LPPM',
      role: 'Followed By:',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 2,
      name: 'Kelab Rekreasi LPPM',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 3,
      name: 'KOPPEMA',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 4,
      name: 'Kesatuan',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 5,
      name: 'Jomla V3 Feedback',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 6,
      name: 'BTM Feedback',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 7,
      name: 'Urus Tadbir Admin',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 8,
      name: 'TBC',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 9,
      name: 'Puspanita LPPM',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 10,
      name: 'Kelab Rekreasi LPPM',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 11,
      name: 'KOPPEMA',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 12,
      name: 'KOPPEMA',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 13,
      name: 'KOPPEMA',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 14,
      name: 'KOPPEMA',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 15,
      name: 'KOPPEMA',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 16,
      name: 'KOPPEMA',
      role: 'Followed By',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },

  ];

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
  };

  const openDeactivateModal = () => {
    setIsDeactivateModalOpen(true);
  };

  const closeDeactivateModal = () => {
    setIsDeactivateModalOpen(false);
  };

  return (
    <Example>
        <main className="xl:pl-96 w-[900px] m-ml-16 mr-24 relative">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 max-w-full lg:max-w-[900px] mx-auto">
        <SearchMembers />
            <DepartmentDropdown
              departments={departments}
              onSelectDepartment={handleSelectDepartment}
            />
            <Adminsection />

            {/* <ShareYourThoughtsDepart/> */}

            {selectedDepartment === 'All' && (
              <div className="staff-member-grid-container">
                {staffMembers.map((member) => (
                    <StaffMemberCard
                      key={member.id} {...member}
                      onDeactivateClick={openDeactivateModal}
                    />
                  ))}
              </div>
            )}
            </div>
            </main>

            {/* <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
                <div className="file-directory-header">
                    <PageTitle title="My Profile" />
                </div>
                <hr className="file-directory-underline" />
                <div >
                    <FeaturedEvents />
                    <Birthdaypopup className='mb-4'/><br></br>
                    <WhosOnline className='mb-4'/>
                </div>
            </aside> */}
            <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
                <style>
                    {`
                    aside::-webkit-scrollbar {
                        width: 0px;
                        background: transparent;
                    }
                    `}
                </style>
                <div className="file-directory-header">
                <PageTitle title="Department" />
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

export default StaffDirectory;
