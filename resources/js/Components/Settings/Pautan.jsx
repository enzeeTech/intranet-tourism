import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import './Pautan.css';
import { useCsrf } from "@/composables";

const API_URL = "/api/settings/external_links";
const urlTemplate = "/api/settings/external_links/{id}";

const Pautan = () => {
  const [apps, setApps] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);
  const [newAppName, setNewAppName] = useState('');
  const [newAppUrl, setNewAppUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const csrfToken = useCsrf();

  useEffect(() => {
    const fetchData = async () => {
      let allApps = [];
      let currentPage = 1;
      let lastPage = 1;

      try {
        while (currentPage <= lastPage) {
          const response = await fetch(`${API_URL}?page=${currentPage}`, {
            method: "GET",
            headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
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
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  const PautanHandleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedApps = Array.from(apps);
    const [reorderedItem] = reorderedApps.splice(result.source.index, 1);
    reorderedApps.splice(result.destination.index, 0, reorderedItem);

    updateOrder(reorderedApps);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newApps = [...apps];
    [newApps[index - 1], newApps[index]] = [newApps[index], newApps[index - 1]];

    updateOrder(newApps);
  };

  const handleMoveDown = (index) => {
    if (index === apps.length - 1) return;
    const newApps = [...apps];
    [newApps[index + 1], newApps[index]] = [newApps[index], newApps[index + 1]];

    updateOrder(newApps);
  };

  const isDuplicateApp = (name, url, existingApps) => {
    const isNameDuplicate = existingApps.some(app => app.label === name);
    const isUrlDuplicate = existingApps.some(app => app.url === url);

    return { isNameDuplicate, isUrlDuplicate };
  };

  const isValidUrl = (url) => {
    return url.startsWith('http://') || url.startsWith('https://');
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
      window.location.reload();
  };

  const PautanHandleEditApp = (app) => {
    setCurrentApp(app);
    setNewAppName(app.label);
    setNewAppUrl(app.url);
    setUrlError('');
    setIsEditModalVisible(true);
  };

  const PautanHandleUpdateApp = () => {
    if (!isValidUrl(newAppUrl)) {
      setUrlError('URL must start with http:// or https://');
      return;
    } else {
      setUrlError('');
    }

    const { isNameDuplicate, isUrlDuplicate } = isDuplicateApp(newAppName, newAppUrl, apps);
    if (isNameDuplicate) {
      alert('App name already exists.');
      return;
    } else if (isUrlDuplicate) {
      alert('App URL already exists.');
      return;
    }

    const updatedApp = { label: newAppName, url: newAppUrl };
    const updateUrl = urlTemplate.replace('{id}', currentApp.id);

    fetch(updateUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', "X-CSRF-Token": csrfToken },
      body: JSON.stringify(updatedApp)
    })
      .then(response => response.json())
      .then(data => {
        setApps(sortAlphabetically(apps.map(app => (app.id === data.id ? data : app))));
        setIsEditModalVisible(false);
        resetForm();
      })
      .catch(error => console.error('Error updating app:', error));
      window.location.reload();
  };

  const PautanHandleDeleteApp = () => {
    const deleteUrl = urlTemplate.replace('{id}', currentApp.id);

    fetch(deleteUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', "X-CSRF-Token": csrfToken },
      body: JSON.stringify(deleteUrl)
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

  return (
    <>
      <section className="flex flex-col px-5 py-4 bg-white rounded-2xl shadow-custom max-w-[900px] mb-10">
        <div className="flex items-center justify-between mb-2 border-b border-gray-200">
          <h2 className="mb-3 text-2xl font-bold text-blue-500">External Apps</h2>
          <button className="px-4 py-1 mb-2 font-bold text-white bg-blue-500 rounded-full" onClick={() => { resetForm(); setIsAddModalVisible(true); }}>+ Add</button>
        </div>
        <DragDropContext onDragEnd={PautanHandleDragEnd}>
          <Droppable droppableId="apps">
            {(provided) => (
              <table className="min-w-full divide-y divide-gray-200" {...provided.droppableProps} ref={provided.innerRef}>
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-base font-bold text-center text-gray-900 label-column">App name</th>
                    <th className="px-6 py-3 text-base font-bold text-center text-gray-900 url-column">URL</th>
                    <th className="px-6 py-3 text-base font-bold text-center text-gray-900 edit-column">Edit</th>
                    <th className="px-6 py-3 text-base font-bold text-center text-gray-900 delete-column">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((app, index) => (
                    <Draggable key={app.id} draggableId={String(app.id)} index={index}>
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          className={`bg-white border-t border-gray-200 ${snapshot.isDragging ? 'dragging' : ''}`}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <td className="px-6 py-4 text-sm font-semibold text-black whitespace-nowrap label-column">
                            <input
                              type="text"
                              disabled={true}
                              value={app.label}
                              readOnly
                              onChange={(e) => {
                                const newApps = [...apps];
                                newApps[index].label = e.target.value;
                                setApps(newApps);
                              }}
                              className="w-full p-1 outline-none border-none"
                              style={{ borderColor: '#E4E4E4', borderRadius: '0.375rem', borderWidth: '1px' }}
                            />
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-black whitespace-nowrap url-column">
                            <input
                              type="text"
                              disabled={true}
                              value={app.url}
                              readOnly
                              onChange={(e) => {
                                const newApps = [...apps];
                                newApps[index].url = e.target.value;
                                setApps(newApps);
                              }}
                              className="w-full p-1 outline-none border-none"
                              style={{ borderColor: '#E4E4E4', borderRadius: '0.375rem', borderWidth: '1px' }}
                            />
                          </td>
                          {/* <td className="px-6 py-4 text-sm font-semibold text-black whitespace-nowrap order-column">
                            <div className="flex items-center justify-center">
                              <button
                                className="px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveUp(index);
                                }}
                                disabled={index === 0}
                                style={{ opacity: index === 0 ? 0.6 : 1 }}
                              >
                                <img src="assets/orderingup.svg" alt="Up" />
                              </button>
                              <button
                                className="px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveDown(index);
                                }}
                                disabled={index === apps.length - 1}
                                style={{ opacity: index === apps.length - 1 ? 0.6 : 1 }}
                              >
                                <img src="assets/orderingdown.svg" alt="Down" />
                              </button>
                            </div>
                          </td> */}
                          <td className="px-6 py-4 text-sm font-semibold text-black whitespace-nowrap edit-column">
                            <div className="fixed-size-container">
                              <button className="text-blue-100" onClick={(e) => { e.stopPropagation(); PautanHandleEditApp(app); }}>
                                <img src="assets/EditIcon.svg" alt="Edit" className="fixed-size" />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-black whitespace-nowrap delete-column">
                            <div className="fixed-size-container">
                              <button className="text-red-500" onClick={(e) => { e.stopPropagation(); setCurrentApp(app); setIsDeleteModalVisible(true); }}>
                                <img src="assets/redDeleteIcon.svg" alt="Delete" className="fixed-size" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </section>

      {isAddModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
          <div className="relative p-8 bg-white rounded-3xl shadow-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Add New App</h2>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
          <div className="relative p-8 bg-white rounded-3xl shadow-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Edit App</h2>
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
            <div className="flex justify-end space-x-3">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
          <div className="relative p-8 bg-white rounded-3xl shadow-lg w-96">
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
    </>
  );
};

export default Pautan;
