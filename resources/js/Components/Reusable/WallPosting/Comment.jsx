import React, { useState, useEffect } from 'react';
import PostAttachments from './PostAttachments';
import { ShareYourThoughts } from '@/Components/Reusable/WallPosting';
import { formatDistanceToNow } from 'date-fns';
import { usePage } from '@inertiajs/react';
import { useCsrf } from "@/composables";


const Comment = ({ post, onClose }) => {

  console.log("POST", post);
  
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  const csrfToken = useCsrf();
  const { id } = usePage().props; // Retrieve the user_id from the Inertia view
  const [comments, setComments] = useState([]);
  const [commentedUsers, setCommentedUsers] = useState({});
  const [profileData, setProfileData] = useState({
    name: "",
    profileImage: "",
  });

  const fetchComments = () => {
    fetch(`/api/posts/posts/${post.id}?with[]=comments`, {
      method: "GET",
    })
    .then((response) => response.json())
    .then(({ data }) => {
      setComments(data.comments); // Use the comments array from the response
    })
    .catch((error) => {
      console.log("Error fetching comments: ", error);
    });
  };

  useEffect(() => {
    fetchComments();
  }, [post.id]);

  useEffect(() => {
    fetch(`/api/users/users/${id}?with[]=profile`, {
      method: "GET",
    })
    .then((response) => response.json())
    .then(({ data }) => {
      setProfileData({
        name: data.name,
        profileImage: data.profile?.image || '',
      });
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, [id]);

  useEffect(() => {
    // Fetch user data for each unique user_id in the comments array
    const uniqueUserIds = [...new Set(comments.map(comment => comment.user_id))];
    
    uniqueUserIds.forEach(user_id => {
      if (user_id) {
        fetch(`/api/users/users/${user_id}?with[]=profile`, {
          method: "GET",
        })
        .then((response) => response.json())
        .then(({ data }) => {
          setCommentedUsers(prevState => ({
            ...prevState,
            [user_id]: {
              name: data.name,
              profileImage: data.profile?.image || '',
            }
          }));
        })
        .catch((error) => {
          console.error(`Error fetching user data for user_id ${user_id}:`, error);
        });
      }
    });
  }, [comments]);

  const formatTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const handleClickTreeDots = (commentId) => {
    setIsCommentPopupOpen((prevState) => (prevState === commentId ? null : commentId));
  };

  const confirmDelete = (commentId) => {
    setCommentIdToDelete(commentId);
    setShowDeletePopup(true);
  };

  const handleDelete = async () => {
    try {
      // Now delete the post
      const postResponse = await fetch(`/api/posts/post_comment/${commentIdToDelete}`, {
        method: 'DELETE',
        headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
      });
  
      if (postResponse.ok) {
        // setPostData(postData.filter(post => post.id !== commentIdToDelete));
        console.log("SETTLEE");
        fetchComments();
      } else {
        console.error(`Failed to delete post with ID ${commentIdToDelete}.`);
      }
    } catch (error) {
      console.error(`Error deleting post with ID ${commentIdToDelete}:`, error);
    } finally {
      setShowDeletePopup(false);
      setIsCommentPopupOpen(false);
    }
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
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3">
                <div className="text-md font-semibold">{post.user.name}</div>
                <time className="text-xs text-gray-500">{formatTimeAgo(post.created_at)}</time>
              </div>
            </header>
            <div className="mt-4">
              <p className="text-md">{post.content}</p>
              <PostAttachments attachments={post.attachments} />
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {comments.map((comment) => {
              const user = commentedUsers[comment.user_id] || {};
              // console.log("HAHAHA", comment.pivot.id);
              
              return (
                <div key={comment.id} className="relative flex items-start">
                  <img
                    src={
                      user.profileImage 
                        ? (
                            user.profileImage === '/assets/dummyStaffPlaceHolder.jpg'
                              ? user.profileImage
                              : user.profileImage.startsWith('avatar/')
                                ? `/storage/${user.profileImage}`
                                : `/avatar/${user.profileImage}`
                          )
                        : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(user.name || 'Commenter')}&rounded=true`
                    }
                    alt={user.name || 'Commenter'}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="relative ml-3 bg-gray-100 p-2 rounded-lg w-full">
                    <div className="flex text-sm">
                      <span className="font-semibold">{user.name || 'Commenter'}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        {formatTimeAgo(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                    <img 
                      loading="lazy" 
                      src="/assets/wallpost-dotbutton.svg" 
                      alt="Options" 
                      className="absolute top-1 right-1 w-6 h-6 cursor-pointer" 
                      onClick={() => handleClickTreeDots(comment.id)} 
                    />
                  </div>
                  {isCommentPopupOpen === comment.id && (
                    <div
                      className="absolute bg-white border-2 rounded-xl p-1 shadow-lg w-[160px] h-auto z-10 right-0 top-full -mt-10"
                    >
                      <p 
                        className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" 
                        onClick={() => confirmDelete(comment.pivot.id)}
                      >
                        <img className="w-6 h-6" src="/assets/DeleteIcon.svg" alt="Delete" />
                        Delete
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
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
                className="w-12 h-12 rounded-full mx-4"
            />
            <ShareYourThoughts
                variant="comment"
                postedId={post.id}
            />
        </div>
      </div>
      {showDeletePopup && (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)',
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '400px',
            }}
        >
            <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: 'larger', borderRadius: '24px',}}>
                <h2>Delete Post?</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <button
                    onClick={handleDelete}
                    style={{
                        backgroundColor: '#E53935',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        width: '80px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        marginRight: '10px',
                    }}
                >
                    Yes
                </button>
                <button
                    style={{
                        backgroundColor: 'white',
                        color: '#333',
                        border: '1px solid #ccc',
                        borderRadius: '25px',
                        width: '80px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                    }}
                >
                    No
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
