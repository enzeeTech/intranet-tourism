import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import SearchMembers from '../Components/Reusable/CommunitySearch';
import DepartmentDropdown from '../Components/Reusable/CommunityDropdown';
import StaffMemberCard from '../Components/Reusable/CommunityCard';
import DeactivateModal from '../Components/Reusable/DeactivateModal';
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
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png', 
    },
    {
      id: 2,
      name: 'Kelab Rekreasi LPPM',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 3,
      name: 'KOPPEMA',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 4,
      name: 'Kesatuan',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 5,
      name: 'Jomla V3 Feedback',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png', 
    },
    {
      id: 6,
      name: 'BTM Feedback',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 7,
      name: 'Urus Tadbir Admin',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 8,
      name: 'TBC',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 9,
      name: 'Puspanita LPPM',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png', 
    },
    {
      id: 10,
      name: 'Kelab Rekreasi LPPM',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 11,
      name: 'KOPPEMA',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 12,
      name: 'KOPPEMA',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 13,
      name: 'KOPPEMA',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png', 
    },
    {
      id: 14,
      name: 'KOPPEMA',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 15,
      name: 'KOPPEMA',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 16,
      name: 'KOPPEMA',
      role: 'Pengarah Kanan',
      status: 'Online',
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
          <PageTitle title="Community" />
        </div>
        <hr className="staff-directory-underline" />
        <div className="widgets-container">
          <div className="left-widget">
            <FeaturedEvents />
            <WhosOnline />
          </div>
          <div className="right-widget">
            <SearchMembers />
            <DepartmentDropdown
              departments={departments}
              onSelectDepartment={handleSelectDepartment}
            />
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
