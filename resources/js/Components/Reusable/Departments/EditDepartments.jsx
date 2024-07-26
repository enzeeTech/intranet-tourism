// import React, { useState, useEffect } from "react";
// import { useCsrf } from "@/composables";

// function Header({ title }) {
//   return (
//     <header className="flex gap-5 items-start self-center px-5 w-full text-2xl font-bold text-center max-w-[358px] text-neutral-800">
//       <h1 className="flex-auto mt-3">{title}</h1>
//     </header>
//   );
// }

// function Avatar({ src, alt, onImageChange }) {
//   const handleClick = () => {
//     document.getElementById('avatarInput').click();
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex justify-center items-center px-16 py-12 bg-gray-200 rounded-xl cursor-pointer" onClick={handleClick}>
//         <img loading="lazy" src={src} alt={alt} className="aspect-square w-[58px]" />
//       </div>
//       <input
//         type="file"
//         accept="image/*"
//         id="avatarInput"
//         onChange={(e) => onImageChange(e.target.files[0])}
//         className="hidden"
//       />
//     </div>
//   );
// }

// function Card({ 
//   title, 
//   imgSrc, 
//   imgAlt, 
//   user, 
//   department, 
//   description, 
//   cancelText, 
//   saveText, 
//   onCancel, 
//   onSave 
// }) {
//   const [departmentName, setDepartmentName] = useState(department.name || '');
//   const [imageSrc, setImageSrc] = useState(department.banner || imgSrc);
//   const [selectedType, setSelectedType] = useState(department.type || '');
//   const [departmentDescription, setDepartmentDescription] = useState(department.description || '');
//   const [error, setError] = useState('');
//   const csrfToken = useCsrf();

//   const handleImageChange = (file) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImageSrc(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async () => {
//     if (!departmentName.trim()) {
//         setError('Department Name is required.');
//         return;
//       }

//     setError('');

//     const data = {
//       name: departmentName,
//       banner: imageSrc,
//       description: departmentDescription,
//       type: selectedType,
//       created_by: user.name,
//       updated_by: user.name,
//     };

//     const options = {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         "X-CSRF-Token": csrfToken 
//       },
//       body: JSON.stringify(data)
//     };

//     const url = `/api/department/departments/${department.id}`;

//     try {
//       const response = await fetch(url, options);
//       const text = await response.text();

//       if (!response.ok) {
//         console.error('Server response not OK:', text);
//         throw new Error('Failed to save department');
//       }

//       const responseData = text ? JSON.parse(text) : {};
//       console.log('Department saved:', responseData.data);
//       onSave(responseData.data);
//     } catch (error) {
//       console.error('Error saving department:', error.message);
//     }
//   };

//   return (
//     <section className="flex flex-col py-2.5 bg-white rounded-xl shadow-sm max-w-[442px]">
//       <Header title={title} />
//       <div className="flex flex-col items-center px-6 mt-3 w-full">
//         <Avatar src={imageSrc} alt={imgAlt} onImageChange={handleImageChange} />
//         <input
//           type="text"
//           placeholder="Department name"
//           value={departmentName}
//           onChange={(e) => setDepartmentName(e.target.value)}
//           className="self-stretch mt-7 text-2xl font-extrabold text-neutral-800 border border-solid border-neutral-300 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder={description}
//           value={departmentDescription}
//           onChange={(e) => setDepartmentDescription(e.target.value)}
//           className="justify-center items-start px-3.5 py-7 mt-4 max-w-full text-base font-semibold whitespace-nowrap text-neutral-500 w-[383px] rounded-md border border-solid border-neutral-300"
//         />
//         <div className="flex gap-5 justify-between self-end mt-12 text-sm text-center whitespace-nowrap">
//           <button className="my-auto font-semibold text-neutral-800" onClick={onCancel}>
//             {cancelText}
//           </button>
//           <button className="justify-center px-4 py-2 font-bold text-white bg-red-500 hover:bg-red-700 rounded-3xl" onClick={handleSubmit}>
//             {saveText}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default function EditDepartments({ department, onCancel, onSave }) {
//   const user = {
//     name: "Aisyah binte Musa",
//     role: "Admin",
//     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/336116b2c015d4234b019c5e8ecf65be0d5d967c671f2fbd3512d78d09d2f956?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&"
//   };

