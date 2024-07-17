import React, {useState, useEffect} from 'react';
import { usePage } from '@inertiajs/react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import Adminsection from '../Components/Adminwall';
import './css/StaffDirectory.css';
import Example from '@/Layouts/DashboardLayoutNew';


const DepartmentInner = () => {
    const { id } = usePage().props; // Retrieve the user_id from the Inertia view
    const [departmentData, setDepartmentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

  // Function to extract the departmentId from the URL query parameters
  const getDepartmentIdFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('departmentId');
  };

  const fetchDepartmentData = async (departmentId) => {
    try {
      const response = await fetch(`/api/department/departments/${departmentId}`);
      const result = await response.json();
      if (result.data) {
        console.log("DATA", result.data);
        setDepartmentData(result.data);
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const departmentId = getDepartmentIdFromQuery();
    if (departmentId) {
      fetchDepartmentData(departmentId);
    }
  }, []);

  // console.log('Department Data:', departmentData);

  return (
    <Example>
        <main className="xl:pl-96 w-[900px] m-ml-16 mr-24 relative">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 max-w-full lg:max-w-[900px] mx-auto">
            <Adminsection
                departmentID= {getDepartmentIdFromQuery()}
                departmentHeader={departmentData?.name || 'Department Name'}
                departmentDescription={departmentData?.description}
                userId={id}
            />
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
                <PageTitle title="Department" />
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

export default DepartmentInner;
