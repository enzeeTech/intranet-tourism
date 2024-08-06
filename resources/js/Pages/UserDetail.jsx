// import React, { useState, useEffect } from 'react';
// import Example from '@/Layouts/DashboardLayoutNew';
// import PageTitle from '../Components/Reusable/PageTitle';
// import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
// import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
// import { ProfileHeader, ProfileNav } from "@/Components/Profile";
// import { OutputData } from '@/Components/Reusable/WallPosting';
// import { ProfileBio, ProfileIcons, SearchInput, SearchButton, Table } from "@/Components/ProfileTabbar";
// import { ImageProfile, VideoProfile } from '@/Components/ProfileTabbar/Gallery';
// import '../Components/Profile/profile.css';

// function UserDetail({ user }) {
//     console.log("hello", user);
//     const [userData, setUserData] = useState({});
//     const [activeTab, setActiveTab] = useState("bio");
//     const [loading, setLoading] = useState(true);
//     const [polls, setPolls] = useState([]);

//     useEffect(() => {
//         // Fetch user data using user ID (assuming user.id exists in props)
//         fetch(`/api/users/users/${user.id}?with[]=profile&with[]=employmentPost.department&with[]=employmentPost.businessPost&with[]=employmentPost.businessUnit`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//             })
//             .then(({ data }) => {
//                 console.log('Fetched user data:', data);
//                 setUserData(data); // Update state with fetched user data
//             })
//             .catch(error => {
//                 console.error('Error fetching user data:', error);
//             });

//         setLoading(false); // Assuming user data loading is complete
//     }, [user.id]);

//     console.log("UD", userData);

//     return (
//         <Example>
//             <main className="xl:pl-96 w-full">
//                 <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
//                     <div>
//                         <div className="w-full bg-white h-[485px] shadow-custom">
//                             <ProfileHeader
//                                 backgroundImage={userData.backgroundImage ?? 'https://cdn.builder.io/api/v1/image/assets/TEMP/51aef219840e60eadf3805d1bd5616298ec00b2df42d036b6999b052ac398ab5?'}
//                                 // profileImage={userData.profile?.image ?? `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(userData.name)}`}
//                                 name={userData.name}
//                                 username={"@" + userData.username || "N/A"}
//                                 status={userData.status ?? "Online"}
//                                 rounded={true}
//                             />
//                             <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
//                             {activeTab === "activities" && (
//                                 <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center ">
//                                 <OutputData polls={polls} userId={user.id} />
//                                 </div>
//                             )}
//                             {activeTab === "bio" && (
//                                 <>
//                                     <section className="flex flex-col w-full gap-5 px-8 py-4 mt-6 bg-white rounded-lg shadow-custom max-md:flex-wrap max-md:px-5 max-md:max-w-full">
//                                         <div className="flex-auto my-auto max-md:max-w-full">
//                                             <div className="flex gap-5 flex-col md:flex-row max-md:gap-0">
//                                                 <ProfileBio
//                                                     name={userData.name}
//                                                     photo={userData.profilePictureUrl ?? `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(userData.name)}`}
//                                                     username={userData.username || "N/A"}
//                                                     email={userData.email}
//                                                     grade={userData.employment_post?.schema_grade || "N/A"}
//                                                     dateofbirth={userData.profile?.dob || "N/A"}
//                                                     whatsapp={userData.profile?.phone_no || "N/A"}
//                                                 />
//                                                 <ProfileIcons
//                                                     icon1={userData.icon1}
//                                                     icon2={userData.icon2}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </section>
//                                     <div className="separator"></div>
//                                     <section className="flex flex-col w-full gap-5 px-8 py-4 mt-6 bg-white rounded-lg shadow-custom max-md:flex-wrap max-md:px-5 max-md:max-w-full">
//                                         <div className="flex-auto my-auto max-md:max-w-full">
//                                             <div className="flex gap-5 flex-col md:flex-row max-md:gap-0">
//                                                 <ProfileBio
//                                                     department={userData.employment_post?.department?.name || "N/A"}
//                                                     unit={userData.employment_post?.business_unit?.name || "N/A"}
//                                                     jobtitle={userData.employment_post?.title || "N/A"}
//                                                     position={userData.employment_post?.business_post?.title || "N/A"}
//                                                     location={userData.employment_post?.location || "N/A"}
//                                                     phone={`${userData.profile?.work_phone} ${userData.profile?.phone_no}` || "N/A"}
//                                                 />
//                                                 <ProfileIcons
//                                                     icon1={userData.icon1}
//                                                     icon2={userData.icon2}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </section>
//                                 </>
//                             )}
//                             {activeTab === "gallery" && (
//                                 <section>
//                                     <ImageProfile selectedItem="All" userId={user.id} />
//                                     <VideoProfile selectedItem="All" userId={user.id} />
//                                 </section>
//                             )}
//                             {activeTab === "files" && (
//                                 <div>
//                                     <div className="flex gap-4 whitespace-nowrap">
//                                         <SearchInput />
//                                         <SearchButton />
//                                     </div>
//                                     <Table userId={user.id} />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <aside className="fixed bottom-0 left-20 top-16 hidden w-1/4 max-w-sm overflow-y-auto  px-4 py-6 sm:px-6 lg:px-8 xl:block">
//                 <style>
//                 {`
//                     aside::-webkit-scrollbar {
//                         width: 0px !important;
//                         background: transparent !important;
//                     }
//                     aside {
//                         scrollbar-width: none !important; /* For Firefox */
//                         -ms-overflow-style: none;
//                     }
//                 `}
//                 </style>
//                 <div className="file-directory-header">
//                     <PageTitle title="User Profile" />
//                 </div>
//                 <hr className="file-directory-underline" />
//                 <div>
//                     <FeaturedEvents />
//                     <WhosOnline />
//                 </div>
//             </aside>
//         </Example>
//     );
// }