//   return (
//     <Card
//       title="Edit Department"
//       imgSrc={department.banner || "https://cdn.builder.io/api/v1/image/assets/TEMP/6f8e3479de331781a2f10c0ab889344565741f0340528db3a07d68a166a8dee4?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&"}
//       imgAlt="Departments Logo"
//       user={user}
//       department={department}
//       description="Description"
//       cancelText="Cancel"
//       saveText="Save"
//       onCancel={onCancel}
//       onSave={onSave}
//     />
//   );
// }

import React, { useState, useEffect } from "react";
import { useCsrf } from "@/composables";

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

function UserInfo({ name, role, src }) {
  return (
    <div className="flex gap-4 self-stretch mt-5 text-neutral-800">
      <img loading="lazy" src={src} alt="" className="shrink-0 aspect-square w-[42px]" />
      <div className="flex flex-col grow shrink-0 self-start mt-1.5 basis-0 w-fit">
        <p className="text-lg font-bold">{name}</p>
        <p className="-mt-1 text-sm">{role}</p>
      </div>
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
  const [departmentName, setDepartmentName] = useState(department.name || '');
  const [imageSrc, setImageSrc] = useState(department.banner || imgSrc); 
  const [selectedType, setSelectedType] = useState(department.type || '');
  const [departmentDescription, setDepartmentDescription] = useState(department.description || '');
  const [error, setError] = useState('');
  const csrfToken = useCsrf();

  useEffect(() => {
    setDepartmentName(department.name || '');
    setImageSrc(department.banner || imgSrc);
    setSelectedType(department.type || '');
    setDepartmentDescription(department.description || '');
  }, [department, imgSrc]);

//   const handleImageChange = (file) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImageSrc(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };
const handleImageChange = (file) => {
    const formData = new FormData();
    formData.append('banner', file);
  
    fetch('', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      setImageSrc(data.filePath); // Update the image source to the file path returned by the server
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
      banner: imageSrc,
      description: departmentDescription,
      type: selectedType,
      created_by: user.name,
      updated_by: user.name,
    };

    const options = {
      method: 'PUT',
      headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-CSRF-Token": csrfToken 
        },
        body: JSON.stringify(data)
     };

    const url = `/api/department/departments/${department.id}`;

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
    } catch (error) {
      console.error('Error saving department:', error.message);
      setError('An error occurred while saving the department.');
    }
  };

  return (
    <section className="flex flex-col py-2.5 bg-white rounded-xl shadow-sm max-w-[442px]">
      <Header title={title} />
      <div className="flex flex-col items-center w-full px-6 mt-3">
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
          className="justify-center items-start px-3.5 py-7 mt-4 max-w-full text-base font-semibold whitespace-nowrap text-neutral-500 w-[383px] rounded-md border border-solid border-neutral-300"
        />
        <div className="flex self-end justify-between gap-5 mt-12 text-sm text-center whitespace-nowrap">
          <button className="my-auto font-semibold text-neutral-800" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="justify-center px-4 py-2 font-bold text-white bg-red-500 hover:bg-red-700 rounded-3xl" onClick={handleSubmit}>
            {saveText}
          </button>
        </div>
      </div>
    </section>
  );
}

export default function EditDepartments({ department, onCancel, onSave }) {
    const [departmentData, setDepartmentData] = useState(null); // Added state to store fetched department data

    const user = {
    name: "Aisyah binte Musa",
    role: "Admin",
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/336116b2c015d4234b019c5e8ecf65be0d5d967c671f2fbd3512d78d09d2f956?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&"
  };

  useEffect(() => { // Added useEffect to fetch department data when component mounts
    const fetchDepartmentData = async () => {
      try {
        const response = await fetch(`/api/department/departments/${department.id}`); // Fetch department data from API
        const data = await response.json(); // Parse response JSON
        setDepartmentData(data); // Store fetched data in state
      } catch (error) {
        console.error('Error fetching department data:', error); // Log error
      }
    };

    fetchDepartmentData(); // Call the function to fetch data
  }, [department.id]); // Dependency array to re-fetch if department.id changes

  if (!departmentData) { // Render loading message while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <Card
      title="Edit Department"
      imgSrc={department.banner || "https://cdn.builder.io/api/v1/image/assets/TEMP/6f8e3479de331781a2f10c0ab889344565741f0340528db3a07d68a166a8dee4?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&"}
      imgAlt="Departments Logo"
      user={user}
      department={department}
      description="Description"
      cancelText="Cancel"
      saveText="Save"
      onCancel={onCancel}
      onSave={onSave}
    />
  );
}
