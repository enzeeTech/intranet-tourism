import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react'; // Make sure you are importing from the correct Inertia package
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import './css/StaffDirectory.css';
import { ProfileHeader, ProfileNav, Popup } from "@/Components/Profile";
import { ProfileBio, ProfileIcons, SearchInput, SearchButton, Table } from "@/Components/ProfileTabbar";
import Example from '@/Layouts/DashboardLayoutNew';
import { ImageProfile, VideoProfile } from '@/Components/ProfileTabbar/Gallery';
import { ShareYourThoughts, Filter, OutputData } from '@/Components/Reusable/WallPosting';
import '../Components/Profile/profile.css';

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

export default function Profile() {
    const [polls, setPolls] = useState([]);

    const handleCreatePoll = (poll) => {
      setPolls((prevPolls) => [...prevPolls, poll]);
    };
    const [activeTab, setActiveTab] = useState("bio");
    const [isSaveNotificationOpen, setIsSaveNotificationOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [photo, setPhoto] = useState("https://cdn.builder.io/api/v1/image/assets/TEMP/e2529a8d6493a4752f7510057ac1d7c1f0535b2b08af30702ea115fd3e80f513?apiKey=285d536833cc4168a8fbec258311d77b&");
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        department: "",
        unit: "",
        jobtitle: "",
        position: "",
        grade: "",
        location: "",
        phone: "",
        dateofbirth: "",
        whatsapp: "",
    });
    const [originalFormData, setOriginalFormData] = useState(formData);
    const [originalPhoto, setOriginalPhoto] = useState(photo);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        backgroundImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/51aef219840e60eadf3805d1bd5616298ec00b2df42d036b6999b052ac398ab5?",
        profileImage: "",
        name: "", // Initialize with empty string or placeholder
        username: "",
        status: "Online",
        icon1: "https://cdn.builder.io/api/v1/image/assets/TEMP/a0d746200134b6c0b2b351a65359ead31f7593bfb6991980b20df113b691a7de?",
        icon2: "https://cdn.builder.io/api/v1/image/assets/TEMP/c509bd2e6bfcd3ab7723a08c590219ec47ac648338970902ce5e506f7e419cb7?",
    });

    const { props } = usePage();
    const { id } = props; // Access the user ID from props
    const [userData, setUserData] = useState({});

    useEffect(() => {
        console.log("Fetching user data...");
        fetch(`/api/crud/users/${id}?with[]=profile&with[]=employmentPost.department&with[]=employmentPost.businessPost&with[]=employmentPost.businessUnit`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(({ data }) => {
                console.log('data', data);
                setProfileData(pv => ({
                    ...pv, ...data,
                    profileImage: data.profile && data.profile.image ? data.profile.image : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${data.name}`,
                    username: "@" + data.username,
                }));

                setFormData((pv) => ({
                    ...pv,
                    name: data.name,
                    username: data.username || "N/A",
                    email: data.email,
                    department: data.employment_post?.department?.name || "N/A",
                    unit: data.employment_post?.business_unit?.name || "N/A",
                    jobtitle: data.employment_post?.title || "N/A",
                    position: data.employment_post?.business_post?.title || "N/A",
                    grade: data.employment_post?.schema_grade || "N/A",
                    location: data.employment_post?.location || "N/A",
                    dateofbirth: data.profile?.dob || "N/A",
                    phone: data.profile?.work_phone || "N/A",
                    whatsapp: data.profile?.phone_no || "N/A",
                }));
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [id]);

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

    const handleSelectMedia = (selectedMedia) => {
        console.log("Selected Media:", selectedMedia);
        // Handle media selection logic here
    };


    return (
        <Example>
            <main className="xl:pl-96 w-full">
                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                    <div>
                        <div className="w-full bg-white h-[485px] shadow-custom">
                            <ProfileHeader
                                backgroundImage={profileData.backgroundImage}
                                profileImage={profileData.profileImage ?? 'https://cdn.builder.io/api/v1/image/assets/TEMP/19dbe4d9d7098d561e725a31b63856fbbf81097ff193f1e5b04be40ccd3fe081?'}
                                name={profileData.name}
                                username={profileData.username}
                                status={profileData.status}
                                onEditBanner={() => setIsPopupOpen(true)}
                                rounded={true}
                                userId={id}
                            />
                            <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
                            {activeTab === "activities" && (
                                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center ">
                                    <ShareYourThoughts userId={id} postType={'post'} onCreatePoll={handleCreatePoll} />
                                    <Filter className="mr-10" />
                                    <div className="mb-20"></div>
                                    <OutputData polls={polls} showUserPosts={true} userId={id} />
                                </div>
                            )}
                            {activeTab === "bio" && (
                                <section className="flex flex-col w-full gap-5 px-8 py-4 mt-6 bg-white rounded-lg shadow-custom max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                    <div className="flex-auto my-auto max-md:max-w-full">
                                        <div className="flex gap-5 flex-col md:flex-row max-md:gap-0">
                                            <ProfileBio
                                                name={formData.name} // Add name field
                                                photo={profileData.profileImage}
                                                username={formData.username}
                                                email={formData.email}
                                                department={formData.department}
                                                unit={formData.unit}
                                                jobtitle={formData.jobtitle}
                                                position={formData.position}
                                                grade={formData.grade}
                                                location={formData.location}
                                                phone={formData.phone}
                                                dateofbirth={formData.dateofbirth}
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
                                <section>
                                    <ImageProfile selectedItem="All" userId={id} />
                                    <VideoProfile selectedItem="All" userId={id} />
                                </section>
                            )}
                            {activeTab === "files" && (
                                <div>
                                    <div className="flex gap-4 whitespace-nowrap">
                                        <SearchInput />
                                        <SearchButton />
                                    </div>
                                    <Table userId={id} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <aside className="fixed bottom-0 left-20 top-16 hidden w-1/4 max-w-sm overflow-y-auto  px-4 py-6 sm:px-6 lg:px-8 xl:block">
                <style>
                {`
                    aside::-webkit-scrollbar {
                    width: 0px !important;
                    background: transparent !important;
                    }
                    aside {
                    scrollbar-width: none !important; /* For Firefox */
                    -ms-overflow-style: none;  /* IE and Edge */
                    }
                `}
                </style>
                <div className="file-directory-header">
                    <PageTitle title="My Profile" />
                </div>
                <hr className="file-directory-underline" />
                <div>
                    <FeaturedEvents />
                    <WhosOnline />
                </div>
            </aside>
            {isSaveNotificationOpen && (
                <SaveNotification title="Changes saved successfully" onClose={closeSaveNotification} />
            )}
            {isPopupOpen && (
                <Popup title="Edit Banner" onClose={() => setIsPopupOpen(false)} />
            )}
        </Example>
    );
}
