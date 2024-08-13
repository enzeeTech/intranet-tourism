import React, { useState, useEffect } from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import DepartmentDropdown from '@/Components/Reusable/Departments/DepartmentsDropdown';
import DepartmentSearchBar from '../Components/Reusable/Departments/DepartmentSearch';
import DepartmentsCard from '../Components/Reusable/Departments/DepartmentsCard';
import Example from '@/Layouts/DashboardLayoutNew';
import './css/StaffDirectory.css';
import CreateDepartments from '../Components/Reusable/Departments/CreateDepartments';
import Birthdaypopup from '@/Components/Reusable/Birthdayfunction/birthdayalert';
import { usePage } from '@inertiajs/react';
import { useCsrf } from '@/composables';

const Departments = () => {
  const { props } = usePage();
  const { id } = props; 
  const [departmentsList, setDepartmentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);
  const [isCreateDepartmentOpen, setIsCreateDepartmentOpen] = useState(false);
  const csrfToken = useCsrf();

  const toggleCreateCommunity = () => setIsCreateDepartmentOpen(!isCreateDepartmentOpen);

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
        imageUrl: department.banner ? `/storage/${department.banner}` : 'assets/departmentsDefault.jpg',// Assuming the API returns an image URL here
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
    fetchDepartments('/api/crud/departments');
  }, []);

  const handleDelete = async () => {
    try {
      await fetch(`/api/department/departments/${currentDepartmentId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      setDepartmentsList((prevList) =>
        prevList.filter((department) => department.id !== currentDepartmentId)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setCurrentDepartmentId(id);
    setIsDeleteModalOpen(true);
  };

  const handleNewDepartment = (newDepartment) => {
    setDepartmentsList((prevList) => [...prevList, newDepartment].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const filteredDepartments = departmentsList.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Example>
      <main className="w-full min-h-screen bg-gray-100 xl:pl-96">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <DepartmentSearchBar
            onSearch={(value) => setSearchTerm(value)}
            toggleCreateCommunity={toggleCreateCommunity}
          />
          <DepartmentDropdown
            departments={filteredDepartments}
            onSelectDepartment={() => {}}
            onCreateDepartment={handleNewDepartment}
          />
          <div className="staff-member-grid-container max-w-[1230px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 sm:p-4 md:p-6 lg:p-8">
            {isLoading ? (
              <div className="mt-20 ml-32 loading-spinner"></div>
            ) : filteredDepartments.length === 0 ? (
              <p>No departments found.</p>
            ) : (
              filteredDepartments.map((department) => (
                <DepartmentsCard
                  key={department.id}
                  name={department.name}
                  imageUrl={department.imageUrl || 'assets/departmentsDefault.jpg'}
                  departmentID={department.id}
                  onDeleteClick={handleDeleteClick}
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
          <Birthdaypopup />
        </div>
      </aside>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-8 bg-white shadow-lg rounded-2xl w-96">
            <h2 className="mb-4 text-xl font-bold text-center">Delete Department?</h2>
            <div className="flex justify-center space-x-4">
              <button className="px-8 py-1 text-base text-gray-400 bg-white border border-gray-400 rounded-full hover:bg-gray-400 hover:text-white" onClick={handleDelete}>
                Yes
              </button>
              <button className="px-8 py-1 text-white bg-red-500 rounded-full hover:bg-red-700" onClick={() => setIsDeleteModalOpen(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {isCreateDepartmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-4 bg-white shadow-lg rounded-2xl">
            {/* <button
              className="absolute flex items-center justify-center w-10 h-10 mr-4 text-2xl text-gray-600 rounded-full top-2 right-2 hover:text-gray-900 hover:bg-slate-100"
              onClick={toggleCreateCommunity}
            >
              &times;
            </button> */}
            <div className="relative">
              <div className="flex justify-end">
                <button onClick={toggleCreateCommunity} className="absolute top-0 right-0 mt-2 mr-2">
                  <img src="/assets/cancel.svg" alt="Close icon" className="w-6 h-6" />
                </button>
              </div>
            </div>
            <CreateDepartments onCancel={toggleCreateCommunity} onCreate={handleNewDepartment} userID={id} />
          </div>
        </div>
      )}
    </Example>
  );
};

export default Departments;