// export default UserDetail;

import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
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
import { useCsrf } from '@/composables';
import { ProfileDepartment } from '@/Components/ProfileTabbar';

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

export default function UserDetail() {
    const csrfToken = useCsrf();
    const { props } = usePage();
    const { user, selectedUserId, authToken } = props; // Ensure authToken is passed via Inertia
    const [polls, setPolls] = useState([]);
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
        employmentPosts: [] // Initialize with an empty array
    });
    const [originalFormData, setOriginalFormData] = useState(formData);
    const [originalPhoto, setOriginalPhoto] = useState(photo);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [isEditingDepartment1, setIsEditingDepartment1] = useState(false);
    const [isEditingDepartment2, setIsEditingDepartment2] = useState(false);
    const [profileData, setProfileData] = useState({
        backgroundImage: "",
        profileImage: "",
        name: "", // Initialize with empty string or placeholder
        username: "",
        status: "Online",
        icon1: "/assets/EditButton.svg",
        icon2: "https://cdn.builder.io/api/v1/image/assets/TEMP/c509bd2e6bfcd3ab7723a08c590219ec47ac648338970902ce5e506f7e419cb7?",
    });
    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetch(`/api/users/users/${user.id}?with[]=profile&with[]=employmentPosts.department&with[]=employmentPosts.businessPost&with[]=employmentPosts.businessUnit`, {
            method: "GET",
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(({ data }) => {
            console.log('hello', data);
            setProfileData(pv => ({
                ...pv, ...data,
                backgroundImage: data.profile && data.profile.cover_photo ? `/storage/${data.profile.cover_photo}` : 'https://cdn.builder.io/api/v1/image/assets/TEMP/51aef219840e60eadf3805d1bd5616298ec00b2df42d036b6999b052ac398ab5?',
                profileImage: data.profile && data.profile.image,
                username: "@" + data.username,
            }));

            // Sort employmentPosts by id in ascending order (oldest first)
            const sortedEmploymentPosts = data.employment_posts.slice().sort((a, b) => a.id - b.id);

            setFormData((pv) => ({
                ...pv,
                name: data.name,
                username: data.username || "N/A",
                email: data.email,
                dateofbirth: data.profile?.dob || "N/A",
                phone: data.profile?.work_phone || "N/A",
                whatsapp: data.profile?.phone_no || "N/A",
                employmentPosts: sortedEmploymentPosts // Store sorted employment posts in formData
            }));

            setOriginalFormData((pv) => ({
                ...pv,
                name: data.name,
                username: data.username || "N/A",
                email: data.email,
                employmentPosts: sortedEmploymentPosts // Store sorted employment posts in originalFormData
            }));
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, [selectedUserId]);

    const openSaveNotification = () => {
        setIsSaveNotificationOpen(true);
    };

    const closeSaveNotification = () => {
        setIsSaveNotificationOpen(false);
        window.location.reload();
    };

    const handleSaveNotification = () => {
        closeSaveNotification();
    };

    const handleFormDataChange = (newData, index) => {
        // Clone the current form data
        const updatedEmploymentPosts = [...formData.employmentPosts];

        // Update the specific employment post by index
        updatedEmploymentPosts[index] = { ...updatedEmploymentPosts[index], ...newData };

        // Update the form data state with the modified employment posts array
        setFormData((prevFormData) => ({
            ...prevFormData,
            employmentPosts: updatedEmploymentPosts,
        }));
    };

    const handlePhotoChange = (newPhoto) => {
        setPhoto(newPhoto);
    };

    const updateUsername = async (newFormData) => {
        const userFormData = new FormData();
        userFormData.append('_method', 'PUT');
        userFormData.append('username', newFormData.username);
        userFormData.append('user_id', user.id); // Add user_id to the form data

        return fetch(`/api/users/users/${user.id}`, {
            method: 'POST',
            body: userFormData,
            headers: {
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '', // Provide an empty string if csrfToken is null
                'Authorization': `Bearer ${authToken}`,
            },
        });
    };

    const handleSaveBio = async (newFormData) => {
        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('email', newFormData.email);
            formData.append('dob', newFormData.dateofbirth);
            formData.append('phone_no', newFormData.whatsapp);
            formData.append('user_id', user.id);
            formData.append('name', newFormData.name);

            const [profileResponse, userResponse] = await Promise.all([
                fetch(`/api/profile/profiles/${profileData.profile?.id}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': csrfToken || '',
                        'Authorization': `Bearer ${authToken}`,
                    },
                }),
                updateUsername(newFormData)
            ]);

            if (profileResponse.ok && userResponse.ok) {
                setOriginalFormData(newFormData);
                setIsEditingBio(false);
                setIsSaveNotificationOpen(true);
                setTimeout(handleSaveNotification, 1200);
            } else {
                console.error('Error updating data:', profileResponseData, userResponseData);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
//---------
    const handleSaveDepartment = async (index) => {
        try {
            const employmentPost = formData.employmentPosts[index];
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('department_id', employmentPost.department_id);
            formData.append('business_unit_id', employmentPost.business_unit_id);
            formData.append('business_post_id', employmentPost.business_post_id);
            formData.append('business_grade_id', employmentPost.business_grade_id);
            formData.append('location', employmentPost.location);
            formData.append('work_phone', employmentPost.work_phone);
            formData.append('user_id', selectedUserId);

            const response = await fetch(`/api/department/employment_posts/${employmentPost.id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                setOriginalFormData(formData);
                setIsSaveNotificationOpen(true);
                setTimeout(handleSaveNotification, 1200);
            } else {
                throw new Error('Error saving department information');
            }
        } catch (error) {
            console.error(`Error updating department information:`, error);
        }
    };

    const handleEditBio = () => setIsEditingBio(true);
    const handleEditDepartment1 = () => setIsEditingDepartment1(true);
    const handleEditDepartment2 = () => setIsEditingDepartment2(true);
    const handleCancelBio = () => setIsEditingBio(false);
    const handleCancelDepartment1 = () => setIsEditingDepartment1(false);
    const handleCancelDepartment2 = () => setIsEditingDepartment2(false);

    return (
        <Example>
            <main className="xl:pl-96 w-full">
                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                    <div>
                        <div className="w-full bg-white h-[485px] shadow-custom rounded-lg">
                            <ProfileHeader
                                backgroundImage={profileData.profile?.cover_photo || ''}
                                profileImage={photo}
                                name={profileData.name}
                                username={profileData.username}
                                status={profileData.status}
                                onEditBanner={() => setIsPopupOpen(true)}
                                rounded={true}
                                userId={selectedUserId}
                                profileId={profileData.profile?.id}
                            />
                            <ProfileNav activeTab="bio" setActiveTab={() => {}} />
                            <section className="flex flex-col w-full gap-2 px-8 py-4 mt-6 bg-white rounded-lg shadow-custom max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                <div className="flex items-center justify-between">
                                    <div className="separator text-xl font-semibold mt-2 pl-4 justify-center">Bio Information</div>
                                    <ProfileIcons
                                        icon1={profileData.icon1}
                                        icon2={profileData.icon2}
                                        onEdit={handleEditBio}
                                        isFirstIcon
                                    />
                                </div>
                                <div className="flex-auto my-auto max-md:max-w-full">
                                    <ProfileBio
                                        photo={photo}
                                        username={formData.username}
                                        email={formData.email}
                                        dateofbirth={formData.dateofbirth}
                                        whatsapp={formData.whatsapp}
                                        isEditing={isEditingBio}
                                        onFormDataChange={setFormData}
                                        onPhotoChange={setPhoto}
                                        originalFormData={originalFormData}
                                        onEditBio={handleEditBio}
                                        onCancelBio={handleCancelBio}
                                        onSaveBio={handleSaveBio}
                                        userId={selectedUserId}
                                    />
                                </div>
                            </section>
                            <div className="separator"></div>
                            {formData.employmentPosts.map((employmentPost, index) => (
                                <section key={index} className="flex flex-col w-full gap-2 px-8 py-4 mt-3 bg-white rounded-lg shadow-custom max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                    <div className="flex items-center justify-between">
                                        <div className="separator text-xl font-semibold mt-2 pl-4 justify-center">{`Department ${index + 1} Information`}</div>
                                        <ProfileIcons
                                            icon1={profileData.icon1}
                                            onEdit={index === 0 ? handleEditDepartment1 : handleEditDepartment2}
                                            isFirstIcon
                                        />
                                    </div>
                                    <ProfileDepartment
                                        department={employmentPost.department?.name || ''}
                                        unit={employmentPost.business_unit?.name || ''}
                                        jobtitle={employmentPost.business_post?.title || ''}
                                        position={employmentPost.title || ''}
                                        grade={employmentPost.business_grade?.code || ''}
                                        location={employmentPost.location || ''}
                                        phone={employmentPost.work_phone || ''}
                                        isEditing={index === 0 ? isEditingDepartment1 : isEditingDepartment2}
                                        onFormDataChange={(newData) => setFormData((prev) => ({
                                            ...prev,
                                            employmentPosts: prev.employmentPosts.map((post, i) =>
                                                i === index ? { ...post, ...newData } : post
                                            ),
                                        }))}
                                        originalFormData={originalFormData}
                                    />
                                    {(index === 0 && isEditingDepartment1) || (index === 1 && isEditingDepartment2) ? (
                                        <div className="flex justify-end mt-4 pb-3">
                                            <button onClick={index === 0 ? handleCancelDepartment1 : handleCancelDepartment2} className="bg-white text-gray-400 border border-gray-400 hover:bg-gray-400 hover:text-white px-4 py-2 rounded-full">Cancel</button>
                                            <button onClick={() => handleSaveDepartment(index)} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full">Save</button>
                                        </div>
                                    ) : null}
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <aside className="fixed bottom-0 left-20 top-16 hidden w-1/4 max-w-sm overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 xl:block">
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
                <SaveNotification title="Changes saved successfully" onClose={handleSaveNotification} />
            )}
            {isPopupOpen && (
                <Popup 
                    title="Edit Banner Photo" 
                    onClose={() => setIsPopupOpen(false)} 
                    onSave={handleSaveBio}
                    profileData={profileData}
                    id={selectedUserId}
                    formData={formData}
                    csrfToken={csrfToken}
                    authToken={authToken}
                    setPhoto={setPhoto}
                />
            )}
        </Example>
    );
}
