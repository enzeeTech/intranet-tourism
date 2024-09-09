import React, { useState, useEffect } from 'react';
import Example from '../Layouts/DashboardLayoutNew';
import PageTitle from '../Components/Reusable/PageTitle';
import { useCsrf } from '@/composables';

const API_URL = "/api/department/departments";
const urlTemplate = "/api/department/departments/{id}";

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [newDepartmentUrl, setNewDepartmentUrl] = useState('');
    const [urlError, setUrlError] = useState('');
    const csrfToken = useCsrf();

    const fetchDepartments = async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: { Accept: 'application/json', "X-CSRF-Token": csrfToken }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setDepartments(data.data.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, [csrfToken]);

    const PautanHandleAddApp = () => {
        if (!isValidUrl(newAppUrl)) {
          setUrlError('URL must start with http:// or https://');
          return;
        } else {
          setUrlError('');
          window.location.reload();
        }
    
        const { isNameDuplicate, isUrlDuplicate } = isDuplicateApp(newAppName, newAppUrl, apps);
        if (isNameDuplicate) {
          alert('App name already exists.');
          return;
        } else if (isUrlDuplicate) {
          alert('App URL already exists.');
          return;
        }
    
        const newApp = { label: newAppName, url: newAppUrl };
    
        fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', "X-CSRF-Token": csrfToken },
          body: JSON.stringify(newApp)
        })
          .then(response => response.json())
          .then(data => {
            setApps(sortAlphabetically(apps.map(app => (app.id === data.id ? data : app))));
            setIsAddModalVisible(false);
            resetForm();
          })
          .catch(error => console.error('Error adding app:', error));
      };
    
      const PautanHandleEditApp = (app) => {
        setCurrentApp(app);
        setNewAppName(app.label);
        setNewAppUrl(app.url);
        setUrlError('');
        setIsEditModalVisible(true);
      };

      

    const handleBackNavigation = () => {
        window.history.back();
    };

    return (
        <Example>
            <>
                <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[1500px] mx-8 my-10">
                    <div className="flex items-start justify-between mb-2 border-b border-gray-200">
                        <h2 className="mb-3 text-3xl font-bold text-gray-900">Manage Departments</h2>
                        <div className="flex space-x-4">
                            <button className="text-gray-900 font-bold" onClick={handleBackNavigation}>
                                Back
                            </button>
                            <button className="px-4 py-2 font-bold text-white whitespace-nowrap bg-blue-500 hover:bg-blue-700 rounded-full"
                                onClick={() => { resetForm(); setIsAddModalVisible(true); }}>
                                + Add
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 font-bold text-md text-start text-gray-500">Department Name</th>
                                <th className="px-6 py-3 font-bold text-md text-start text-gray-500">URL</th>
                                <th className="px-6 py-3 font-bold text-md text-center text-gray-500">Edit</th>
                                <th className="px-6 py-3 font-bold text-md text-center text-gray-500">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((dep) => (
                                <tr key={dep.id} className="bg-white border-t border-gray-200">
                                    <td className="px-6 py-4 text-sm font-semibold text-black whitespace-nowrap">
                                        {dep.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-black whitespace-nowrap">
                                        {dep.url}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-black whitespace-nowrap">
                                        <button onClick={() => handleEditDepartment(dep)}><img src="assets/EditIcon.svg" alt="Edit" className="fixed-size" /></button>
                                    </td>
                                    <td className="px-6 max-md:px-2 py-4 text-sm font-semibold text-black whitespace-nowrap delete-column">
                                        <button onClick={() => { setCurrentDepartment(dep); setIsDeleteModalVisible(true); }}> <img src="assets/redDeleteIcon.svg" alt="Delete" className="fixed-size" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Modals for adding, editing, and deleting departments */}
                {isAddModalVisible && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative px-8 py-6 bg-white rounded-2xl shadow-lg w-96">
                            <h2 className="mb-4 text-xl font-bold">Add New Department</h2>
                            <input
                                type="text"
                                placeholder="Department Name"
                                value={newDepartmentName}
                                onChange={(e) => setNewDepartmentName(e.target.value)}
                                className="w-full p-2 mb-4 border rounded-md outline-none"
                            />
                            <input
                                type="text"
                                placeholder="https://example.com"
                                value={newDepartmentUrl}
                                onChange={(e) => setNewDepartmentUrl(e.target.value)}
                                className="w-full p-2 mb-4 border rounded-md outline-none"
                            />
                            {urlError && <p className="text-red-500 mb-5">{urlError}</p>}
                            <div className="flex justify-end space-x-3">
                                <button className="px-6 py-2 font-bold text-gray-400 bg-white rounded-full border border-gray-400"
                                    onClick={() => setIsAddModalVisible(false)}>Cancel</button>
                                <button className="px-8 py-2 font-bold text-white bg-blue-500 rounded-full"
                                    onClick={handleAddDepartment}>Add</button>
                            </div>
                        </div>
                    </div>
                )}

                {isEditModalVisible && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative px-8 py-6 bg-white rounded-2xl shadow-lg w-96">
                            <h2 className="mb-4 text-xl font-bold">Edit Department</h2>
                            <input
                                type="text"
                                placeholder="Department Name"
                                value={newDepartmentName}
                                onChange={(e) => setNewDepartmentName(e.target.value)}
                                className="w-full p-2 mb-4 border rounded-md outline-none"
                            />
                            <input
                                type="text"
                                placeholder="https://example.com"
                                value={newDepartmentUrl}
                                onChange={(e) => setNewDepartmentUrl(e.target.value)}
                                className="w-full p-2 mb-4 border rounded-md outline-none"
                            />
                            {urlError && <p className="text-red-500 mb-5">{urlError}</p>}
                            <div className="flex justify-end space-x-3">
                                <button className="px-6 py-2 font-bold text-gray-400 bg-white rounded-full border border-gray-400"
                                    onClick={() => setIsEditModalVisible(false)}>Cancel</button>
                                <button className="px-8 py-2 font-bold text-white bg-blue-500 rounded-full"
                                    onClick={handleUpdateDepartment}>Save</button>
                            </div>
                        </div>
                    </div>
                )}

                {isDeleteModalVisible && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative px-8 py-6 bg-white rounded-2xl shadow-lg w-96">
                            <h2 className="mb-4 text-xl font-bold">Delete Department</h2>
                            <p>Are you sure you want to delete this department?</p>
                            <div className="flex justify-end mt-6 space-x-3">
                                <button className="px-6 py-2 font-bold text-gray-400 bg-white rounded-full border border-gray-400"
                                    onClick={() => setIsDeleteModalVisible(false)}>Cancel</button>
                                <button className="px-8 py-2 font-bold text-white bg-red-500 rounded-full"
                                    onClick={handleDeleteDepartment}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </Example>
    );
};

export default Departments;
