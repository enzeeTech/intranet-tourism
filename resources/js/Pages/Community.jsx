import React, { useState, useEffect } from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import CommunityDropdown from '../Components/Reusable/Community/CommunityDropdown';
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
  const [filter, setFilter] = useState('All'); // Default filter to show all

  const toggleCreateCommunity = () => setIsCreateCommunityOpen(!isCreateCommunityOpen);

  const fetchDepartments = async () => {
    try {
      setIsLoading(true);

      const url = '/api/communities/communities';
      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const departmentData = data.data.data.map((community) => ({
        id: community.id,
        name: community.name,
        type: community.type,
        imageUrl: community.banner || 'assets/departmentsDefault.jpg', // Use banner if available
      }));

      setDepartmentsList(departmentData.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleNewDepartment = (newDepartment) => {
    setDepartmentsList((prevList) => [...prevList, newDepartment].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredDepartments = departmentsList
    .filter((community) => {
      if (filter === 'All') return true;
      if (filter === 'Public') return community.type === 'public';
      if (filter === 'Private') return community.type === 'private';
      return false;
    })
    .filter((community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Example>
      <main className="w-full xl:pl-96 bg-gray-100 min-h-screen">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <CommunitySearchBar
            onSearch={(value) => setSearchTerm(value)}
            toggleCreateCommunity={toggleCreateCommunity}
          />
          <CommunityDropdown onSelectFilter={handleFilterChange} />
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
                  imageUrl={department.imageUrl}
                  departmentID={department.id}
                  type={department.type}
                  // Conditionally render the lock icon based on type
                  lockIcon={department.type === 'private'}
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-2xl shadow-lg relative">
            <div className="relative">
              <button
                onClick={toggleCreateCommunity}
                className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 8.586L3.293 1.879a1 1 0 1 0-1.414 1.414L8.586 10l-6.707 6.707a1 1 0 0 0 1.414 1.414L10 11.414l6.707 6.707a1 1 0 0 0 1.414-1.414L11.414 10l6.707-6.707a1 1 0 0 0-1.414-1.414L10 8.586z" />
                </svg>
              </button>
            </div>
            <CreateCommunity onCreate={handleNewDepartment} />
          </div>
        </div>
      )}
    </Example>
  );
};

export default Community;
