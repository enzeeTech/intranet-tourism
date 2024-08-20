import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import CommunityWall from '../Components/CommunityWall';
import EditDepartments from '../Components/Reusable/Departments/EditDepartments';
import './css/StaffDirectory.css';
import Example from '@/Layouts/DashboardLayoutNew';

const CommunityInner = () => {
  const { id } = usePage().props;
  const [departmentData, setDepartmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const getDepartmentIdFromQuery = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('communityId');
  };

  const fetchDepartmentData = async (communityId) => {
    try {
      const response = await fetch(`/api/communities/communities/${communityId}`);
      const result = await response.json();
      if (result.data) {
        setDepartmentData(result.data);
      }
    } catch (error) {
      console.error('Error fetching community data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  };

  const handleSave = (updatedData) => {
    setDepartmentData(updatedData);
    setIsEditPopupOpen(false);
    fetchDepartmentData(getDepartmentIdFromQuery()); // Reload the department data
  };

  useEffect(() => {
    const communityId = getDepartmentIdFromQuery();
    if (communityId) {
      fetchDepartmentData(communityId);
    }
  }, []);

  console.log('DEPARTMENT DATA', departmentData);

  return (
    <Example>
      <main className="relative w-full ml-4 mr-4 xl:pl-96 xl:pr-24 sm:pr-44 sm:right-8 2xl:pl-80 lg:ml-10 lg:mr-24 bottom-10">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 max-w-full lg:max-w-[900px] mx-auto">
          <CommunityWall
            communityID={getDepartmentIdFromQuery()}
            communityHeader={departmentData?.name}
            communityDescription={departmentData?.description}
            communityBanner={departmentData?.banner ? departmentData.banner : 'assets/departmentsDefault.jpg'}
            userId={id}
            onEditClick={handleEditClick}
          />
        </div>
      </main>

      <aside className="fixed bottom-0 left-0 hidden w-full px-4 py-6 overflow-y-auto border-r border-gray-200 lg:left-20 top-16 lg:w-96 sm:px-6 lg:px-8 xl:block">
        <style>
          {`
          aside::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
          `}
        </style>
        <div className="file-directory-header">
          <PageTitle title="Community" />
        </div>
        <hr className="file-directory-underline" />
        <div>
          <FeaturedEvents />
          <WhosOnline />
        </div>
      </aside>

      {isEditPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <EditDepartments
            department={departmentData}
            onCancel={() => setIsEditPopupOpen(false)}
            onSave={handleSave}
          />
        </div>
      )}
    </Example>
  );
};

export default CommunityInner;
