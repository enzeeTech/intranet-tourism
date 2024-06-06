import React, { useState } from 'react';
import { Fragment } from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import './css/StaffDirectory.css';
import { ProfileHeader, ProfileNav, Popup } from "@/Components/Profile";
import { ProfileBio, ProfileGallery, ProfileIcons, SearchInput, SearchButton, Table } from "@/Components/ProfileTabbar";
import Example from '@/Layouts/DashboardLayoutNew';

function SaveNotification({ title, content, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="p-2 rounded-3xl w-4xl">
                <section className="flex flex-col px-2.5 pt-16 font-bold text-center bg-white rounded-xl shadow-custom w-[380px] h-[165px]">
                    <div className="flex flex-col w-full">
                        <h2 className="text-xl text-neutral-800">{title}</h2>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default function MyComponent() {
    const [activeTab, setActiveTab] = useState("bio");
    const [isSaveNotificationOpen, setIsSaveNotificationOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [photo, setPhoto] = useState("https://cdn.builder.io/api/v1/image/assets/TEMP/e2529a8d6493a4752f7510057ac1d7c1f0535b2b08af30702ea115fd3e80f513?apiKey=285d536833cc4168a8fbec258311d77b&");
    const [formData, setFormData] = useState({
        email: "aisyahbintemusa@tourism.gov.my",
        department: "Pejabat Timbalan Ketua Pengarah (Promosi)",
        position: "Tetap",
        grade: "N11",
        location: "Tingkat 18",
        phone: "+03 8891 8094",
        whatsapp: "+6014 971 8736",
    });
    const [originalFormData, setOriginalFormData] = useState(formData);
    const [originalPhoto, setOriginalPhoto] = useState(photo);
    const [isEditing, setIsEditing] = useState(false);

    const profileData = {
        backgroundImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/51aef219840e60eadf3805d1bd5616298ec00b2df42d036b6999b052ac398ab5?",
        profileImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/b68c042fe15637d83658e190705206009d4017b640a612fd4286280043e4c258?",
        name: "Aisyah binte Musa",
        status: "Online",
        icon1: "https://cdn.builder.io/api/v1/image/assets/TEMP/a0d746200134b6c0b2b351a65359ead31f7593bfb6991980b20df113b691a7de?",
        icon2: "https://cdn.builder.io/api/v1/image/assets/TEMP/c509bd2e6bfcd3ab7723a08c590219ec47ac648338970902ce5e506f7e419cb7?",
    };

    const photoData = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/19dbe4d9d7098d561e725a31b63856fbbf81097ff193f1e5b04be40ccd3fe081?", alt: "Photo 1" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ff48e71a83368a201973d09bb65d5bec5cda3d234d40d8216049d60b55179fe1?", alt: "Photo 2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fc01566f85a165f9e8c89da57eaa7e81212a8fa1e58ed53877c900bf64c5baf1?", alt: "Photo 3" },
    ];

    const videoData = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbaca5c344dcb79e33b324a787c8c2119e2929aebc1bda0bf551ae62ef74fc?", alt: "Video 1" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ff48e71a83368a201973d09bb65d5bec5cda3d234d40d8216049d60b55179fe1?", alt: "Video 2" },
    ];

    const openSaveNotification = () => {
        setIsSaveNotificationOpen(true);
    };

    const closeSaveNotification = () => {
        setIsSaveNotificationOpen(false);
    };

    const handleSaveNotification = () => {
        closeSaveNotification();
    };

    const handleFormDataChange = (newData) => {
        setFormData(newData);
    };

    const handlePhotoChange = (newPhoto) => {
        setPhoto(newPhoto);
    };

    const handleSave = () => {
        setOriginalFormData(formData);
        setOriginalPhoto(photo);
        setIsEditing(false);
        openSaveNotification();
        setTimeout(closeSaveNotification, 1200);
    };

    const handleCancel = () => {
        setFormData(originalFormData);
        setPhoto(originalPhoto);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <Example>
    <main className="xl:pl-96 w-full">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <div>
            <div className="w-full bg-white h-[485px] shadow-custom">
                        <ProfileHeader
                            backgroundImage={profileData.backgroundImage}
                            profileImage={profileData.profileImage}
                            name={profileData.name}
                            status={profileData.status}
                            onEditBanner={() => setIsPopupOpen(true)}
                        />
                        <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
                        {activeTab === "bio" && (
                            <section className="flex flex-col w-full gap-5 px-8 py-4 mt-6 bg-white rounded-lg shadow-custom max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                <div className="flex-auto my-auto max-md:max-w-full">
                                    <div className="flex gap-5 flex-col md:flex-row max-md:gap-0">
                                        <ProfileBio
                                            photo={photo}
                                            email={formData.email}
                                            department={formData.department}
                                            position={formData.position}
                                            grade={formData.grade}
                                            location={formData.location}
                                            phone={formData.phone}
                                            whatsapp={formData.whatsapp}
                                            isEditing={isEditing}
                                            onFormDataChange={handleFormDataChange}
                                            onPhotoChange={handlePhotoChange}
                                        />
                                        <ProfileIcons
                                            icon1={profileData.icon1}
                                            icon2={profileData.icon2}
                                            onEdit={handleEdit}
                                        />
                                    </div>
                                    {isEditing && (
                                        <div className="flex justify-end mt-4">
                                            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                                            <button onClick={handleCancel} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}
                        {activeTab === "gallery" && (
                            <ProfileGallery photoData={photoData} videoData={videoData} />
                        )}
                        {activeTab === "files" && (
                            <div>
                                <div className="flex gap-4 whitespace-nowrap">
                                    <SearchInput />
                                    <SearchButton />
                                </div>
                                <Table />
                            </div>
                        )}
                    </div>
                    </div>
                    </div>
                    </main>
                    <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
                            <div className="file-directory-header">
                                <PageTitle title="My Profile" />
                            </div>
                        <hr className="file-directory-underline" />

                        <div>
                            <FeaturedEvents />
                            <WhosOnline />
                        </div>
                    </aside>
    </Example>


                    

    );
}