import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import SearchBar from '../Components/Reusable/DepartmentSearch';
import DepartmentsCard from '../Components/Reusable/Departments/DepartmentsCard';
import Example from '@/Layouts/DashboardLayoutNew';
import './css/StaffDirectory.css';

const StaffDirectory = () => {
  const [departmentsList, setDepartmentsList] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const url = 'http://127.0.0.1:8000/api/crud/departments';

      try {
        const response = await axios.get(url);
        console.log('API Response:', response.data);

        // Check if response.data.data is an array
        if (response.data && Array.isArray(response.data.data.data)) {
          setDepartmentsList(response.data.data.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setDepartmentsList([]);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
        setDepartmentsList([]);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <Example>
      <main className="xl:pl-96 w-full">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <SearchBar />
          <div className="staff-member-grid-container">
            {departmentsList.length > 0 ? (
              departmentsList.map((department) => (
                <DepartmentsCard
                  key={department.id}
                  name={department.name}
                  imageUrl={department.banner || '../../../public/assets/dummyStaffImage.png'} // Default image
                  // Add other props as needed
                />
              ))
            ) : (
              <p>No departments available.</p>
            )}
          </div>
        </div>
      </main>
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
          <PageTitle title="Community" />
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
