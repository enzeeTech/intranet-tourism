import React, { useState, useEffect } from 'react';
import Example from '@/Layouts/DashboardLayoutNew';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import { ProfileHeader, ProfileNav } from "@/Components/Profile";
import { OutputData } from '@/Components/Reusable/WallPosting';
import { ProfileBio, ProfileIcons, SearchInput, SearchButton, Table } from "@/Components/ProfileTabbar";
import { ImageProfile, VideoProfile } from '@/Components/ProfileTabbar/Gallery';
import '../Components/Profile/profile.css';

function UserDetail({ user }) {
    console.log("hello", user);
    const [userData, setUserData] = useState({});
    const [activeTab, setActiveTab] = useState("bio");
    const [loading, setLoading] = useState(true);
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        // Fetch user data using user ID (assuming user.id exists in props)
        fetch(`/api/crud/users/${user.id}?with[]=profile&with[]=employmentPost.department&with[]=employmentPost.businessPost&with[]=employmentPost.businessUnit`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(({ data }) => {
                console.log('Fetched user data:', data);
                setUserData(data); // Update state with fetched user data
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

        setLoading(false); // Assuming user data loading is complete
    }, [user.id]);

    console.log("UD", userData);

    return (
        <Example>
            <main className="xl:pl-96 w-full">
                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                    <div>
                        <div className="w-full bg-white h-[485px] shadow-custom">
                            <ProfileHeader
                                backgroundImage={userData.backgroundImage ?? 'https://cdn.builder.io/api/v1/image/assets/TEMP/51aef219840e60eadf3805d1bd5616298ec00b2df42d036b6999b052ac398ab5?'}
                                // profileImage={userData.profile?.image ?? `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(userData.name)}`}
                                name={userData.name}
                                username={"@" + userData.username || "N/A"}
                                status={userData.status ?? "Online"}
                                rounded={true}
                            />
                            <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
                            {activeTab === "activities" && (
                                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center ">
                                <OutputData polls={polls} userId={user.id} />
                                </div>
                            )}
                            {activeTab === "bio" && (
                                <>
                                    <section className="flex flex-col w-full gap-5 px-8 py-4 mt-6 bg-white rounded-lg shadow-custom max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                        <div className="flex-auto my-auto max-md:max-w-full">
                                            <div className="flex gap-5 flex-col md:flex-row max-md:gap-0">
                                                <ProfileBio
                                                    name={userData.name}
                                                    photo={userData.profilePictureUrl ?? `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(userData.name)}`}
                                                    username={userData.username || "N/A"}
                                                    email={userData.email}
                                                    grade={userData.employment_post?.schema_grade || "N/A"}
                                                    dateofbirth={userData.profile?.dob || "N/A"}
                                                    whatsapp={userData.profile?.phone_no || "N/A"}
                                                />
                                                <ProfileIcons
                                                    icon1={userData.icon1}
                                                    icon2={userData.icon2}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                    <div className="separator"></div>
                                    <section className="flex flex-col w-full gap-5 px-8 py-4 mt-6 bg-white rounded-lg shadow-custom max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                        <div className="flex-auto my-auto max-md:max-w-full">
                                            <div className="flex gap-5 flex-col md:flex-row max-md:gap-0">
                                                <ProfileBio
                                                    department={userData.employment_post?.department?.name || "N/A"}
                                                    unit={userData.employment_post?.business_unit?.name || "N/A"}
                                                    jobtitle={userData.employment_post?.title || "N/A"}
                                                    position={userData.employment_post?.business_post?.title || "N/A"}
                                                    location={userData.employment_post?.location || "N/A"}
                                                    phone={`${userData.profile?.work_phone} ${userData.profile?.phone_no}` || "N/A"}
                                                />
                                                <ProfileIcons
                                                    icon1={userData.icon1}
                                                    icon2={userData.icon2}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </>
                            )}
                            {activeTab === "gallery" && (
                                <section>
                                    <ImageProfile selectedItem="All" userId={user.id} />
                                    <VideoProfile selectedItem="All" userId={user.id} />
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
            <aside className="fixed bottom-0 left-20 top-16 hidden w-1/4 max-w-sm overflow-y-auto  px-4 py-6 sm:px-6 lg:px-8 xl:block">
                <style>
                {`
                    aside::-webkit-scrollbar {
                        width: 0px !important;
                        background: transparent !important;
                    }
                    aside {
                        scrollbar-width: none !important; /* For Firefox */
                        -ms-overflow-style: none;
                    }
                `}
                </style>
                <div className="file-directory-header">
                    <PageTitle title="User Profile" />
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

export default UserDetail;