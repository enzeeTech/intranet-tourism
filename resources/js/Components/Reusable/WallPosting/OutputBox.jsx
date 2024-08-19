import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import EditPost from './EditPost';
import './index.css'
import { useCsrf } from "@/composables";
import Excel from '../../../../../public/assets/ExcellIcon.svg'
import PDF from '../../../../../public/assets/PDFIcon.svg'
import DOC from '../../../../../public/assets/Docs.svg'
import PowerPoint from '../../../../../public/assets/PowerPointIcon.svg'
import TXT from '../../../../../public/assets/TXTIcon.png'
import announce from '../../../../../public/assets/announcementIcon.svg'

function Avatar({ src, alt }) {
  return <img loading="lazy" src={src} alt={alt} className="shrink-0 aspect-square w-[53px]" />;
}

function UserInfo({ name, timestamp }) {
  return (
    <div className="flex flex-col my-auto">
      <div className="text-base font-bold text-neutral-800">{name}</div>
      <div className="mt-3 text-xs text-neutral-800 text-opacity-50">{timestamp}</div>
    </div>
  );
}


function ProfileHeader({ name, timeAgo, profileImageSrc, profileImageAlt }) {
  return (
    <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
      <div className="flex gap-1.5">
        <img loading="lazy" src={profileImageSrc} alt={profileImageAlt} className="shrink-0 aspect-square w-[53px]" />
        <div className="flex flex-col my-auto">
          <div className="text-base font-semibold text-neutral-800">{name}</div>
          <time className="mt-3 text-xs text-neutral-800 text-opacity-50">{timeAgo}</time>
        </div>
      </div>
    </header>
  );
}

function FeedbackForm() {
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef(null);
  
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleFeedbackClick = (event) => {
    event.preventDefault(); // Prevents the default form submission
    console.log('Sending Form...');
  };
  
  return (
    <form className="flex gap-3.5 mt-4 max-md:flex-wrap max-md:max-w-full">
      <textarea
        ref={textAreaRef}
        value={inputValue}
        onChange={handleChange}
        placeholder="Give Your Feedback"
        className="grow justify-center items-start px-5 py-3 text-sm leading-5 rounded-md border border-gray-100 border-solid text-neutral-800 text-opacity-50 w-fit max-md:px-5 max-md:max-w-full"
        rows="4"
        style={{ maxHeight: "30px", overflowY: "auto" }}
        />
      <button className="flex flex-col justify-center my-auto text-xs font-semibold leading-5 text-center text-white whitespace-nowrap px-6 py-2 bg-red-500 rounded-2xl max-md:px-5" onClick={handleFeedbackClick}>
        Send
      </button>
    </form>
  );
}

