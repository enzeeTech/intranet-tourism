import React, { useState, useEffect, useContext } from "react";
import { usePage } from "@inertiajs/react";
import PageTitle from "../Components/Reusable/PageTitle";
import FeaturedEvents from "../Components/Reusable/FeaturedEventsWidget/FeaturedEvents";
import WhosOnline from "../Components/Reusable/WhosOnlineWidget/WhosOnline";
import "./css/StaffDirectory.css";
import { ProfileHeader, ProfileNav, Popup } from "@/Components/Profile";
import {
    ProfileBio,
    ProfileIcons,
    SearchInput,
    SearchButton,
    Table,
} from "@/Components/ProfileTabbar";
import Example from "@/Layouts/DashboardLayoutNew";
import { ImageProfile, VideoProfile } from "@/Components/ProfileTabbar/Gallery";
import {
    ShareYourThoughts,
    Filter,
    OutputData,
} from "@/Components/Reusable/WallPosting";
import "../Components/Profile/profile.css";
import { useCsrf } from "@/composables";
import { ProfileDepartment } from "@/Components/ProfileTabbar";
import { OnlineUsersProvider, OnlineUsersContext } from "./OnlineUsersContext"; // Import the context

function SaveNotification({ title, content, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="rounded-2xl">
                <section className="flex flex-col font-bold text-center bg-green-100 rounded-2xl shadow-custom py-4 px-8">
                    <div className="flex flex-col w-full">
                        <h2 className="text-xl text-green-800">{title}</h2>
                    </div>
                </section>
            </div>
        </div>
    );
}

