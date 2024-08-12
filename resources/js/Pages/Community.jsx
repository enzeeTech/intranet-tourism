import React, { useState, useEffect } from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import CommunityDropdown from '@/Components/Reusable/Community/CommunityDropdown';
import CommunitySearchBar from '../Components/Reusable/Community/CommunitySearch';
import CommunityCard from '../Components/Reusable/Community/CommunityCard';
import Example from '@/Layouts/DashboardLayoutNew';
import './css/StaffDirectory.css';
import CreateCommunity from '../Components/Reusable/Community/CreateCommunity';

const Community = () => {
  const [departmentsList, setDepartmentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false);

  const toggleCreateCommunity = () => setIsCreateCommunityOpen(!isCreateCommunityOpen);

  const fetchDepartments = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const departmentData = data.data.data.map((department) => ({
        id: department.id,
        name: department.name,
      }));

      setDepartmentsList((prevDepartments) => {
        const allDepartments = [...prevDepartments, ...departmentData];
        return allDepartments.sort((a, b) => a.name.localeCompare(b.name));
      });

      if (data.data.next_page_url) {
        fetchDepartments(data.data.next_page_url);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDepartments('/api/communities/communities');
  }, []);

  const handleNewDepartment = (newDepartment) => {
    setDepartmentsList((prevList) => [...prevList, newDepartment].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const filteredDepartments = departmentsList.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Example>
      <main className="w-full xl:pl-96 bg-gray-100 min-h-screen">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <CommunitySearchBar
            onSearch={(value) => setSearchTerm(value)}
            toggleCreateCommunity={toggleCreateCommunity}
          />
          <CommunityDropdown
            departments={filteredDepartments}
            onSelectDepartment={() => {}}
            onCreateDepartment={handleNewDepartment}
          />
          <div className="staff-member-grid-container max-w-[1230px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 sm:p-4 md:p-6 lg:p-8">
            {isLoading ? (
              <div className="mt-20 ml-32 loading-spinner"></div>
            ) : filteredDepartments.length === 0 ? (
              <p>No communities found.</p>
            ) : (
              filteredDepartments.map((department) => (
                <CommunityCard
                  key={department.id}
                  name={department.name}
                  imageUrl={'assets/departmentsDefault.jpg'}
                  departmentID={department.id}
                />
              ))
            )}
          </div>
        </div>
      </main>
      <aside className="fixed bottom-0 hidden px-4 py-6 overflow-y-auto border-r border-gray-200 left-20 top-16 w-96 sm:px-6 lg:px-8 xl:block">
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
      {isCreateCommunityOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
          <div className="bg-white p-4 rounded-2xl shadow-lg relative">
            {/* <button
              className="absolute top-2 right-2 mr-4 text-gray-600 hover:text-gray-900 hover:bg-slate-100 text-2xl rounded-full w-10 h-10 flex justify-center items-center"
              onClick={toggleCreateCommunity}
            >
              &times;
            </button> */}
            <div className="relative">
              <div className="flex justify-end">
                <button onClick={toggleCreateCommunity} className="mt-2 mr-2 absolute top-0 right-0">
                  <img src="/assets/cancel.svg" alt="Close icon" className="w-6 h-6" />
                </button>
              </div>
            </div>
            <CreateCommunity onCancel={toggleCreateCommunity} onCreate={handleNewDepartment} />
          </div>
        </div>
      )}
    </Example>
  );
};

export default Community;