function PostAttachments({ attachments }) {
  const [showPopup, setShowPopup] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
  const openPopup = (index) => {
    setCurrentMediaIndex(index);
    setShowPopup(true);
  };
  
  const closePopup = () => {
    setShowPopup(false);
  };
  
  const imagesAndVideos = attachments.filter(
    (att) => att.mime_type.startsWith("image/") || att.mime_type.startsWith("video/")
  );
  
  const renderImageOrVideo = (attachment, index, isMore = false) => (
    <div
    key={attachment.path} // Use a unique key based on the attachment
    className={`attachment ${attachment.height > attachment.width ? 'tall' : ''} ${isMore ? 'relative' : ''}`}
    onClick={() => openPopup(index)}
    >
      {attachment.mime_type.startsWith("image/") ? (
        <img
        src={`/storage/${attachment.path}`}
        alt="attachment"
        className="w-full h-auto rounded-lg object-cover"
        />
      ) : (
        <video controls className="w-full h-auto rounded-lg">
          <source src={`/storage/${attachment.path}`} />
          Your browser does not support the video tag.
        </video>
      )}
      {isMore && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold text-lg">
          +{attachments.length - 4} more
        </div>
      )}
    </div>
  );
  
  const renderDocument = (attachment, index) => {
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = `/storage/${attachment.path}`;
      link.download = attachment.metadata.original_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    return (
      <article key={index} className="flex flex-col text-xs text-neutral-800 w-48">
        <div className="p-1 bg-gray-200 rounded-xl">
          <div
            className="flex gap-3 items-start py-4 px-4 bg-white rounded-xl max-w-[600px]"
            onClick={handleDownload}
            style={{ cursor: 'pointer' }} // Add cursor pointer to indicate it's clickable
            >
            <img
              src={
                attachment.extension === 'pdf' ? PDF :
                attachment.extension === 'docx' || attachment.extension === 'doc' ? DOC :
                attachment.extension === 'xlsx' ? Excel :
                attachment.extension === 'pptx' || attachment.extension === 'ptx' ? PowerPoint :
                attachment.extension === 'txt' ? TXT :
                'path/to/default-icon.png'
              }
              style={{ width: '48px', height: '48px', objectFit: 'contain' }}
              />
            <div className="flex flex-col items-start flex-grow">
              <span className="whitespace-normal break-all blue border-2">Download File</span>
            </div>
          </div>
        </div>
      </article>
    );
  };
  
  const getGridClass = () => {
    const count = imagesAndVideos.length;
    if (count === 1) return 'one';
    if (count === 2) return 'two';
    if (count === 3) return 'three';
    return 'four';
  };
  
  if (imagesAndVideos.length === 3) {
    let tallestImageIndex = 0;
    let maxHeightRatio = 0;
    
    imagesAndVideos.forEach((attachment, index) => {
      if (attachment.mime_type.startsWith("image/")) {
        const heightRatio = attachment.height / attachment.width;
        if (heightRatio > maxHeightRatio) {
          maxHeightRatio = heightRatio;
          tallestImageIndex = index;
        }
      }
    });
    
    const [tallestImage] = imagesAndVideos.splice(tallestImageIndex, 1);
    imagesAndVideos.unshift(tallestImage);
  }
  
  const attachmentsToDisplay = imagesAndVideos.slice(0, 4);
  
  return (
    <>
      <div className={`attachment-grid ${getGridClass()}`}>
        {attachmentsToDisplay.map((attachment, index) => {
          if (index === 3 && imagesAndVideos.length > 4) {
            return renderImageOrVideo(attachment, index, true);
          }
          return renderImageOrVideo(attachment, index);
        })}
        {attachments
          .filter(att => !att.mime_type.startsWith("image/") && !att.mime_type.startsWith("video/"))
          .map(renderDocument)}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 text-white text-lg"
            >
            &times;
          </button>
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full relative">
            <div className="flex justify-center w-full">
              {imagesAndVideos[currentMediaIndex].mime_type.startsWith("image/") ? (
                <img
                key={imagesAndVideos[currentMediaIndex].path} // Unique key for image
                src={`/storage/${imagesAndVideos[currentMediaIndex].path}`}
                alt="Current attachment"
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
                />
              ) : (
                <video
                key={imagesAndVideos[currentMediaIndex].path} // Unique key for video
                controls
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
                >
                  <source src={`/storage/${imagesAndVideos[currentMediaIndex].path}`} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <div className="flex justify-center mt-4 overflow-x-auto w-full">
              {imagesAndVideos.map((attachment, index) => (
                <div
                key={index}
                className={`cursor-pointer mx-1 ${currentMediaIndex === index ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setCurrentMediaIndex(index)}
                >
                  {attachment.mime_type.startsWith("image/") ? (
                    <img
                    src={`/storage/${attachment.path}`}
                    alt="Thumbnail"
                    className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    <video className="w-20 h-20 object-cover rounded-lg">
                      <source src={`/storage/${attachment.path}`} />
                    </video>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}


function FeedbackOption({ optionText, onVote }) {
  return (
    <div
      className="flex gap-2.5 px-3.5 py-2.5 mt-4 text-sm leading-5 bg-gray-100 rounded-3xl text-neutral-800 max-md:flex-wrap cursor-pointer"
      onClick={onVote}
    >
      <div className="shrink-0 self-start w-3 bg-white rounded-full h-[11px]" />
      <div className="flex-auto max-md:max-w-full">{optionText}</div>
    </div>
  );
}


function OutputData({ polls, filterType, filterId, userId, loggedInUserId }) {
  const [pollos, setPollos] = useState(polls);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditPost, setCurrentEditPost] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const csrfToken = useCsrf();


    async function fetchData() {
  try {
    const postsResponse = await fetch("/api/posts/posts?with[]=user&with[]=attachments&with[]=accessibilities", {
      method: "GET",
    });
    if (!postsResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const postsData = await postsResponse.json();

    const posts = postsData.data.data.map((post) => {
      post.attachments = Array.isArray(post.attachments) ? post.attachments : [post.attachments];
      return post;
    });

    const postsWithUserProfiles = await Promise.all(posts.map(async (post) => {
      const userProfileResponse = await fetch(`/api/users/users/${post.user_id}?with[]=profile`, {
        method: "GET",
      });
      const userProfileData = await userProfileResponse.json();
      post.userProfile = userProfileData.data;

      if (Array.isArray(post.accessibilities) && post.accessibilities.length > 0) {
        const departmentNames = await Promise.all(post.accessibilities.map(async (accessibility) => {
          if (accessibility.accessable_type === accessibility.accessable_type) {
            const departmentResponse = await fetch(`/api/department/departments/${accessibility.accessable_id}`);
            const departmentData = await departmentResponse.json();
            return departmentData.data.name;
          }
          return null;
        }));
        post.departmentNames = departmentNames.filter(name => name !== null).join(', ');
      } else {
        post.departmentNames = null;
      }

      return post;
    }));

    
    // Separate announcements and other posts
    const announcements = postsWithUserProfiles.filter(post => post.type === 'announcement');
    const otherPosts = postsWithUserProfiles.filter(post => post.type !== 'announcement');
    
    // Sort announcements by created_at descending (latest first)
    announcements.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    otherPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    
    // Merge announcements with other posts
    const sortedPosts = [...announcements, ...otherPosts];
    
    console.log("SORTEDPOST", sortedPosts);
    

    setPostData(sortedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    fetchData();
  }, []);

    // Filter posts based on accessable_type and accessable_id
  let filteredPostData = postData.filter(post => post.type !== 'story');

  if (filterType !== null && filterId !== null) {
    filteredPostData = filteredPostData.filter((post) => {
      if (Array.isArray(post.accessibilities) && post.accessibilities.length > 0) {
        return post.accessibilities.some(accessibility => 
          accessibility.accessable_type === filterType && accessibility.accessable_id == filterId
        );
      }
      return false;
    });
  }

// Separate announcements and non-announcements
const announcements = filteredPostData.filter(post => post.type === 'announcement');
const nonAnnouncements = filteredPostData.filter(post => post.type !== 'announcement');

// Reverse the non-announcement posts
const reversedNonAnnouncements = filterType ? [...nonAnnouncements] : [...nonAnnouncements];

console.log("REVERSEDNON", reversedNonAnnouncements);

// Combine announcements at the top with the reversed non-announcement posts
const finalPosts = [...announcements, ...reversedNonAnnouncements];


console.log("FINAL", finalPosts);



  const togglePopup = (index) => {
    setIsPopupOpen((prevState) => {
      // If the clicked popup is already open, close it
      if (prevState[index]) {
        return {};
      }
      // Otherwise, open the clicked popup and close all others
      return { [index]: true };
    });
  };

  const formatTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (post) => {
    setCurrentEditPost(post);
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      // Fetch the post to check if it has accessibilities
      const postToDelete = postData.find(post => post.id === postIdToDelete);
  
      if (!postToDelete) {
        console.error(`Post with ID ${postIdToDelete} not found.`);
        return;
      }
  
      // If the post has accessibilities, delete them first
      if (postToDelete.accessibilities && postToDelete.accessibilities.length > 0) {
        for (const accessibility of postToDelete.accessibilities) {
          const response = await fetch(`/api/posts/post_accessibilities/${accessibility.id}`, {
            method: 'DELETE',
            headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
          });
  
          if (!response.ok) {
            console.error(`Failed to delete accessibility with ID ${accessibility.id}.`);
            return;
          }
        }
      }
  
      // Now delete the post
      const postResponse = await fetch(`/api/posts/posts/${postIdToDelete}`, {
        method: 'DELETE',
        headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
      });
  
      if (postResponse.ok) {
        setPostData(postData.filter(post => post.id !== postIdToDelete));
      } else {
        console.error(`Failed to delete post with ID ${postIdToDelete}.`);
      }
    } catch (error) {
      console.error(`Error deleting post with ID ${postIdToDelete}:`, error);
    } finally {
      setShowDeletePopup(false);
      setIsPopupOpen(false);
    }
  };

  const confirmDelete = (postId) => {
    setPostIdToDelete(postId);
    setShowDeletePopup(true);
  };


  function calculatePercentage(pollId, optionIndex) {
    const poll = polls.find(p => p.id === pollId);
    if (!poll) return 0;
  
    const totalVotes = poll.options.reduce((acc, option) => acc + option.votes, 0);
    const optionVotes = poll.options[optionIndex].votes;
  
    return totalVotes === 0 ? 0 : ((optionVotes / totalVotes) * 100).toFixed(2);
  }
  
  const handleVote = (pollId, optionIndex) => {
    setPollos(prevPolls =>
      prevPolls.map(poll => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map((option, i) =>
            i === optionIndex ? { ...option, votes: option.votes + 1 } : option
          );
          return { ...poll, options: updatedOptions };
        }
        return poll;
      })
    );
  };


  const handleAnnouncement = async (post) => {
    try {
      const newType = post.type === 'announcement' ? 'post' : 'announcement';
      const response = await fetch(`/api/posts/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        // body: JSON.stringify({ type: newType }),
        body: JSON.stringify({ type: newType, user_id: String(post.user.id), visibility: "public" }),
      });

      if (response.ok) {
        // Update the postData state with the new type
        setPostData(prevData =>
          prevData.map(p =>
            p.id === post.id ? { ...p, type: newType } : p
          )
        );
        setIsPopupOpen(false);
        fetchData();
      } else {
        console.error('Failed to update post type');
      }
    } catch (error) {
      console.error('Error updating post type:', error);
    }
  };

    // Function to handle liking a post
    const handleLike = async (postId) => {
      try {
        const response = await fetch(`/api/posts/post/like/${postId}`, {
          method: 'PUT',
          headers: { 'X-CSRF-Token': csrfToken },
        });
  
        if (response.ok) {
          setLikedPosts((prevLikedPosts) => ({
            ...prevLikedPosts,
            [postId]: true,
          }));
          fetchData(); // Refetch the data to update the post likes count
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
        const response = await fetch(`/api/posts/post/unlike/${postId}`, {
          method: 'PUT',
          headers: { 'X-CSRF-Token': csrfToken },
        });
  
        if (response.ok) {
          setLikedPosts((prevLikedPosts) => ({
            ...prevLikedPosts,
            [postId]: false,
          }));
          fetchData(); // Refetch the data to update the post likes count
        } else {
          console.error("Failed to unlike the post");
        }
      } catch (error) {
        console.error("Error unliking the post:", error);
      }
    };
  
    // Example function to determine if the user liked a post (use your logic)
    const isPostLikedByUser = (post) => {
      return likedPosts[post.id] || false;
    };
  

  return (
    <>
      {polls.map((poll) => (
        console.log("POLL", poll),
        
        <div className="input-box-container" style={{ height: "auto", marginTop: "-10px" }} key={poll.id}>
          <article className="flex flex-col px-5 py-4 bg-white rounded-xl shadow-sm max-w-[610px] max-md:pl-5">
          <div className="flex items-center">
              <ProfileHeader
                  name="Fareez Hishamuddin"
                  timeAgo="1 day ago"
                  profileImageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/726408370b648407cc55fec1ee24245aad060d459ac0f498438d167758c3a165?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
                  profileImageAlt="Profile image of Thomas"
              />
              <img
                  loading="lazy"
                  src="/assets/wallpost-dotbutton.svg"
                  alt="Options"
                  className="shrink-0 my-auto aspect-[1.23] fill-red-500 w-6 cursor-pointer mt-1"
                  onClick={() => togglePopup(index)}
              />
          </div>
            <div className="poll">
              <h3>{poll.content}</h3>
              <ul>
                {poll.options.map((option, i) => (
                  <li key={i}>
                    <FeedbackOption optionText={`${option} (${calculatePercentage(poll.id, i)}%)`} onVote={() => handleVote(poll.id, i)} />
                  </li>
                ))}
              </ul>
            </div>
            <FeedbackForm />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d36c4e55abf5012ece1a90ed95737b46c9b6970a05e3182fdd6248adca09028e?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" alt="" className="mt-6 aspect-[4.55] w-[76px]" />
          </article>
        </div>
      ))}
      {userId ? postData.filter(post => post.user.id === userId && post.type !== 'story' && post.type !== 'files').map((post, index) => (
        <div key={post.id} className="">
          <article className="mt-4 p-4 border rounded-2xl bg-white border-2 shadow-xl w-[610px] relative">
            <header className="flex px-px w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 mt-2">
              </div>
              <div className="flex justify-between items-start px-1 w-full mb-4 p-2 -ml-2 -mt-3">
                <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-1.5 -mt-1">
                    <img 
                      loading="lazy" 
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
                      className="shrink-0 aspect-square w-[53px] rounded-image" 
                    />
                    <div className="flex flex-col my-auto">
                      <div className="text-base font-semibold text-neutral-800">{post.user.name}</div>
                      <time className="mt-1 text-xs text-neutral-800 text-opacity-50">{formatTimeAgo(post.created_at)}</time>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-800 bg-gray-200 rounded-md px-2 py-1 -mt-5">
                      {post.accessibilities?.map((accessibility, index) => (
                        <span key={index}>
                          {accessibility.accessable_type}{": "}
                        </span>
                      ))}
                      {post.departmentNames ? post.departmentNames : post.type}
                    </span>
                    <img loading="lazy" src="/assets/wallpost-dotbutton.svg" alt="Options" className="shrink-0 my-auto aspect-[1.23] fill-red-500 w-6 cursor-pointer mt-1" onClick={() => togglePopup(index)} />
                  </div>
                </div>
              </div>
              {isPopupOpen[index] && (
                <div className="absolute bg-white border-2 rounded-xl p-1 shadow-lg mt-6 right-0 w-[160px] h-auto z-10 ">
                  <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl  p-2" onClick={() => handleEdit(post)}><img className="w-6 h-6" src="/assets/EditIcon.svg" alt="Edit" />Edit</p>
                  <div className="font-extrabold text-neutral-800 mb-1 mt-1 border-b-2 border-neutral-300"></div>
                  <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" onClick={() => confirmDelete(post.id)}>
                  <img className="w-6 h-6" src="/assets/DeleteIcon.svg" alt="Delete" />Delete</p>
                  <div className="font-extrabold text-neutral-800 mb-2 mt-1 border-b-2 border-neutral-300"></div>
                  <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" onClick={() => handleAnnouncement(index)}><img className="w-6 h-6" src="/assets/AnnounceIcon.svg" alt="Announcement" />Announcement</p>
                </div>
              )}
            </header>
            <div className="post-content break-words overflow-hidden" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
              {post.content}
            </div>
            <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 underline max-md:max-w-full">
              {post.tag.replace(/[\[\]"]/g, '')}
            </p>
            <PostAttachments attachments={post.attachments} />
            <div className="flex justify-start gap-2 w-5 h-5 mt-2">
              <img src='/assets/likeforposting.svg' alt="Like" className="w-6 h-6 cursor-pointer" />
              <img src='/assets/commentforposting.svg' alt="Comment" className="w-6 h-6 cursor-pointer" />
              <img src='/assets/shareforposting.svg' alt="Share" className="w-6 h-6 cursor-pointer" />
            </div>
          </article>
        </div>
        )) : finalPosts.filter(post => post.type !== 'story' && post.type !== 'files').map((post, index) => {
          // Parse the likes string
          let likesCount = 0;
          try {
            const likesObject = JSON.parse(post.likes);
            likesCount = likesObject.likes || 0;
          } catch (error) {
            // console.error('Error parsing likes:', error);
          }

          return (
            <div key={post.id}>
              {/* Conditional Rendering for Announcement */}
              {post.type === 'announcement' && (
                <div className="mt-10 p-2 border rounded-2xl border-2 shadow-xl w-[610px] relative pb-16 bg-rose-600">
                  <div className="mb-2 flex items-center gap-1">
                    <img src={announce} className="flex-shrink-0 rounded-xl w-7 h-7" alt="Announcement" />
                    <div className="text-center font-bold text-xl	ml-2">
                      Announcement 🔊 🔊
                    </div>
                  </div>
                </div>
              )}

              {/* Main Post Content */}
              <article className={`${post.type === 'announcement' ? '-mt-16' : 'mt-10'} p-4 border rounded-2xl bg-white border-2 shadow-xl w-[610px] relative`}>
                <header className="flex px-px w-full max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-1 mt-2"></div>
                  <div className="flex justify-between items-start px-1 w-full mb-4 p-2 -ml-2 -mt-3">
                    <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                      <div className="flex gap-1.5 -mt-1">
                        <img 
                          loading="lazy" 
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
                          className="shrink-0 aspect-square w-[53px] rounded-image" 
                        />
                        <div className="flex flex-col my-auto">
                          <div className="text-base font-semibold text-neutral-800">{post.user.name}</div>
                          <time className="mt-1 text-xs text-neutral-800 text-opacity-50">{formatTimeAgo(post.created_at)}</time>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-800 bg-gray-200 rounded-md px-2 py-1 -mt-5">
                          {post.accessibilities?.map((accessibility, index) => (
                            <span key={index}>
                              {accessibility.accessable_type}{": "}
                            </span>
                          ))}
                          {post.departmentNames ? post.departmentNames : post.type}
                        </span>
                        <img 
                          loading="lazy" 
                          src="/assets/wallpost-dotbutton.svg" 
                          alt="Options" 
                          className="shrink-0 my-auto aspect-[1.23] fill-red-500 w-6 cursor-pointer mt-1" 
                          onClick={() => togglePopup(index)} 
                        />
                      </div>
                    </div>
                  </div>
                  {isPopupOpen[index] && (
                    <div className="absolute bg-white border-2 rounded-xl p-1 shadow-lg mt-6 right-0 w-[160px] h-auto z-10">
                      <p 
                        className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" 
                        onClick={() => handleEdit(post)}
                      >
                        <img className="w-6 h-6" src="/assets/EditIcon.svg" alt="Edit" />
                        Edit
                      </p>
                      <div className="font-extrabold text-neutral-800 mb-1 mt-1 border-b-2 border-neutral-300"></div>
                      <p 
                        className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" 
                        onClick={() => confirmDelete(post.id)}
                      >
                        <img className="w-6 h-6" src="/assets/DeleteIcon.svg" alt="Delete" />
                        Delete
                      </p>
                      <div className="font-extrabold text-neutral-800 mb-2 mt-1 border-b-2 border-neutral-300"></div>
                      <p 
                        className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" 
                        onClick={() => handleAnnouncement(post)}
                      >
                        <img className="w-6 h-6" src="/assets/AnnounceIcon.svg" alt="Announcement" />
                        Announcement
                      </p>
                    </div>
                  )}
                </header>
                <div className="post-content break-words overflow-hidden" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                  {post.content}
                </div>
                <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 max-md:max-w-full">
                  {/* {post.tag.replace(/[\[\]"]/, '')} */}
                  {post.tag?.replace(/[\[\]"]/g, '') || ''}
                </p>
                <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 max-md:max-w-full">
                {post.mentions?.replace(/[\[\]"]/g, '') || ''}
                </p>
                <PostAttachments attachments={post.attachments} />
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    {isPostLikedByUser(post) ? (
                      <img
                        src="/assets/Like.svg"
                        alt="Unlike"
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => handleUnlike(post.id)}
                      />
                    ) : (
                      <img
                        src="/assets/likeforposting.svg"
                        alt="Like"
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => handleLike(post.id)}
                      />
                    )}
                    {likesCount > 0 && <span className="text-sm font-medium">{likesCount}</span>}
                  </div>
                  <img src="/assets/commentforposting.svg" alt="Comment" className="w-6 h-6 cursor-pointer" />
                </div>
              </article>
            </div>
          )
        })
      }
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
            <EditPost post={currentEditPost} loggedInUserId={loggedInUserId} onClose={() => setIsEditModalOpen(false)} onClosePopup={() => setIsPopupOpen(false)} refetchPost={fetchData} />
          </div>
        </div>
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
                    // onClick={handleClosePopup}
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
    </>
  );
}

export default OutputData;