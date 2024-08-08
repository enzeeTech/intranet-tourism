import React, { useState, useEffect } from "react";
import { useCsrf } from "@/composables";
import { usePage } from '@inertiajs/react';

function Header({ title }) {
  return (
    <header className="flex gap-5 items-start self-center px-5 w-full text-2xl font-bold text-center max-w-[358px] text-neutral-800">
      <h1 className="flex-auto mt-3">{title}</h1>
    </header>
  );
}

function Avatar({ src, alt, onImageChange }) {
  const handleClick = () => {
    document.getElementById('avatarInput').click();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center px-16 py-12 bg-gray-200 cursor-pointer rounded-xl" onClick={handleClick}>
        <img loading="lazy" src={src} alt={alt} className="aspect-square w-[58px]" />
      </div>
      <input
        type="file"
        accept="image/*"
        id="avatarInput"
        onChange={(e) => onImageChange(e.target.files[0])}
        className="hidden"
      />
    </div>
  );
}

function Card({ 
  title, 
  imgSrc, 
  imgAlt, 
  user,
  department, 
  description, 
  cancelText, 
  saveText, 
  onCancel, 
  onSave
}) {
  const [departmentName, setDepartmentName] = useState(department?.name || '');
  const [imageSrc, setImageSrc] = useState(department?.banner || imgSrc); 
  const [selectedType, setSelectedType] = useState(department?.type || '');
  const [departmentDescription, setDepartmentDescription] = useState(department?.description || '');
  const [error, setError] = useState('');
  const csrfToken = useCsrf();
  const { props } = usePage();
  const { id, authToken } = props;

  useEffect(() => {
    setDepartmentName(department?.name || '');
    setImageSrc(department?.banner || imgSrc);
    setSelectedType(department?.type || '');
    setDepartmentDescription(department?.description || '');
  }, [department, imgSrc]);

  const handleImageChange = (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('banner', file);
    formData.append('user_id', id);
    formData.append('_method', 'PUT');
  
    fetch(`/api/department/departments/${department?.id}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'X-CSRF-TOKEN': csrfToken || '',
        'Authorization': `Bearer ${authToken}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      setImageSrc(data.filePath);
    })
    .catch(error => {
      console.error('Error uploading image:', error);
      setError('An error occurred while uploading the image.');
    });
  };
  
  const handleSubmit = async () => {
    if (!departmentName.trim()) {
      setError('Department Name is required.');
      return;
    }

    setError('');

    const data = {
      name: departmentName,
      description: departmentDescription,
      type: selectedType,
      created_by: user?.name || 'Unknown User', // Fallback in case user is undefined
      updated_by: user?.name || 'Unknown User', // Fallback in case user is undefined
      banner: department.banner,
    };

    const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append("name", departmentName);
      formData.append("description", departmentDescription);
      formData.append("type", selectedType);
      formData.append('banner', file);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "X-CSRF-Token": csrfToken 
      },
      body: formData
    };

    const url = `/api/department/departments/${department?.id}`;

    try {
      const response = await fetch(url, options);
      const text = await response.text();

      if (!response.ok) {
        console.error('Server response not OK:', text);
        throw new Error('Failed to save department');
      }

      const responseData = text ? JSON.parse(text) : {};
      console.log('Department saved:', responseData.data);
      onSave(responseData.data);
      // window.location.reload(); 
    } catch (error) {
      console.error('Error saving department:', error.message);
      setError('An error occurred while saving the department.');
    }
  };

  return (
    <section className="flex flex-col py-6 bg-white rounded-3xl shadow-sm max-w-[442px]">
      <Header title={title} />
      <div className="flex flex-col items-center w-full px-6">
        <Avatar src={imageSrc} alt={imgAlt} onImageChange={handleImageChange} />
        <input
          type="text"
          placeholder="Department name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          className="self-stretch text-2xl font-extrabold border border-solid rounded-md mt-7 text-neutral-800 border-neutral-300"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <input
          type="text"
          placeholder={description}
          value={departmentDescription}
          onChange={(e) => setDepartmentDescription(e.target.value)}
          className="self-stretch border border-solid rounded-md mt-3 text-neutral-800 border-neutral-300"
        />
        <div className="flex mt-4 space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            {cancelText}
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {saveText}
          </button>
        </div>
      </div>
    </section>
  );
}

const EditDepartments = ({ department, onCancel, onSave }) => (
  <Card
    title="Edit Department"
    imgSrc="https://via.placeholder.com/150"
    imgAlt="Department Image"
    department={department}
    cancelText="Cancel"
    saveText="Save"
    onCancel={onCancel}
    onSave={onSave}
  />
);

export default EditDepartments;
