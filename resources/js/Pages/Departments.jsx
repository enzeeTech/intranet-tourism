import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitleNew';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import Birthdaypopup from '../Components/Reusable/Birthdayfunction/birthdayalert';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import SearchMembers from '../Components/Reusable/CommunitySearch';
import DepartmentDropdown from '../Components/Reusable/CommunityDropdown';
import StaffMemberCard from '../Components/Reusable/CommunityCard';
import DeactivateModal from '../Components/Reusable/DeactivateModal';
import { ShareYourThoughtsDepart } from '@/Components/Reusable/WallPosting';


import './css/StaffDirectory.css';


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
    <div className="staff-directory">
      <div className={isDeactivateModalOpen ? 'content-blur' : ''}>
        <div className="staff-directory-header">
          <PageTitle title="Department" />
        </div>
        <hr className="staff-directory-underline" />
        <div className="widgets-container">
          <div className="left-widget">
            <FeaturedEvents />
            <Birthdaypopup/>
            <WhosOnline />

          </div>
          <div className="right-widget">
            <SearchMembers />
            <DepartmentDropdown
              departments={departments}
              onSelectDepartment={handleSelectDepartment}
            />
            <ShareYourThoughtsDepart/>

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
        </div>
      </div>
      <DeactivateModal 
        isOpen={isDeactivateModalOpen}
        onClose={closeDeactivateModal}
        onConfirm={() => console.log('Deactivated')}
      />
    </div>
  );
};
  
export default StaffDirectory;
