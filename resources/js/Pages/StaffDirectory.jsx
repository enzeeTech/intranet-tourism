import React, {useState, useEffect} from 'react';
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
import Example from '@/Layouts/DashboardLayoutNew';

const StaffDirectory = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isStaffListActive, setStaffListActive] = useState(true);
  const [isOrgChartActive, setOrgChartActive] = useState(false);
  const [activePopupId, setActivePopupId] = useState(null);
  const [activePopupRef, setActivePopupRef] = useState(null);

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
      phoneNo: '+601123201960',
      isDeactivated: 'false'
    },
    {
      id: 2,
      name: 'Nor Rahimah Binti Ariffin',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 3,
      name: 'Eduzar Zar Bin Ayob Azari',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 4,
      name: 'Hishamuddin Mustafa',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 5,
      name: 'Iskander Mirza',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 6,
      name: 'Nor Rahimah Binti Ariffin',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 7,
      name: 'Eduzar Zar Bin Ayob Azari',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 8,
      name: 'Hishamuddin Mustafa',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 9,
      name: 'Iskander Mirza',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 10,
      name: 'Nor Rahimah Binti Ariffin',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 11,
      name: 'Eduzar Zar Bin Ayob Azari',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 12,
      name: 'Hishamuddin Mustafa',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 13,
      name: 'Iskander Mirza',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 14,
      name: 'Nor Rahimah Binti Ariffin',
      role: 'Setiausaha Pejabat',
      status: 'Offline',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 15,
      name: 'Eduzar Zar Bin Ayob Azari',
      role: 'Timbalan Pengarah Kanan',
      status: 'Away',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },
    {
      id: 16,
      name: 'Hishamuddin Mustafa',
      role: 'Pengarah Kanan',
      status: 'Online',
      imageUrl: '../../../public/assets/dummyStaffImage.png',
      phoneNo: '',
      isDeactivated: 'false'
    },

  ];

  const handleOutsideClick = (event) => {
    if (activePopupRef && !activePopupRef.contains(event.target)) {
      setActivePopupId(null);
      setActivePopupRef(null);
    }
  };

  useEffect(() => {
    if (activePopupRef) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [activePopupRef]);

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
    <Example>
    <div className="flex-row">
      {/* <Header /> */}
      <div className="flex ">
        {/* <Sidebar /> */}

        <main className="xl:pl-96 w-full">
                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
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
                            onDeactivateClick={() => setIsDeactivateModalOpen(true)}
                            isPopupOpen={activePopupId === member.id}
                            setActivePopup={() => {
                              setActivePopupId(member.id);
                              setActivePopupRef(document.getElementById(`staff-popup-${member.id}`));
                            }}
                            closePopup={() => {
                              setActivePopupId(null);
                              setActivePopupRef(null);
                            }}
                          />
                        ))}
                    </div>
                  )}
                </div>
                </main>

                <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div className="file-directory-header">
          <PageTitle title="Staff Directory" />
        </div>
        <hr className="file-directory-underline" />
        <div>
          <FeaturedEvents />
          <WhosOnline />
        </div>
      </aside>

        {/* <main style={{width: '100%'}}>
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
    </div> */}
    </div>
    </div>
    </Example>
  );
};

export default StaffDirectory;
