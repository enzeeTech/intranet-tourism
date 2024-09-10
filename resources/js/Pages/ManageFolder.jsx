import React, { useState, useEffect } from "react";
import Example from "../Layouts/DashboardLayoutNew";
import { useCsrf } from "@/composables";

const API_URL_DEPARTMENTS = "/api/department/departments";
const API_URL = "/api/settings/external_links";
const urlTemplate = "/api/settings/external_links/{id}";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [apps, setApps] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);
  const [newAppName, setNewAppName] = useState("");
  const [newAppUrl, setNewAppUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const csrfToken = useCsrf();

  const fetchDepartments = async () => {
    try {
      const response = await fetch(API_URL_DEPARTMENTS, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok for departments");
      }
      const data = await response.json();
      setDepartments(data.data.data);
    } catch (error) {
      console.error("Error fetching departments:", error.message);
    }
  };

  const fetchApps = async () => {
    try {
      let allApps = [];
      let currentPage = 1;
      let lastPage = 1;
  
      while (currentPage <= lastPage) {
        const response = await fetch(`${API_URL}?page=${currentPage}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-CSRF-Token": csrfToken,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok for apps");
        }
        const data = await response.json();
        allApps = allApps.concat(data.data.data);
        lastPage = data.data.last_page;
        currentPage++;
      }
  
      const sortedAppsData = allApps
        .sort((a, b) => a.order - b.order)
        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
  
      setApps(sortedAppsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    fetchDepartments();
    fetchApps();
  }, [csrfToken]);

  const sortAlphabetically = (apps) => {
    return apps.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
  };
  const updateOrder = (newApps) => {
    const updatedApps = newApps.map((app, idx) => ({
      ...app,
      order: idx + 1
    }));

    setApps(sortAlphabetically(updatedApps));

    const updatePromises = updatedApps.map((app) => {
      const updateUrl = urlTemplate.replace('{id}', app.id);
      return fetch(updateUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', "X-CSRF-Token": csrfToken },
        body: JSON.stringify(app)
      }).catch(error => console.error(`Error updating app with id ${app.id}:`, error.message));
    });

    Promise.all(updatePromises)
      .then(results => console.log('Order update successful', results))
      .catch(error => console.error('Error updating order:', error.message));
  };
  

  const isDuplicateApp = (name, url, existingApps) => {
    const isNameDuplicate = existingApps.some(app => app.label === name);
    const isUrlDuplicate = existingApps.some(app => app.url === url);
    return { isNameDuplicate, isUrlDuplicate };
  };

  const isValidUrl = (url) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  const resetForm = () => {
    setNewAppName('');
    setNewAppUrl('');
    setUrlError('');
  };

  const PautanHandleAddApp = () => {
    if (!isValidUrl(newAppUrl)) {
        setUrlError('URL must start with http:// or https://');
        return;
    } else {
        setUrlError('');
    }

    // Check for duplicates
    const { isNameDuplicate, isUrlDuplicate } = isDuplicateApp(newAppName, newAppUrl, apps);
    if (isNameDuplicate) {
        alert('App name already exists.');
        return;
    } else if (isUrlDuplicate) {
        alert('App URL already exists.');
        return;
    }

    // Include department info in label
    const departmentInfo = '(dept)'; // Replace with actual department info if available
    const labelWithDept = `${newAppName} ${departmentInfo}`;

    const newApp = { label: labelWithDept, url: newAppUrl };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "X-CSRF-Token": csrfToken },
        body: JSON.stringify(newApp)
    })
        .then(response => response.json())
        .then(data => {
            setApps(sortAlphabetically([...apps, data]));
            setIsAddModalVisible(false);
            resetForm();
        })
        .catch(error => console.error('Error adding app:', error));
};


  const PautanHandleEditApp = (app) => {
    console.log('Editing app:', app); // Debug log to check the app object
    setCurrentApp(app);
    setNewAppName(app.label);
    setNewAppUrl(app.url);
    setUrlError('');
    setIsEditModalVisible(true);
  };
   

  const PautanHandleUpdateApp = () => {
    if (!currentApp || !currentApp.id) {
      console.error('Current app ID is undefined.');
      return;
    } else {
      setUrlError('');
    }
  
    const { isNameDuplicate, isUrlDuplicate } = isDuplicateApp(newAppName, newAppUrl, apps);
    if (newAppName && isNameDuplicate && currentApp.label !== newAppName) {
      alert('App name already exists.');
      return;
    } else if (newAppUrl && isUrlDuplicate && currentApp.url !== newAppUrl) {
      alert('App URL already exists.');
      return;
    }
  
    const updatedApp = { ...currentApp };
    if (newAppName) updatedApp.label = newAppName;
    if (newAppUrl) updatedApp.url = newAppUrl;
  
    const updateUrl = urlTemplate.replace('{id}', currentApp.id);
  
    fetch(updateUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', "X-CSRF-Token": csrfToken },
      body: JSON.stringify(updatedApp)
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(errorText => {
            throw new Error(`Failed to update the app: ${errorText}`);
          });
        }
        return response.json(); // Try to parse JSON if the response is OK
      })
      .then(data => {
        const updatedAppsList = apps.map(app => (app.id === data.id ? data : app));
        setApps(sortAlphabetically(updatedAppsList));
        resetForm();
        setIsEditModalVisible(false);
        window.location.reload(); 
        
        // Optionally, show a message or wait before reload
        setTimeout(() => {
          window.location.reload(); // Reload the page after a slight delay
        }, 1000); // Delay for 1 second
      })
      .catch(error => {
        window.location.reload();
        console.error('Error updating app:', error);
      });
  };
  

  
  
  
  

  const PautanHandleDeleteApp = () => {
    const deleteUrl = urlTemplate.replace('{id}', currentApp.id);

    fetch(deleteUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', "X-CSRF-Token": csrfToken },
    })
      .then(response => {
        if (response.status === 204) {
          setApps(sortAlphabetically(apps.filter(app => app.id !== currentApp.id)));
          setIsDeleteModalVisible(false);
          setCurrentApp(null);
        } else {
          return response.text().then(errorText => { throw new Error(`Server error: ${errorText}`); });
        }
      })
      .catch(error => console.error('Error deleting app:', error));
  };

  useEffect(() => {
    if (departments.length > 0 || apps.length > 0) {
        const combined = [
            ...departments.map((dep) => ({
              id: dep.id, // Ensure 'id' field exists if needed
              name: dep.name,
              label: "",
              link: "",
            })),
            ...apps.map((app) => ({
              id: app.id, // Ensure 'id' field exists
              name: "",
              url: app.url,
              label: app.label,
              link: app.url,
            })),
          ];
          

      const sortedCombined = combined.sort((a, b) => {
        if (a.name && !b.name) return -1; // Departments come first
        if (!a.name && b.name) return 1; // Apps come after departments
        return 0; // If both are the same type, maintain order
      });

      setCombinedData(sortedCombined);
    }
  }, [departments, apps]);

  return (
    <Example>
      <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[1500px] mx-8 my-10">
        <div className="flex items-start justify-between mb-2 border-b border-gray-200">
          <h2 className="mb-3 text-3xl font-bold text-gray-900">
            Manage Official File
          </h2>
          <div className="flex space-x-4">
            <button
              className="text-gray-900 font-bold"
              onClick={() => window.history.back()}
            >
              Back
            </button>
            <button
              className="px-4 py-2 font-bold text-white whitespace-nowrap bg-blue-500 hover:bg-blue-700 rounded-full"
              onClick={handleAdd}
            >
              + Add
            </button>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 font-bold text-md text-start text-gray-500">Department</th>
              <th className="px-6 py-3 font-bold text-md text-start text-gray-500">URL</th>
              <th className="px-6 py-3 font-bold text-md text-center text-gray-500">Edit</th>
              <th className="px-6 py-3 font-bold text-md text-center text-gray-500">Delete</th>
            </tr>
          </thead>
          <tbody>
            {combinedData.map((item, index) => (
              <tr key={index} className="bg-white border-t border-gray-200">
                <td className="px-6 py-4 text-sm font-semibold text-black whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-black whitespace-nowrap">
                  {item.link}
                </td>
                <td className="px-6 max-md:px-2 py-4 text-sm font-semibold text-black whitespace-nowrap edit-column">
                  <div className="fixed-size-container">
                  <button
  className="text-blue-100"
  onClick={(e) => {
    e.stopPropagation(); 
    console.log('Item clicked for editing:', item); // Debug log to check item object
    PautanHandleEditApp(item);
  }}
>
                    <img src="assets/EditIcon.svg" alt="Edit" className="fixed-size" />
                    </button>

                  </div>
                </td>
                <td className="px-6 max-md:px-2 py-4 text-sm font-semibold text-black whitespace-nowrap delete-column">
                  <div className="fixed-size-container">
                    <button className="text-red-500" onClick={(e) => { e.stopPropagation(); setCurrentApp(item); setIsDeleteModalVisible(true); }}>
                      <img src="assets/redDeleteIcon.svg" alt="Delete" className="fixed-size" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Add/Edit/Delete */}
        {isAddModalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative px-8 py-6 bg-white rounded-2xl shadow-lg w-96">
              <h2 className="mb-4 text-xl font-bold">Add New Link</h2>
              <input
                type="text"
                placeholder="Example.com"
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md outline-none border-E4E4E4"
              />
              <input
                type="text"
                placeholder="https://example.com"
                value={newAppUrl}
                onChange={(e) => setNewAppUrl(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md outline-none border-E4E4E4"
              />
              {urlError && <p className="text-red-500 -mt-4 mb-5">{urlError}</p>}
              <div className="flex justify-end space-x-3 text-sm">
                <button className="px-6 py-2 font-bold text-gray-400 bg-white hover:bg-gray-400 hover:text-white rounded-full border border-gray-400" onClick={() => setIsAddModalVisible(false)}>
                  Cancel
                </button>
                <button className="px-8 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded-full" onClick={PautanHandleAddApp}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditModalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative px-8 py-6 bg-white rounded-2xl shadow-lg w-96">
              <h2 className="mb-4 text-xl font-bold">Edit Link</h2>
              <input
                type="text"
                placeholder="Example.com"
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md outline-none border-E4E4E4"
              />
              <input
                type="text"
                placeholder="https://example.com"
                value={newAppUrl}
                onChange={(e) => setNewAppUrl(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md outline-none border-E4E4E4"
              />
              {urlError && <p className="text-red-500 -mt-4 mb-5">{urlError}</p>}
              <div className="flex justify-end space-x-3 mt-3">
                <button className="px-6 py-2 text-base font-bold text-gray-400 bg-white hover:bg-gray-400 hover:text-white rounded-full border border-gray-400" onClick={() => setIsEditModalVisible(false)}>
                  Cancel
                </button>
                <button className="px-8 py-2 text-base font-bold text-white bg-blue-500 hover:bg-blue-700 rounded-full" onClick={PautanHandleUpdateApp}>
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteModalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative px-8 py-6 bg-white rounded-2xl shadow-lg w-96">
              <h2 className="mb-4 text-xl font-bold text-center">Delete this link?</h2>
              <div className="flex justify-center space-x-4">
                <button className="px-6 py-2 text-base font-bold text-gray-400 bg-white hover:bg-gray-400 hover:text-white rounded-full border border-gray-400" onClick={() => setIsDeleteModalVisible(false)}>
                  No
                </button>
                <button className="px-8 py-2 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-full" onClick={PautanHandleDeleteApp}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </Example>
  );
};

export default Departments;
