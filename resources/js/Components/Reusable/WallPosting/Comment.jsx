// CommentPopup.js

import React, { useState, useEffect } from 'react';
import PostAttachments from './PostAttachments';
import { ShareYourThoughts, OutputData } from '@/Components/Reusable/WallPosting';
import { formatDistanceToNow } from 'date-fns';
import { usePage } from '@inertiajs/react';



const Comment = ({ post, onClose }) => {
  const { id } = usePage().props; // Retrieve the user_id from the Inertia view
  const [polls, setPolls] = useState([]);
  const [profileData, setProfileData] = useState({
    name: "",
    profileImage: "",
  })

  useEffect(() => {
    fetch(`/api/users/users/${id}?with[]=profile&with[]=employmentPosts.department&with[]=employmentPosts.businessPost&with[]=employmentPosts.businessUnit`, {
        method: "GET",
    })
    .then((response) => response.json())
    .then(({ data }) => {
        setProfileData(pv => ({
            ...pv, ...data,
            name: data.name,
            profileImage: data.profile?.image || '',
        }));
    })
    .catch((error) => {
        console.error("Error fetching user data:", error);
    });
  }, [id]);

  console.log("DATA KE?", profileData);
  

    
  const formatTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[700px] mx-2">
        <div className="p-4 border-b">
            <div className="mb-4 -mt-2 flex justify-end">
                <button onClick={onClose} className="text-blue-500">X</button>
            </div>
          {/* Post Content */}
          <div className="mb-4">
            <header className="flex items-center">
              <img
                src={
                    post.userProfile.profile?.image 
                        ? (
                            post.userProfile.profile.image === '/assets/dummyStaffPlaceHolder.jpg'
                                ? post.userProfile.profile.image
                                : post.userProfile.profile.image.startsWith('avatar/')
                                    ? `/storage/${post.userProfile.profile.image}`
                                    : `/avatar/${post.userProfile.profile.image}`
                        )
                        : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(post.user.name)}&rounded=true`
                }
                alt={post.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <div className="text-sm font-semibold">{post.user.name}</div>
                <time className="text-xs text-gray-500">{formatTimeAgo(post.created_at)}</time>
              </div>
            </header>
            <div className="mt-4">
              <p className="text-sm">{post.content}</p>
              <PostAttachments attachments={post.attachments} />
            </div>
          </div>
        </div>
        {/* Comment Section */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {/* Render comments here */}
            <div className="space-y-4">
                {/* Example comment */}
                {/* <div className="flex items-start">
                    <img
                        src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Commenter&rounded=true"
                        alt="Commenter"
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="ml-3 bg-gray-100 p-2 rounded-lg w-full">
                        <div className="text-sm">
                        <span className="font-semibold">Commenter Name</span>
                        <span className="ml-2 text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm mt-1">This is a sample comment.</p>
                    </div>
                </div> */}
              <OutputData loggedInUserId={id} polls={polls} filterType={null} />

            </div>
        </div>
        <div className="pt-4 pb-4 border-t flex justify-start">
            <img
                src={
                profileData.profileImage 
                    ? (
                        profileData.profileImage === '/assets/dummyStaffPlaceHolder.jpg'
                        ? profileData.profileImage
                        : profileData.profileImage.startsWith('avatar/')
                            ? `/storage/${profileData.profileImage}`
                            : `/avatar/${profileData.profileImage}`
                    )
                    : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(profileData.name)}&rounded=true`
                } 
                alt={profileData.name}
                className="w-12 h-12 rounded-full mr-4 ml-3 mb-20"
            />
            <ShareYourThoughts
                variant="comment"
            />
        </div>

      </div>
    </div>
  );
};

export default Comment;
