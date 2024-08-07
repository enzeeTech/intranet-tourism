import React, { useState, useEffect } from "react";
import { useCsrf } from "@/composables";

// Function to get current user info (replace with your actual method)
const getCurrentUser = async () => {
  // Replace this with actual logic to fetch user info
  return {
    name: "Current User Name",
    role: "Admin",
    src: "path/to/current/user/avatar.jpg"
  };
};

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
    <div className="flex self-stretch gap-4 mt-5 text-neutral-800">
      <img loading="lazy" src={src} alt="" className="shrink-0 aspect-square w-[42px]" />
      <div className="flex flex-col grow shrink-0 self-start mt-1.5 basis-0 w-fit">
        <p className="text-lg font-bold">{name}</p>
        {/* <p className="-mt-1 text-sm">{role}</p> */}
      </div>
    </div>
  );
}

function Card({ title, imgSrc, imgAlt, user, description, cancelText, createText, onCancel, onCreate, id }) {
  const [departmentName, setDepartmentName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(imgSrc);
  const [selectedType, setSelectedType] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [userData, setUserData] = useState({});
  const csrfToken = useCsrf();

  const fetchUser = async () => {
    
  }

  useEffect(() => {
    fetch(`/api/users/users/${id}?with[]=profile`, {
      method: "GET",
  })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      //-----------------------------//
      .then(({ data }) => {
          // const firstName = data.name.split(' ')[0];
          setUserData(pv => ({
              ...pv, ...data,
              name: data.name,
              profileImage: data.profile && data.profile.image ? `/storage/${data.profile.image}` : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${data.name}&rounded=true`
          }));
      })
      .catch((error) => {
          console.error("Error fetching user data:", error);
      });
  }, [id]);


  const handleImageChange = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', departmentName);
    if (imageFile){
      formData.append('banner', imageFile);
    }
    formData.append('description', departmentDescription);
    formData.append('type', selectedType);
    // formData.append('created_by', user.name);
    // formData.append('updated_by', user.name);

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "X-CSRF-Token": csrfToken 
      },
      body: formData
    };

    try {
      const response = await fetch('/api/department/departments', options);
      const text = await response.text();

      if (!response.ok) {
        console.error('Server response not OK:', text);
        throw new Error('Failed to create department');
      }

      // const responseData = text ? JSON.parse(text) : {};
      // console.log('Department created:', responseData.data);
      // onCreate(responseData.data);
    } catch (error) {
      console.error('Error creating department:', error.message);
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
        <UserInfo name={userData.name} role={user.role} src={userData.profileImage} />
        <input
          type="text"
          placeholder={description}
          value={departmentDescription}
          onChange={(e) => setDepartmentDescription(e.target.value)}
          className="justifycenter itemsstart px-3.5 py-7 mt-4 max-w-full text-base font-semibold whitespace-nowrap text-neutral-500 w-[383px] rounded-md border border-solid border-neutral-300"
        />
        <div className="flex self-end justify-between gap-5 mt-12 text-sm text-center whitespace-nowrap">
          <button className="my-auto font-semibold text-neutral-800" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="justify-center px-4 py-2 font-bold text-white bg-red-500 hover:bg-red-700 rounded-3xl" onClick={handleSubmit}>
            {createText}
          </button>
        </div>
      </div>
    </section>
  );
}

export default function CreateDepartments({ onCancel, onCreate, userID }) {

  // console.log("askdjalsdkaslkasjd:", id);
  const [user, setUser] = useState({
    name: '',
    role: '',
    src: ''
  });

  useEffect(() => {
    async function fetchUser() {
      const userInfo = await getCurrentUser();
      setUser(userInfo);
    }
    fetchUser();
  }, []);

  return (
    <Card
      title="Create Department"
      imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/6f8e3479de331781a2f10c0ab889344565741f0340528db3a07d68a166a8dee4?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&"
      imgAlt="Departments Logo"
      user={user}
      type="Type"
      description="Description"
      cancelText="Cancel"
      createText="Create"
      onCancel={onCancel}
      onCreate={onCreate}
      id={userID}
    />
  );
}