function UserDetailContent() {
    const csrfToken = useCsrf();
    const { props } = usePage();
    const { user, selectedUserId, authToken } = props; // Ensure authToken is passed via Inertia
    const { onlineUsers } = useContext(OnlineUsersContext); // Access online users from context
    const [polls, setPolls] = useState([]);
    const [activeTab, setActiveTab] = useState("bio");
    const [isSaveNotificationOpen, setIsSaveNotificationOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
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
        photo: "",
        employmentPosts: [], // Initialize with an empty array
    });
    const [originalFormData, setOriginalFormData] = useState(formData);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [isEditingDepartments, setIsEditingDepartments] = useState([
        false,
        false,
    ]);
    const [filterType, setFilterType] = useState(null);
    const [profileData, setProfileData] = useState({
        backgroundImage: "",
        profileImage: "",
        name: "", // Initialize with an empty string or placeholder
        username: "",
        status: onlineUsers.some((onlineUser) => onlineUser.id === user.id)
            ? "Online"
            : "Offline", // Set initial status based on context
        icon1: "/assets/EditButton.svg",
        icon2: "https://cdn.builder.io/api/v1/image/assets/TEMP/c509bd2e6bfcd3ab7723a08c590219ec47ac648338970902ce5e506f7e419cb7?",
    });
    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetch(
            `/api/users/users/${user.id}?with[]=profile&with[]=employmentPosts.department&with[]=employmentPosts.businessPost&with[]=employmentPosts.businessUnit&with[]=employmentPosts.supervisor.user`,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then(({ data }) => {
                setProfileData((pv) => ({
                    ...pv,
                    ...data,
                    backgroundImage:
                        data.profile && data.profile.cover_photo
                            ? `/storage/${data.profile.cover_photo}`
                            : "https://cdn.builder.io/api/v1/image/assets/TEMP/51aef219840e60eadf3805d1bd5616298ec00b2df42d036b6999b052ac398ab5?",
                    profileImage: data.profile?.image || "",
                    // username: "@" + data.username,
                }));
                const sortedEmploymentPosts = data.employment_posts
                    .slice()
                    .sort((a, b) => a.id - b.id);

                setFormData({
                    name: data.name,
                    username: data.username || "N/A",
                    email: data.email,
                    dateofbirth: data.profile?.dob || "", // Use an empty string if no value
                    phone: data.profile?.work_phone || "", // Use an empty string if no value
                    whatsapp: data.profile?.phone_no || "", // Use an empty string if no value
                    photo:
                        data.profile?.staff_image || data.profile?.image || "",
                    employmentPosts: sortedEmploymentPosts,
                });

                console.log(sortedEmploymentPosts);

                setOriginalFormData({
                    name: data.name,
                    username: data.username || "N/A",
                    email: data.email,
                    dateofbirth: data.profile?.dob || "", // Ensure originalFormData is correctly set
                    phone: data.profile?.work_phone || "", // Ensure originalFormData is correctly set
                    whatsapp: data.profile?.phone_no || "", // Ensure originalFormData is correctly set
                    photo:
                        data.profile?.staff_image || data.profile?.image || "",
                    employmentPosts: sortedEmploymentPosts,
                });
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [selectedUserId]);

    useEffect(() => {
        // Update status dynamically when onlineUsers change
        setProfileData((prevData) => ({
            ...prevData,
            status: onlineUsers.some((onlineUser) => onlineUser.id === user.id)
                ? "Online"
                : "Offline",
        }));
    }, [onlineUsers, user.id]);

    // console.log("PDATA", profileData);

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
        console.warn(updatedEmploymentPosts);

        // Update the specific employment post by index
        updatedEmploymentPosts[index] = {
            ...updatedEmploymentPosts[index],
            ...newData,
        };

        // Update the form data state with the modified employment posts array
        setFormData((prevFormData) => ({
            ...prevFormData,
            employmentPosts: updatedEmploymentPosts,
            phone: newData.phone || prevFormData.phone,
        }));
    };

    const handlePhotoChange = (newPhoto) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            photo: newPhoto,
        }));
    };

    const updateUsername = async (newFormData) => {
        const userFormData = new FormData();
        userFormData.append("_method", "PUT");
        userFormData.append("name", newFormData.name);
        userFormData.append("user_id", user.id); // Add user_id to the form data

        return fetch(`/api/users/users/${user.id}`, {
            method: "POST",
            body: userFormData,
            headers: {
                Accept: "application/json",
                "X-CSRF-TOKEN": csrfToken || "", // Provide an empty string if csrfToken is null
                Authorization: `Bearer ${authToken}`,
            },
        });
    };

    const handleSaveBio = async (newFormData) => {
        try {
            const FfData = new FormData();

            // Compulsory fields
            FfData.append("user_id", user.id); // Add user_id to the form data
            FfData.append("_method", "PUT"); // Add _method to the form data

            // Conditional fields
            if (newFormData.email) {
                FfData.append("email", newFormData.email);
            }
            if (newFormData.dateofbirth) {
                FfData.append("dob", newFormData.dateofbirth);
            }
            if (newFormData.whatsapp) {
                FfData.append("phone_no", newFormData.whatsapp);
            }
            if (newFormData.name) {
                FfData.append("name", newFormData.name);
            }

            // Check if photo is a file or a URL
            if (newFormData.photo instanceof File) {
                FfData.append("photo", newFormData.photo);
            } else if (
                newFormData.photo &&
                newFormData.photo.startsWith("data:image")
            ) {
                // Convert base64 to file and append it to FormData
                const blob = await (await fetch(newFormData.photo)).blob();
                FfData.append("staff_image", blob, "profile_image.png");
            }

            const [profileResponse, userResponse] = await Promise.all([
                fetch(`/api/profile/profiles/${profileData.profile?.id}`, {
                    method: "POST",
                    body: FfData,
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrfToken || "",
                        Authorization: `Bearer ${authToken}`,
                    },
                }),
                updateUsername(newFormData),
            ]);

            if (profileResponse.ok && userResponse.ok) {
                setOriginalFormData(newFormData);
                openSaveNotification();
                setTimeout(closeSaveNotification, 1200);
            } else {
                console.error(
                    "Error updating data:",
                    await profileResponse.json(),
                    await userResponse.json()
                );
            }
        } catch (error) {
            console.error("Error updating data:", error);
        }
        window.location.reload();
    };

    const handleSaveDepartment = async (index) => {
        try {
            // Get the employment post for the specified index
            const employmentPost = formData.employmentPosts[index]; // Get the employment_post object by index

            if (!employmentPost || !employmentPost.id) {
                throw new Error(
                    `Employment post ID is not available for department ${
                        index + 1
                    }`
                );
            }

            const FfData = new FormData();
            FfData.append("_method", "PUT"); // Add _method to the form data
            FfData.append("department_id", employmentPost.department_id);
            FfData.append("business_unit_id", employmentPost.business_unit_id);
            FfData.append("business_post_id", employmentPost.business_post_id);
            FfData.append(
                "business_grade_id",
                employmentPost.business_grade_id
            );
            FfData.append("is_hod", employmentPost.is_hod ? 1 : 0);
            FfData.append("is_assistance", employmentPost.is_assistance ? 1 : 0);
            if (employmentPost.report_to)
                FfData.append("report_to", employmentPost.report_to);
            FfData.append("location", employmentPost.location);
            FfData.append("work_phone", employmentPost.work_phone);
            FfData.append("position", employmentPost.position);
            FfData.append("user_id", user.id); // Add user_id to the form data

            const response = await fetch(
                `/api/department/employment_posts/${employmentPost.id}`,
                {
                    method: "POST",
                    body: FfData,
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrfToken || "", // Provide an empty string if csrfToken is null
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            setOriginalFormData(formData);
            setIsEditingDepartments((prev) =>
                prev.map((isEditing, i) => (i === index ? false : isEditing))
            );
            openSaveNotification();
            setTimeout(closeSaveNotification, 1200);
        } catch (error) {
            console.error(
                `Error updating Department ${index + 1} Information:`,
                error
            );
        }
        // window.location.reload();
    };

    const handleCancelBio = () => {
        setFormData(originalFormData);
        setIsEditingBio(false);
    };

    const handleCancelDepartment = (index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            employmentPosts: prevFormData.employmentPosts.map((post, i) =>
                i === index
                    ? {
                          ...post,
                          department:
                              originalFormData.employmentPosts[index]
                                  .department || "N/A",
                          unit:
                              originalFormData.employmentPosts[index].unit ||
                              "N/A",
                          jobtitle:
                              originalFormData.employmentPosts[index]
                                  .jobtitle || "N/A",
                          position:
                              originalFormData.employmentPosts[index]
                                  .position || "N/A",
                          grade:
                              originalFormData.employmentPosts[index].grade ||
                              "N/A",
                          location:
                              originalFormData.employmentPosts[index]
                                  .location || "N/A",
                          phone:
                              originalFormData.employmentPosts[index].phone ||
                              "N/A",
                      }
                    : post
            ),
        }));
        setIsEditingDepartments((prev) =>
            prev.map((isEditing, i) => (i === index ? false : isEditing))
        );
    };

    const handleEditBio = () => {
        setIsEditingBio(true);
    };

    const handleEditDepartment = (index) => {
        setIsEditingDepartments((prev) =>
            prev.map((isEditing, i) => (i === index ? true : isEditing))
        );
    };

    const handleCreatePoll = (pollData) => {
        // Implement the logic to handle poll creation here.
        // console.log("Poll data:", pollData);
        // You can use an API call to save the poll data, update the state, etc.
    };

    // Sort employmentPosts by id in ascending order (oldest id first)
    const sortedEmploymentPosts = formData.employmentPosts
        .slice()
        .sort((a, b) => a.id - b.id);

    // Attribute to tag guest profile
    const tag = "guest";

    const employmentPostTitle =
        profileData.employment_posts?.length > 0
            ? profileData.employment_posts[0].business_post.title
            : "";

    const handleFilterChange = (filter) => {
        setFilterType(filter);
    };

    return (
        <Example>
            <main className="xl:pl-96 w-full">
                <div className="px-1 py-10 sm:px-1 lg:px-8 lg:py-6 sm:mr-0 md:mr-7 lg:mr-9 mr-9">
                    <div>
                        <div className="profile-header w-full bg-white h-[485px] max-md:h-[385px] shadow-custom rounded-lg ml-8">
                            <ProfileHeader
                                backgroundImage={profileData.backgroundImage}
                                profileImage={profileData.profileImage}
                                name={profileData.name}
                                username={profileData.username}
                                status={profileData.status}
                                onEditBanner={() => setIsPopupOpen(true)}
                                rounded={true}
                                userId={user.id}
                                profileId={profileData.profile?.id}
                                tag={tag}
                            />
                            <ProfileNav
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            {activeTab === "activities" && (
                                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center ">
                                    {/* <ShareYourThoughts userId={user.id} postType={'post'} onCreatePoll={handleCreatePoll} /> */}
                                    <Filter
                                        className="mr-10"
                                        onFilterChange={handleFilterChange}
                                    />
                                    <div className="mb-20"></div>
                                    <OutputData
                                        polls={polls}
                                        showUserPosts={true}
                                        userId={user.id}
                                        postType={filterType}
                                    />
                                </div>
                            )}
                            {activeTab === "bio" && (
                                <>
                                    <section className="flex flex-col w-full gap-2 px-8 py-4 mt-6 bg-white rounded-lg shadow-custom max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                        <div className="flex items-center justify-between">
                                            <div className="separator text-xl font-semibold mt-2 pl-4 justify-center">
                                                Bio Information
                                            </div>
                                            <ProfileIcons
                                                icon1={profileData.icon1}
                                                icon2={profileData.icon2}
                                                user_id={profileData.id}
                                                user_name={profileData.name}
                                                user_title={employmentPostTitle}
                                                onEdit={() => handleEditBio()}
                                                isFirstIcon
                                            />
                                        </div>
                                        <div className="flex-auto my-auto max-md:max-w-full">
                                            <div className="flex gap-5 flex-col md:flex-row max-md:gap-0">
                                                <ProfileBio
                                                    formData={formData}
                                                    isEditing={isEditingBio}
                                                    onFormDataChange={
                                                        setFormData
                                                    }
                                                    onPhotoChange={
                                                        handlePhotoChange
                                                    }
                                                    originalFormData={
                                                        originalFormData
                                                    }
                                                    onEditBio={handleEditBio}
                                                    onCancelBio={
                                                        handleCancelBio
                                                    }
                                                    onSaveBio={handleSaveBio}
                                                    userId={user.id} // Pass userId as a prop
                                                />
                                            </div>
                                        </div>
                                    </section>
                                    <div className="separator"></div>
                                    {formData.employmentPosts &&
                                        formData.employmentPosts.length > 0 &&
                                        formData.employmentPosts.map(
                                            (employmentPost, index) => (
                                                <section
                                                    key={index}
                                                    className="flex flex-col w-full gap-2 px-8 py-4 mt-3 bg-white rounded-lg shadow-custom max-md:flex-wrap max-md:px-5 max-md:max-w-full"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="separator text-xl font-semibold mt-2 pl-4 justify-center">{`Department ${
                                                            index + 1
                                                        } Information`}</div>
                                                        <ProfileIcons
                                                            icon1={
                                                                profileData.icon1
                                                            }
                                                            onEdit={() =>
                                                                handleEditDepartment(
                                                                    index
                                                                )
                                                            }
                                                            isFirstIcon
                                                        />
                                                    </div>
                                                    <div className="flex-auto my-auto max-md:max-w-full">
                                                        <div className="flex gap-5 flex-col md:flex-row max-md:gap-0">
                                                            <ProfileDepartment
                                                                department={
                                                                    employmentPost
                                                                        .department
                                                                        ?.name ||
                                                                    ""
                                                                }
                                                                departmentId={
                                                                    employmentPost.department_id
                                                                }
                                                                unit={
                                                                    employmentPost
                                                                        .business_unit
                                                                        ?.name ||
                                                                    ""
                                                                }
                                                                jobtitle={
                                                                    employmentPost
                                                                        .business_post
                                                                        ?.title ||
                                                                    ""
                                                                }
                                                                position={
                                                                    employmentPost.position ||
                                                                    "N/A"
                                                                }
                                                                grade={
                                                                    employmentPost
                                                                        .business_grade
                                                                        ?.code ||
                                                                    ""
                                                                }
                                                                is_hod={
                                                                    employmentPost.is_hod
                                                                }
                                                                is_assistance={
                                                                    employmentPost.is_assistance
                                                                }
                                                                report_to={
                                                                    employmentPost
                                                                        .supervisor
                                                                        ?.user
                                                                        ?.name ||
                                                                    "N/A"
                                                                }
                                                                location={
                                                                    employmentPost.location ||
                                                                    "N/A"
                                                                }
                                                                phone={
                                                                    employmentPost.work_phone ||
                                                                    "N/A"
                                                                }
                                                                isEditing={
                                                                    isEditingDepartments[
                                                                        index
                                                                    ]
                                                                }
                                                                onFormDataChange={(
                                                                    newData
                                                                ) =>
                                                                    handleFormDataChange(
                                                                        newData,
                                                                        index
                                                                    )
                                                                }
                                                                originalFormData={
                                                                    originalFormData
                                                                }
                                                            />
                                                        </div>
                                                        {isEditingDepartments[
                                                            index
                                                        ] && (
                                                            <div className="flex justify-end mt-4 pb-3">
                                                                <button
                                                                    onClick={() =>
                                                                        handleCancelDepartment(
                                                                            index
                                                                        )
                                                                    }
                                                                    className="bg-white text-gray-400 border border-gray-400 hover:bg-gray-400 hover:text-white px-4 py-2 rounded-full"
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleSaveDepartment(
                                                                            index
                                                                        )
                                                                    }
                                                                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
                                                                >
                                                                    Save
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </section>
                                            )
                                        )}
                                </>
                            )}

                            {activeTab === "gallery" && (
                                <section>
                                    <ImageProfile
                                        selectedItem="All"
                                        userId={user.id}
                                    />
                                    <VideoProfile
                                        selectedItem="All"
                                        userId={user.id}
                                    />
                                </section>
                            )}
                            {activeTab === "files" && (
                                <div>
                                    <div className="flex gap-4 whitespace-nowrap">
                                        <SearchInput />
                                        <SearchButton />
                                    </div>
                                    <Table userId={user.id} />
                                </div>
                            )}
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
                    {/* <WhosOnline /> */}
                </div>
            </aside>
            {isSaveNotificationOpen && (
                <SaveNotification
                    title="Changes saved successfully"
                    onClose={closeSaveNotification}
                />
            )}
            {isPopupOpen && (
                <Popup
                    title="Edit Banner Photo"
                    onClose={() => setIsPopupOpen(false)}
                    onSave={handleSaveBio}
                    profileData={profileData}
                    id={user.id}
                    formData={formData}
                    csrfToken={csrfToken}
                    authToken={authToken}
                    setFormData={setFormData}
                />
            )}
        </Example>
    );
}

export default function UserDetail() {
    return (
        <OnlineUsersProvider>
            <UserDetailContent />
        </OnlineUsersProvider>
    );
}
