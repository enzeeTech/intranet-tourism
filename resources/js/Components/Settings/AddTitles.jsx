import React, { useState, useEffect } from "react";
import { useCsrf } from "@/composables";

const AddTitles = () => {
  const [titles, setTitles] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [editingTitleName, setEditingTitleName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState(null); 
  const csrfToken = useCsrf();

  const fetchTitles = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const titleData = data.data.data.map((title) => ({
        id: title.id,
        title: title.title,
      }));

      setTitles((prevTitles) => {
        const allTitles = [...prevTitles, ...titleData];
        return allTitles.sort((a, b) => a.id - b.id);
      });

      if (data.data.next_page_url) {
        fetchTitles(data.data.next_page_url);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTitles("/api/department/business_posts");
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const createTitle = () => {
    if (newTitle.trim() === "") return;

    fetch("/api/department/business_posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setTitles((prevTitles) => {
            const allTitles = [...prevTitles, data.data];
            return allTitles.sort((a, b) => a.id - b.id);
          });
          setNewTitle("");
          setIsPopupOpen(false);
          showMessage("success", "New title added successfully.");
        } else {
          throw new Error("Failed to add new title.");
        }
      })
      .catch((error) => {
        showMessage("error", error.message);
      });
  };

  const editTitle = (id, name) => {
    setEditingTitleId(id);
    setEditingTitleName(name);
  };

  const saveTitle = () => {
    if (editingTitleName.trim() === "") return;

    fetch(`/api/department/business_posts/${editingTitleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ title: editingTitleName }),
    })
      .then((response) => response.json())
      .then(() => {
        setTitles((prevTitles) =>
          prevTitles.map((title) =>
            title.id === editingTitleId
              ? { ...title, title: editingTitleName }
              : title
          )
        );
        setEditingTitleId(null);
        setEditingTitleName("");
        showMessage("success", "Title edited successfully.");
      })
      .catch((error) => {
        showMessage("error", "Failed to edit title.");
      });
  };

  return (
    <div className="container p-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Titles</h1>
          <p className="text-gray-600">
            Manage the business titles here by adding, editing, and viewing them.
          </p>
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Add New Title
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 text-sm font-semibold text-left text-gray-700 uppercase bg-gray-100">
                ID
              </th>
              <th className="px-5 py-3 text-sm font-semibold text-left text-gray-700 uppercase bg-gray-100">
                Name
              </th>
              <th className="px-5 py-3 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {titles.map((title) => (
              <tr key={title.id}>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  {title.id}
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  {editingTitleId === title.id ? (
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={editingTitleName}
                      onChange={(e) => setEditingTitleName(e.target.value)}
                    />
                  ) : (
                    <span>{title.title}</span>
                  )}
                </td>
                <td className="px-5 py-5 text-sm text-right bg-white border-b border-gray-200">
                  {editingTitleId === title.id ? (
                    <button
                      onClick={saveTitle}
                      className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => editTitle(title.id, title.title)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for adding a new title */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Title</h2>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
            </div>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Title Name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={createTitle}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTitles;
