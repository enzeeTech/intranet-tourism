import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import DepartmentSearchBar from '../Components/Reusable/Departments/DepartmentSearch';
import DepartmentsCard from '../Components/Reusable/Departments/DepartmentsCard';
import Example from '@/Layouts/DashboardLayoutNew';
//import '../../../public/assets/dummyImage2.png';
import './css/StaffDirectory.css';

const StaffDirectory = () => {
  const [departmentsList, setDepartmentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const fetchAllDepartments = async () => {
      setIsLoading(true); // Start loading
      let allDepartments = [];
      let url = 'http://127.0.0.1:8000/api/crud/departments';

      try {
        while (url) {
          const response = await axios.get(url);
          console.log('API Response:', response.data);

          if (response.data && Array.isArray(response.data.data.data)) {
            const newDepartments = response.data.data.data;
            allDepartments = [...allDepartments, ...newDepartments];
            url = response.data.data.next_page_url;
          } else {
            console.error('Unexpected data format:', response.data);
            break;
          }
        }

        // Sort departments alphabetically by name
        const sortedDepartments = allDepartments.sort((a, b) => a.name.localeCompare(b.name));
        setDepartmentsList(sortedDepartments);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setDepartmentsList([]);
      }
    };

    fetchAllDepartments();
    setIsLoading(false); // End loading
  }, []);

  return (
    <Example>
      <main className="xl:pl-96 w-full">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <DepartmentSearchBar />
          {/* <button className="w-36 mr-4">
          <img src={visitDepartment} alt="Visit Department" />
        </button> */}
          <div className="staff-member-grid-container">
            {departmentsList.length > 0 ? (
              departmentsList.map((department) => (
                <DepartmentsCard
                  key={department.id}
                  name={department.name}
                  // imageUrl={department.banner || '../../../public/assets/dummyStaffImage.png'} // Default image
                  imageUrl={'assets/departmentsDefault.jpg'} // Default image
                  // Add other props as needed
                />
              ))
            ) : (
              <div className="mt-20 ml-32 loading-spinner"></div>
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
