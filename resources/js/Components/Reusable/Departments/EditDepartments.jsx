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
  const [previewSrc, setPreviewSrc] = useState(src);

  const handleClick = () => {
    document.getElementById('avatarInput').click();
  };

  const handleImageChange = (file) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewSrc(objectUrl);
      onImageChange(file);
    }
  };

  let banner = '';

  if (previewSrc && typeof previewSrc === 'string') {
    if (previewSrc.startsWith('banner/')) {
      banner = `/storage/${previewSrc}`;
    } else {
      banner = previewSrc;
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center px-5 py-5 bg-gray-200 cursor-pointer rounded-xl" onClick={handleClick}>
        {banner ? (
          <img loading="lazy" src={banner} alt={alt} className="aspect-square w-[400px]" />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        id="avatarInput"
        onChange={(e) => handleImageChange(e.target.files[0])}
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
  const [initialDepartmentName, setInitialDepartmentName] = useState(department?.name || '');

  const [imageSrc, setImageSrc] = useState(department?.banner || imgSrc);
  const [initialImageSrc, setInitialImageSrc] = useState(department?.banner || imgSrc);
  const [imageFile, setImageFile] = useState(null); // New state to hold the file object

  const [selectedType, setSelectedType] = useState(department?.type || '');
  const [initialSelectedType, setInitialSelectedType] = useState(department?.type || '');

  const [departmentDescription, setDepartmentDescription] = useState(department?.description || '');
  const [initialDepartmentDescription, setInitialDepartmentDescription] = useState(department?.description || '');

  const [error, setError] = useState('');
  const csrfToken = useCsrf();
  const { props } = usePage();
  const { id, authToken } = props;

  useEffect(() => {
    setDepartmentName(department?.name || '');
    setInitialDepartmentName(department?.name || '');
    
    setImageSrc(department?.banner || imgSrc);
    setInitialImageSrc(department?.banner || imgSrc);
    
    setSelectedType(department?.type || '');
    setInitialSelectedType(department?.type || '');

    setDepartmentDescription(department?.description || '');
    setInitialDepartmentDescription(department?.description || '');
  }, [department, imgSrc]);

  const handleImageChange = (file) => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);
    setImageFile(file); 
  };

  const handleSubmit = async () => {
    if (!departmentName.trim()) {
      setError('Department Name is required.');
      return;
    }

    if (
      departmentName === initialDepartmentName &&
      imageSrc === initialImageSrc &&
      selectedType === initialSelectedType &&
      departmentDescription === initialDepartmentDescription
    ) {
      setError('No changes detected.');
      return;
    }

    setError('');

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append("name", departmentName);
    formData.append("description", departmentDescription);
    formData.append("type", selectedType);

    if (imageFile) {
      formData.append('banner', imageFile);
    }

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "X-CSRF-Token": csrfToken,
        'Authorization': `Bearer ${authToken}`,
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
      window.location.reload();
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
        <input
          type="text"
          placeholder={description}
          value={departmentDescription}
          onChange={(e) => setDepartmentDescription(e.target.value)}
          className="self-stretch mt-3 border border-solid rounded-md text-neutral-800 border-neutral-300"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <div className="flex mt-4 space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-black font-bold"
          >
            {cancelText}
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white font-bold bg-blue-500 rounded-full hover:bg-blue-700"
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
