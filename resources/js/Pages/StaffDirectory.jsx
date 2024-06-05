import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import SearchMembers from '../Components/Reusable/StaffDirectorySearchBar';
import DepartmentDropdown from '../Components/Reusable/DropdownStaffDirectory';
import StaffMemberCard from '../Components/Reusable/StaffMemberCard';
import DeactivateModal from '../Components/Reusable/DeactivateModal';
import Header from '../Components/DashboardHeader';
import Sidebar from '../Components/SideNavBar';
import './css/StaffDirectory.css';

const StaffDirectory = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isStaffListActive, setStaffListActive] = useState(true);
  const [isOrgChartActive, setOrgChartActive] = useState(false);

  // Dummy departments
  const departments = [
    'Some Department 1',
    'Some Department 2',
    'Some Department 3',
    'Some Department 4',
    'Some Department 5',
    'Some Department 6',
    'Some Department 7',
    'Some Department 8',
  ];

  // Dummy staff members
  const staffMembers = [
    {
      id: 1,
      name: 'Iskander Mirza',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png', 
      phoneNo: '+601123201960'
    },
    {
      id: 2,
      name: 'Nor Rahimah Binti Ariffin',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 3,
      name: 'Eduzar Zar Bin Ayob Azari',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 4,
      name: 'Hishamuddin Mustafa',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 5,
      name: 'Iskander Mirza',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png', 
    },
    {
      id: 6,
      name: 'Nor Rahimah Binti Ariffin',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 7,
      name: 'Eduzar Zar Bin Ayob Azari',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 8,
      name: 'Hishamuddin Mustafa',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 9,
      name: 'Iskander Mirza',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png', 
    },
    {
      id: 10,
      name: 'Nor Rahimah Binti Ariffin',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 11,
      name: 'Eduzar Zar Bin Ayob Azari',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 12,
      name: 'Hishamuddin Mustafa',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 13,
      name: 'Iskander Mirza',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png', 
    },
    {
      id: 14,
      name: 'Nor Rahimah Binti Ariffin',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 15,
      name: 'Eduzar Zar Bin Ayob Azari',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
    },
    {
      id: 16,
      name: 'Hishamuddin Mustafa',
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

  const handleStaffListButton = () => {
    setStaffListActive(true);
    setOrgChartActive(false);
  }

  const handleOrgChartButton = () => {
    setStaffListActive(false);
    setOrgChartActive(true);
  }

  return (
    <div className="flex-row">
      <Header />
      <div className="flex " style={{backgroundColor: '#F3F4F6'}}>
        <Sidebar />
        <main style={{width: '100%'}}>
          <div className="staff-directory" style={{marginLeft: '30px'}}>
            <div className={isDeactivateModalOpen ? 'content-blur' : ''}>
              <div className="staff-directory-header">
                <PageTitle title="Staff Directory" />
              </div>
              <hr className="staff-directory-underline" />
              <div className="widgets-container">
                <div className="left-widget">
                  <FeaturedEvents />
                  <WhosOnline />
                </div>
                <div className="right-widget">
                  <SearchMembers {...{ handleStaffListButton, handleOrgChartButton, isStaffListActive, isOrgChartActive }} />
                  <DepartmentDropdown
                    departments={departments}
                    onSelectDepartment={handleSelectDepartment}
                  />
                  {selectedDepartment === 'Some Department 1' && (
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
        </main>
      </div>
    </div>
    
  );
};
  
export default StaffDirectory;
