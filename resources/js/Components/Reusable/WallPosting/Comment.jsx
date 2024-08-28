import React, { useState, useEffect } from 'react';
import PostAttachments from './PostAttachments';
import { ShareYourThoughts } from '@/Components/Reusable/WallPosting';
import { formatDistanceToNow } from 'date-fns';
import { usePage } from '@inertiajs/react';
import { useCsrf } from "@/composables";
import LikesPopup from './LikesPopup';



const Comment = ({ post, onClose, loggedInUserId }) => {

  // console.log("POST", loggedInUserId);
  
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  const csrfToken = useCsrf();
  const { id } = usePage().props; // Retrieve the user_id from the Inertia view
  const [comments, setComments] = useState([]);
  const [commentedUsers, setCommentedUsers] = useState({});
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [showLikesPopup, setShowLikesPopup] = useState(false);
  const [likedUsers, setLikedUsers] = useState({});
  const [profileData, setProfileData] = useState({
    name: "",
    profileImage: "",
  });

  // const fetchComments = () => {
  //   fetch(`/api/posts/posts/${post.id}?with[]=comments`, {
  //     method: "GET",
  //   })
  //   .then((response) => response.json())
  //   .then(({ data }) => {
  //     setComments(data.comments); // Use the comments array from the response
  //   })
  //   .catch((error) => {
  //     console.log("Error fetching comments: ", error);
  //   });
  // };

  const fetchComments = () => {
    fetch(`/api/posts/posts/${post.id}?with[]=comments`, {
      method: "GET",
    })
    .then((response) => response.json())
    .then(({ data }) => {
      const sortedComments = data.comments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setComments(sortedComments); // Set the sorted comments

      sortedComments.forEach(comment => fetchLikedUsers(comment));
    })
    .catch((error) => {
      console.log("Error fetching comments: ", error);
    });
  };


  // const fetchLikedUsers = (comment) => {
  //   if (Array.isArray(comment.likes)) {
  //     const uniqueUserIds = [...new Set(comment.likes)];

  //     uniqueUserIds.forEach(user_id => {
  //       if (user_id) {
  //         fetch(`/api/users/users/${user_id}?with[]=profile`, {
  //           method: "GET",
  //         })
  //         .then((response) => response.json())
  //         .then(({ data }) => {
  //           setLikedUsers(prevState => ({
  //             ...prevState,
  //             [comment.id]: {
  //               ...prevState[comment.id],
  //               [user_id]: data.name,
  //             }
  //           }));
  //         })
  //         .catch((error) => {
  //           console.error(`Error fetching user data for user_id ${user_id}:`, error);
  //         });
  //       }
  //     });
  //   }
  // };

  const fetchLikedUsers = (comment) => {
    if (Array.isArray(comment.likes)) {
      const uniqueUserIds = [...new Set(comment.likes)];
  
      uniqueUserIds.forEach(user_id => {
        if (user_id) {
          fetch(`/api/users/users/${user_id}?with[]=profile`, {
            method: "GET",
          })
          .then((response) => response.json())
          .then(({ data }) => {
            setLikedUsers(prevState => ({
              ...prevState,
              [comment.id]: {
                ...prevState[comment.id],
                [user_id]: {
                  name: data.name,
                  image: data.profile?.image, // Assuming `data.profile.image` contains the image URL
                }
              }
            }));
          })
          .catch((error) => {
            console.error(`Error fetching user data for user_id ${user_id}:`, error);
          });
        }
      });
    }
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
  

      // Function to handle liking a post
      const handleLike = async (postId) => {
        try {
          const response = await fetch(`/api/posts/posts/${postId}/like`, {
            method: 'POST',
            headers: { 'X-CSRF-Token': csrfToken },
          });
    
          if (response.ok) {
            setLikedPosts((prevLikedPosts) => ({
              ...prevLikedPosts,
              [postId]: true,
            }));
            // fetchData(); // Refetch the data to update the post likes count
            fetchComments();
          } else {
            console.error("Failed to like the post");
          }
        } catch (error) {
          console.error("Error liking the post:", error);
        }
      };
    
      // Function to handle unliking a post
      const handleUnlike = async (postId) => {
        try {
          const response = await fetch(`/api/posts/posts/${postId}/unlike`, {
            method: 'POST',
            headers: { 'X-CSRF-Token': csrfToken },
          });
    
          if (response.ok) {
            setLikedPosts((prevLikedPosts) => ({
              ...prevLikedPosts,
              [postId]: false,
            }));
            // fetchData(); // Refetch the data to update the post likes count
            fetchComments();
          } else {
            console.error("Failed to unlike the post");
          }
        } catch (error) {
          console.error("Error unliking the post:", error);
        }
      };
  
      const isPostLikedByUser = (comment) => {
        return comment.likes && comment.likes.includes(loggedInUserId);
      };


      const handleLikesClick = (commentId) => {
        // Handle the display of liked users
        // const likedUserNames = likedUsers[commentId] ? Object.values(likedUsers[commentId]) : [];
        // alert(`Liked by: ${likedUserNames.join(", ")}`);
        setSelectedCommentId(commentId);
        setShowLikesPopup(true);
      }; 
  

      return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[600px] mx-2 overflow-hidden max-h-[90vh] max-w-[90vw] flex flex-col">
            <div className="px-6 py-2 border-b">
              <div className="flex flex-row w-full justify-between my-4">
                <div className="w-full flex justify-center">
                  <span className="font-bold text-2xl">Post</span>
                </div>
                <img
                  src="/assets/cancel.svg"
                  alt="Close icon"
                  className="w-6 h-6"
                  onClick={onClose}
                />
              </div>
            </div>
      
            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto">
              <div className="my-4 px-6">
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
                  <div className="relative ml-3 bg-gray-100 p-2 rounded-lg w-full">
                    <div className="flex text-sm">
                      <span className="font-semibold">{user.name || 'Commenter'}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        {formatTimeAgo(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                    <div className="flex items-center gap-2">
                      {isPostLikedByUser(comment) ? (
                        <img
                          src="/assets/Like.svg"
                          alt="Unlike"
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => handleUnlike(comment.id)}
                        />
                      ) : (
                        <img
                          src="/assets/likeforposting.svg"
                          alt="Like"
                          className="w-5 h-3 mt-2 cursor-pointer"
                          onClick={() => handleLike(comment.id)}
                        />
                      )}
                      {likesCount > 0 && (
                        <span
                          className="text-sm font-medium cursor-pointer"
                          onClick={() => handleLikesClick(comment.id)}
                        >
                          {likesCount}
                        </span>
                      )}
                    </div>
                    <img 
                      loading="lazy" 
                      src="/assets/wallpost-dotbutton.svg" 
                      alt="Options" 
                      className="absolute top-1 right-1 w-6 h-6 cursor-pointer" 
                      onClick={() => handleClickTreeDots(comment.id)} 
                    />
                  </div>
                </header>
                <div className="mt-4">
                  <p className="text-lg mb-4">{post.content}</p>
                  <PostAttachments attachments={post.attachments} />
                  <hr className="my-6 border-1 border-gray-200"/>
                </div>
              </div>
      
              {/* Comment Section */}
              <div className="pb-4 px-6">
                <div className="space-y-4">
                  {comments.map((comment) => {
                    let likesCount = 0;
                    if (Array.isArray(comment.likes)) {
                      likesCount = comment.likes.length;
                    }
      
                    const user = commentedUsers[comment.user_id] || {};
      
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
                          className="w-10 h-10 rounded-full mt-1"
                        />
                        <div className="relative ml-3 bg-gray-100 p-2 rounded-lg w-full">
                          <div className="flex text-sm items-end mx-1">
                            <span className="font-semibold">{user.name || 'Commenter'}</span>
                            <span className="ml-2 text-xs mb-[1px] text-gray-500">
                              {formatTimeAgo(comment.created_at)}
                            </span>
                          </div>
                          <p className="text-sm mt-1 mx-1">{comment.content}</p>
                          <div className="flex items-center gap-2 mx-1 mt-2">
                            {isPostLikedByUser(comment) ? (
                              <img
                                src="/assets/Like.svg"
                                alt="Unlike"
                                className="w-5 h-5 cursor-pointer"
                                onClick={() => handleUnlike(comment.id)}
                              />
                            ) : (
                              <img
                                src="/assets/likeforposting.svg"
                                alt="Like"
                                className="w-5 h-5 cursor-pointer"
                                onClick={() => handleLike(comment.id)}
                              />
                            )}
                            {likesCount > 0 && (
                              <span
                                className="text-sm font-medium cursor-pointer"
                                onClick={() => handleLikesClick(comment.id)}
                              >
                                {likesCount}
                              </span>
                            )}
                          </div>
                          <img 
                            loading="lazy" 
                            src="/assets/wallpost-dotbutton.svg" 
                            alt="Options" 
                            className="absolute top-2 right-4 w-5 h-5 cursor-pointer" 
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
                              <img className="w-6 h-6 mr-2" src="/assets/DeleteIcon.svg" alt="Delete" />
                              Delete
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
      
            {/* Fixed ShareYourThoughts Section */}
            <div className="py-4 border-t flex flex-row justify-between items-center w-full">
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
                postedId={post.id}
                onCommentPosted={fetchComments}
              />
            </div>
      
            {showLikesPopup && (
              <LikesPopup 
                likedUsers={likedUsers} 
                onClose={() => setShowLikesPopup(false)} 
                commentId={selectedCommentId}
              />
            )}
      
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
                    onClick={handleClosePopup}
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
        </div>
      );
            
};

export default Comment;
