import React, { useState, useEffect } from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import DepartmentDropdown from '@/Components/Reusable/Departments/DepartmentsDropdown';
import DepartmentSearchBar from '../Components/Reusable/Departments/DepartmentSearch';
import DepartmentsCard from '../Components/Reusable/Departments/DepartmentsCard';
import Example from '@/Layouts/DashboardLayoutNew';
import './css/StaffDirectory.css';

const StaffDirectory = () => {
  const [departmentsList, setDepartmentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllDepartments = async () => {
      setIsLoading(true); // Start loading
      let allDepartments = [];
      let url = '/api/crud/departments';

      try {
        while (url) {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch departments');
          }
          const responseData = await response.json();
          console.log('API Response:', responseData);

          if (responseData.data && Array.isArray(responseData.data.data)) {
            const newDepartments = responseData.data.data;
            allDepartments = [...allDepartments, ...newDepartments];
            url = responseData.data.next_page_url;
          } else {
            console.error('Unexpected data format:', responseData);
            break;
          }
        }

        // Sort departments alphabetically by name
        const sortedDepartments = allDepartments.sort((a, b) => a.name.localeCompare(b.name));
        setDepartmentsList(sortedDepartments);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setDepartmentsList([]);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchAllDepartments();
  }, []);

  const handleNewDepartment = (newDepartment) => {
    setDepartmentsList((prevList) => [...prevList, newDepartment].sort((a, b) => a.name.localeCompare(b.name)));
  };

  // Filter departments based on search term
  const filteredDepartments = departmentsList.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Example>
      <main className="w-full xl:pl-96">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <DepartmentSearchBar onSearch={(value) => setSearchTerm(value)} />
          <DepartmentDropdown
            departments={filteredDepartments}
            onSelectDepartment={() => {}}
            onCreateDepartment={handleNewDepartment}
          />
          <div className="staff-member-grid-container max-w-[1230px]">
            {isLoading ? (
              <div className="mt-20 ml-32 loading-spinner"></div>
            ) : filteredDepartments.length === 0 ? (
              <p>No departments found.</p>
            ) : (
              filteredDepartments.map((department) => (
                <DepartmentsCard
                  key={department.id}
                  name={department.name}
                  imageUrl={'assets/departmentsDefault.jpg'} // Default image
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
          <PageTitle title="Departments" />
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
