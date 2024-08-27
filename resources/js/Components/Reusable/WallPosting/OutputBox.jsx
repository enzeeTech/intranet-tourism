import React, { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import EditPost from './EditPost';
import Comment from './Comment';
import './index.css'
import { useCsrf } from "@/composables";
import PostAttachments from './PostAttachments'
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
    <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full lg:w-[610px] md:w-[610px] sm:w-[610px]">
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
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const csrfToken = useCsrf();


async function fetchData() {
  try {
    let allPosts = [];
    let currentPage = 1;
    let lastPage = 1;

    // Fetch posts data from all pages
    do {
      const postsResponse = await fetch(`/api/posts/posts?with[]=user&with[]=attachments&with[]=accessibilities&page=${currentPage}`, {
        method: "GET",
      });
      if (!postsResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const postsData = await postsResponse.json();

      // Add the data from the current page to allPosts
      allPosts = allPosts.concat(postsData.data.data.map((post) => {
        post.attachments = Array.isArray(post.attachments) ? post.attachments : [post.attachments];
        return post;
      }));

      // Update pagination info
      currentPage++;
      lastPage = postsData.data.last_page;
    } while (currentPage <= lastPage);

    const postsWithUserProfiles = await Promise.all(allPosts.map(async (post) => {
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
    
    // Sort announcements by updated_at descending (latest first)
    announcements.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    
    // Sort other posts by created_at descending (latest first)
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
        const response = await fetch(`/api/posts/posts/${postId}/like`, {
          method: 'POST',
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
        const response = await fetch(`/api/posts/posts/${postId}/unlike`, {
          method: 'POST',
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


    const openCommentPopup = (post) => {
      setSelectedPost(post);
      setIsCommentPopupOpen(true);
    };
  

  const renderContentWithTags = (content) => {
    // Regex to match tags (e.g., @username or @FirstName LastName)
    const tagRegex = /@\w+(?:\s\w)*\b/g;
    // Regex to match URLs starting with https
    const urlRegex = /https:\/\/[^\s]+/g;

    // Replace URLs with anchor tags
    const replaceUrls = (text) => {
        return text.split(urlRegex).reduce((acc, part, index) => {
            if (index === 0) return [part];
            const urlMatch = text.match(urlRegex)[index - 1];
            return [...acc, 
                <a 
                    href={urlMatch} 
                    key={index} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: 'blue', textDecoration: 'underline' }} // Style for blue URL
                >
                    {urlMatch}
                </a>, 
                part
            ];
        }, []);
    };

    // Replace tags with span and URLs with anchor tags
    const parts = content?.split(tagRegex);
    const formattedContent = parts?.reduce((acc, part, index) => {
        if (index === 0) return replaceUrls(part);
        const tagMatch = content?.match(tagRegex)[index - 1];
        return [...acc, <span className="tagged-text" key={`tag-${index}`}>{tagMatch}</span>, ...replaceUrls(part)];
    }, []);
  
    return formattedContent;
};


    
    
    console.log("HEHEHHE", postData);
    
  

  return (
    <>
      {polls?.map((poll) => (
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
      {userId ? postData.filter(post => post.user.id === userId && post.type !== 'story' && post.type !== 'files').map((post, index) => {
        let likesCount = 0;
        try {
          const likesObject = JSON.parse(post.likes);
          likesCount = likesObject.likes || 0;
        } catch (error) {
          // console.error('Error parsing likes:', error);
        }
        
        return (
        <div key={post.id} className="">
          <article className="mt-4 p-4 rounded-2xl bg-white border-2 shadow-xl w-full relative">
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
                      className="shrink-0 aspect-square rounded-image" 
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
                  <img src="/assets/commentforposting.svg" alt="Comment" className="w-6 h-6 cursor-pointer" onClick={() => openCommentPopup(post)} />
                </div>
              </article>
            </div>
        )
        }) : finalPosts.filter(post => post.type !== 'story' && post.type !== 'files' && post.type !== 'comment').map((post, index) => {
          // Parse the likes string
          let likesCount = 0;

          if (Array.isArray(post.likes)) {
            likesCount = post.likes?.length;
          }
          

          return (
            <div className="w-full" key={post.id}>
              {/* Conditional Rendering for Announcement */}
              {post.type === 'announcement' && (
                <div className="mt-10 py-2 px-6 border rounded-2xl border-2 shadow-xl w-full lg:w-full md:w-[610px] sm:w-[610px] relative pb-16 bg-[#FF5437]">
                  <div className="mb-2 flex items-center gap-1">
                    <img src={announce} className="flex-shrink-0 rounded-xl w-7 h-7" alt="Announcement" />
                    <div className="text-white text-center font-bold text-lg	ml-2">
                      Announcement
                    </div>
                  </div>
                </div>
              )}

               {/* Birthday Post */}
               {post.type === 'birthday' && (
                 <article className={`${post.type === 'announcement' ? '-mt-16' : 'mt-10'} p-4 border rounded-2xl bg-white border-2 shadow-xl w-full lg:w-[610px] md:w-[610px] sm:w-[610px] relative`}>
                   <header className="flex px-px w-full max-md:flex-wrap max-md:max-w-full ">
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

                   {!post.attachments || post.attachments.length === 0 ? (
  // Render this block if there are no attachments
  <>
    <div>{post.content}</div>
    <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 max-md:max-w-full">
      {post.mentions?.replace(/[\[\]"]/g, '') || ''}
    </p>
  </>
) : (
  // Render this block if there are attachments
  <>
    <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 max-md:max-w-full">
      {post.mentions?.replace(/[\[\]"]/g, '') || ''}
    </p>
    <div className="relative flex flex-wrap gap-2 mt-4">
      {post.attachments.map((attachment, idx) => (
        <div key={idx} className="relative w-full">
          <img
            src={`/storage/${attachment.path}`}
            alt={`Attachment ${idx + 1}`}
            className="rounded-xl w-full h-auto object-cover"
            style={{ maxHeight: '300px' }} // Allowing the image to take up more vertical space
          />
          {idx === Math.floor(post.attachments.length / 2) && (
            <div className="absolute inset-0 flex justify-center items-center p-4">
              <span
                className="text-5xl font-black text-center text-white text-opacity-90 bg-black bg-opacity-50 rounded-lg"
                style={{ maxWidth: '90%', overflowWrap: 'break-word', wordWrap: 'break-word' }}
              >
                {post.content}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  </>
)}

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
                     <img src="/assets/commentforposting.svg" alt="Comment" className="w-6 h-6 cursor-pointer" onClick={() => openCommentPopup(post)} />
                   </div>
                 </article>
                )}


              {/* Main Post Content */}
              {post.type !== 'birthday' && (
              <article className={`${post.type === 'announcement' ? '-mt-16' : 'mt-10'} p-4 border rounded-2xl bg-white border-2 shadow-xl w-full lg:w-full md:w-[610px] sm:w-[610px] relative`}>
                <header className="flex px-px w-full max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-1 mt-2"></div>
                  <div className="flex flex-col justify-between items-start px-1 w-full mb-4 p-2 -ml-2 -mt-3">
                    <div className="flex w-full items-center justify-between h-auto mb-4">
                    <span className="text-sm font-semibold text-neutral-600 bg-gray-200 rounded-lg px-2 py-1">
                      {post.accessibilities?.map((accessibility, index) => (
                        <span key={index}>{accessibility.accessable_type}{": "}</span>
                      ))}
                      {post.departmentNames ? post.departmentNames : post.type}
                    </span>
                    {post.type === 'announcement' && (
                      <div className="bg-white relative">
                        <img
                          src={announce}
                          className="flex-shrink-0 rounded-xl w-7 h-7"
                          alt="Announcement Icon"
                        />
                      </div>
                    )}
                    </div>  
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
                        <div className="flex flex-col my-auto ml-1">
                          <div className="text-base font-semibold text-neutral-800">{post.user.name}</div>
                          <time className="mt-1 text-xs text-neutral-800 text-opacity-50">{formatTimeAgo(post.created_at)}</time>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <span className="text-sm font-semibold text-neutral-600 bg-gray-200 rounded-lg px-2 py-1 -mt-5">
                          {post.accessibilities?.map((accessibility, index) => (
                            <span key={index}>
                              {accessibility.accessable_type}{": "}
                            </span>
                          ))}
                          {post.departmentNames ? post.departmentNames : post.type}
                        </span> */}
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
                    <div className="absolute bg-white border-2 rounded-xl p-1 shadow-custom mt-16 right-0 w-[180px] h-auto z-10">
                      <p 
                        className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" 
                        onClick={() => handleEdit(post)}
                      >
                        <img className="w-6 h-6 mr-2" src="/assets/EditIcon.svg" alt="Edit" />
                        Edit
                      </p>
                      <div className="font-extrabold text-neutral-800 my-1 border-b-2 border-neutral-200"></div>
                      <p 
                        className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" 
                        onClick={() => confirmDelete(post.id)}
                      >
                        <img className="w-6 h-6 mr-2" src="/assets/DeleteIcon.svg" alt="Delete" />
                        Delete
                      </p>
                      <div className="font-extrabold text-neutral-800 my-1 border-b-2 border-neutral-200"></div>
                      <p 
                        className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" 
                        onClick={() => handleAnnouncement(post)}
                      >
                        <img className="w-6 h-6 mr-2" src="/assets/AnnounceIcon.svg" alt="Announcement" />
                        Announcement
                      </p>
                    </div>
                  )}
                </header>
                {/* <div className="post-content break-words overflow-hidden" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                  {post.content}
                </div> */}
                <article className="post-content">
                    {renderContentWithTags(post.content, post.mentions)}
                </article>

                <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 max-md:max-w-full">
                  {/* {post.tag.replace(/[\[\]"]/, '')} */}
                  {post.tag?.replace(/[\[\]"]/g, '') || ''}
                </p>

{post.mentions?.length > 0 && (
    <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 max-md:max-w-full">
        Tagged People: {JSON.parse(post.mentions).map(person => person.name).join(', ')}
    </p>
)}


                <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 max-md:max-w-full">
                {post.event?.replace(/[\[\]"]/g, '') || ''}
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
                  <img src="/assets/commentforposting.svg" alt="Comment" className="w-6 h-6 cursor-pointer" onClick={() => openCommentPopup(post)} />
                </div>
              </article>
              )}
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

      {isCommentPopupOpen && selectedPost && (
        <Comment post={selectedPost} onClose={() => setIsCommentPopupOpen(false)} />
      )}
    </>
  );
}

export default OutputData;