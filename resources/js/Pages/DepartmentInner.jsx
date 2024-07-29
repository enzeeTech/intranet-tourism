// import React, { useState, useEffect } from 'react';
// import { usePage } from '@inertiajs/react';
// import PageTitle from '../Components/Reusable/PageTitle';
// import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
// import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
// import Adminwall from '../Components/Adminwall';
// import EditDepartments from '../Components/Reusable/Departments/EditDepartments'; // Import EditDepartments component
// import './css/StaffDirectory.css';
// import Example from '@/Layouts/DashboardLayoutNew';

// const DepartmentInner = () => {
//   const { id } = usePage().props;
//   const [departmentData, setDepartmentData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

//   const getDepartmentIdFromQuery = () => {
//     const params = new URLSearchParams(location.search);
//     return params.get('departmentId');
//   };

//   const fetchDepartmentData = async (departmentId) => {
//     try {
//       const response = await fetch(`/api/department/departments/${departmentId}`);
//       const result = await response.json();
//       if (result.data) {
//         setDepartmentData(result.data);
//       }
//     } catch (error) {
//       console.error('Error fetching department data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEditClick = () => {
//     setIsEditPopupOpen(true);
//   };

//   const handleSave = (updatedData) => {
//     setDepartmentData(updatedData);
//     setIsEditPopupOpen(false);
//     fetchDepartmentData(getDepartmentIdFromQuery()); // Reload the department data
//   };

//   useEffect(() => {
//     const departmentId = getDepartmentIdFromQuery();
//     if (departmentId) {
//       fetchDepartmentData(departmentId);
//     }
//   }, []);

//   return (
//     <Example>
//       <main className="xl:pl-96 w-[900px] m-ml-16 mr-24 relative bottom-10">
//         <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 max-w-full lg:max-w-[900px] mx-auto">
//           <Adminwall
//             departmentID={getDepartmentIdFromQuery()}
//             departmentHeader={departmentData?.name}
//             departmentDescription={departmentData?.description}
//             userId={id}
//             onEditClick={handleEditClick} // Add edit button click handler
//           />
//         </div>
//       </main>

//       <aside className="fixed bottom-0 hidden px-4 py-6 overflow-y-auto border-r border-gray-200 left-20 top-16 w-96 sm:px-6 lg:px-8 xl:block">
//         <style>
//           {`
//           aside::-webkit-scrollbar {
//             width: 0px;
//             background: transparent;
//           }
//           `}
//         </style>
//         <div className="file-directory-header">
//           <PageTitle title="Department" />
//         </div>
//         <hr className="file-directory-underline" />

//         <div>
//           <FeaturedEvents />
//           <WhosOnline />
//         </div>
//       </aside>

//       {isEditPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <EditDepartments
//             department={departmentData}
//             onCancel={() => setIsEditPopupOpen(false)}
//             onSave={handleSave}
//           />
//         </div>
//       )}
//     </Example>
//   );
// };

// export default DepartmentInner;
import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import Adminwall from '../Components/Adminwall';
import EditDepartments from '../Components/Reusable/Departments/EditDepartments'; // Import EditDepartments component
import './css/StaffDirectory.css';
import Example from '@/Layouts/DashboardLayoutNew';

const DepartmentInner = () => {
  const { id } = usePage().props; // Retrieve the user_id from the Inertia view
  const [departmentData, setDepartmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const getDepartmentIdFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('departmentId');
  };

  const fetchDepartmentData = async (departmentId) => {
    try {
      const response = await fetch(`/api/department/departments/${departmentId}`);
      const result = await response.json();
      if (result.data) {
        setDepartmentData(result.data);
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
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
    const departmentId = getDepartmentIdFromQuery();
    if (departmentId) {
      fetchDepartmentData(departmentId);
    }
  }, []);

  return (
    <Example>
      <main className="xl:pl-96 xl:pr-24 sm:pr-44 sm:right-8 2xl:pl-80 w-full ml-4 mr-4 lg:ml-10 lg:mr-24 relative bottom-10"> 
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 max-w-full lg:max-w-[900px] mx-auto">
          <Adminwall
            departmentID={getDepartmentIdFromQuery()}
            departmentHeader={departmentData?.name}
            departmentDescription={departmentData?.description}
            userId={id}
            onEditClick={handleEditClick} // Add edit button click handler
          />
        </div>
      </main>

      <aside className="fixed bottom-0 hidden px-4 py-6 overflow-y-auto border-r border-gray-200 left-0 lg:left-20 top-16 w-full lg:w-96 sm:px-6 lg:px-8 xl:block">
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

      {isEditPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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

export default DepartmentInner;
