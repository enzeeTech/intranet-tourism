import React, { useState } from "react";
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
      <div className="flex justify-center items-center px-16 py-12 bg-gray-200 rounded-xl cursor-pointer" onClick={handleClick}>
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

function Card({ title, imgSrc, imgAlt, user, description, cancelText, createText, onCancel, onCreate }) {
  const [departmentName, setDepartmentName] = useState('');
  const [imageSrc, setImageSrc] = useState(imgSrc);
  const [selectedType, setSelectedType] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const csrfToken = useCsrf();

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const data = {
      name: departmentName,
      banner: imageSrc,
      description: departmentDescription,
      type: selectedType,
      created_by: user.name,
      updated_by: user.name,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "X-CSRF-Token": csrfToken 
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch('/api/communities/communities', options);
      const text = await response.text();

      if (!response.ok) {
        console.error('Server response not OK:', text);
        throw new Error('Failed to create department');
      }

      const responseData = text ? JSON.parse(text) : {};
      console.log('Department created:', responseData.data);
      onCreate(responseData.data);
    } catch (error) {
      console.error('Error creating department:', error.message);
    }
  };

  return (
    <section className="flex flex-col py-2.5 bg-white rounded-3xl max-w-[442px]">
      <Header title={title} />
      <div className="flex flex-col items-center px-6 mt-3 w-full">
        <Avatar src={imageSrc} alt={imgAlt} onImageChange={handleImageChange} />
        <input
          type="text"
          placeholder="Community name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          className="self-stretch mt-7 text-2xl font-extrabold text-neutral-800 border border-solid border-neutral-300 rounded-md"
        />
        <UserInfo name={user.name} role={user.role} src={user.src} />
        <input
          type="text"
          placeholder={description}
          value={departmentDescription}
          onChange={(e) => setDepartmentDescription(e.target.value)}
          className="justifycenter itemsstart px-3.5 py-7 mt-4 max-w-full text-base font-semibold whitespace-nowrap text-neutral-500 w-[383px] rounded-md border border-solid border-neutral-300"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="mt-4 w-full text-base font-semibold text-neutral-800 border border-solid border-neutral-300 rounded-md"
        >
          <option value="">Select Type</option>
          <option value="private">Private</option>
          <option value="public">Public</option>
          <option value="all">All</option>
        </select>
        <div className="flex gap-5 justify-between self-end mt-12 text-sm text-center whitespace-nowrap">
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

export default function CreateCommunity({ onCancel, onCreate }) {
  const user = {
    name: "Aisyah binte Musa",
    role: "Admin",
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/336116b2c015d4234b019c5e8ecf65be0d5d967c671f2fbd3512d78d09d2f956?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&"
  };

  return (
    <Card
      title="Create Community"
      imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/6f8e3479de331781a2f10c0ab889344565741f0340528db3a07d68a166a8dee4?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&"
      imgAlt="Departments Logo"
      user={user}
      type="Type"
      description="Description"
      cancelText="Cancel"
      createText="Create"
      onCancel={onCancel}
      onCreate={onCreate}
    />
  );
}
