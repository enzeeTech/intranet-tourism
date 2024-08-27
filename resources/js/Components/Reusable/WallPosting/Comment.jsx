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
      <div className="bg-white rounded-2xl shadow-lg w-[700px] mx-2">
        <div className="px-4 py-2 border-b">
            <div className="mb-2 mt-2 flex justify-end">
              <img src="/assets/cancel.svg" alt="Close icon" className="w-6 h-6" onClick={onClose}/>
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
                className="w-[53px] rounded-full"
              />
              <div className="ml-3">
                <div className="text-lg font-semibold">{post.user.name}</div>
                <time className="text-sm text-gray-500">{formatTimeAgo(post.created_at)}</time>
              </div>
            </header>
            <div className="mt-4">
              <p className="text-lg mb-4">{post.content}</p>
              <PostAttachments attachments={post.attachments} />
            </div>
          </div>
        </div>
        {/* Comment Section */}
        
        <div className="py-4 border-t flex flex-row justify-between items-start w-full">
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
                className="w-[53px] rounded-full mx-4"
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
