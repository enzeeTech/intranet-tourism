// import React, { useState, useEffect, useRef } from 'react';
// import { usePage } from '@inertiajs/react';
// import { formatDistanceToNow } from 'date-fns';
// import EditPost from './EditPost';
// import './index.css'
// import { useCsrf } from "@/composables";

// function FeedbackOption({ optionText }) {
//   return (
//     <div className="flex gap-2.5 px-3.5 py-2.5 mt-4 text-sm leading-5 bg-gray-100 rounded-3xl text-neutral-800 max-md:flex-wrap">
//       <div className="shrink-0 self-start w-3 bg-white rounded-full h-[11px]" />
//       <div className="flex-auto max-md:max-w-full">{optionText}</div>
//     </div>
//   );
// }

// function ProfileHeader({ name, timeAgo, profileImageSrc, profileImageAlt }) {
//   return (
//     <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
//       <div className="flex gap-1.5">
//         <img loading="lazy" src={profileImageSrc} alt={profileImageAlt} className="shrink-0 aspect-square w-[53px]" />
//         <div className="flex flex-col my-auto">
//           <div className="text-base font-semibold text-neutral-800">{name}</div>
//           <time className="mt-3 text-xs text-neutral-800 text-opacity-50">{timeAgo}</time>
//         </div>
//       </div>
//       <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3c193bbbcd5eca7bf933dad4a6932d076b04eb038d7635c591737bbebdc61ef?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" alt="" className="shrink-0 self-start aspect-[3.85] w-[19px]" />
//     </header>
//   );
// }

// function FeedbackForm() {
//   const [inputValue, setInputValue] = useState("");
//   const textAreaRef = useRef(null);

//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleFeedbackClick = (event) => {
//     event.preventDefault(); // Prevents the default form submission
//     console.log('Sending Form...');
//   };

//   return (
//     <form className="flex gap-3.5 mt-4 max-md:flex-wrap max-md:max-w-full">
//       <textarea
//         ref={textAreaRef}
//         value={inputValue}
//         onChange={handleChange}
//         placeholder="Give Your Feedback"
//         className="grow justify-center items-start px-5 py-3 text-sm leading-5 rounded-md border border-gray-100 border-solid text-neutral-800 text-opacity-50 w-fit max-md:px-5 max-md:max-w-full"
//         rows="4"
//         style={{ maxHeight: "30px", overflowY: "auto" }}
//       />
//       <button className="flex flex-col justify-center my-auto text-xs font-semibold leading-5 text-center text-white whitespace-nowrap px-6 py-2 bg-red-500 rounded-2xl max-md:px-5" onClick={handleFeedbackClick}>
//         Send
//       </button>
//     </form>
//   );
// }

// // const PostAttachments = ({ attachments }) => {
// //   const [sortedAttachments, setSortedAttachments] = useState([]);

// //   useEffect(() => {
// //     const loadImageDimensions = async () => {
// //       const attachmentsWithDimensions = await Promise.all(
// //         attachments.map((attachment) => 
// //           new Promise((resolve) => {
// //             const img = new Image();
// //             img.src = `/storage/${attachment.path}`;
// //             img.onload = () => {
// //               resolve({
// //                 ...attachment,
// //                 width: img.width,
// //                 height: img.height,
// //                 aspectRatio: img.width / img.height,
// //               });
// //             };
// //           })
// //         )
// //       );

// //       // Sort by height descending, so the tallest image comes first
// //       const sorted = attachmentsWithDimensions.sort((a, b) => b.height - a.height);
// //       setSortedAttachments(sorted);
// //     };

// //     loadImageDimensions();
// //   }, [attachments]);

// //   const attachmentCount = sortedAttachments.length;
// //   let gridClass = 'attachment-grid';

// //   if (attachmentCount === 1) gridClass += ' one';
// //   else if (attachmentCount === 2) gridClass += ' two';
// //   else if (attachmentCount === 3) gridClass += ' three';
// //   else if (attachmentCount === 4) gridClass += ' four';
// //   else if (attachmentCount > 4) gridClass += ' more-than-four';

// //   return (
// //     <div className={gridClass}>
// //       {sortedAttachments.map((attachment, index) => (
// //         <div key={index} className={`attachment ${attachment.aspectRatio > 1 ? 'wide' : 'tall'}`}>
// //           {attachment.mime_type.startsWith("image/") ? (
// //             <img src={`/storage/${attachment.path}`} alt="attachment" className="attachment-image" />
// //           ) : attachment.mime_type.startsWith("video/") ? (
// //             <video controls className="attachment-video">
// //               <source src={`/storage/${attachment.path}`} />
// //               Your browser does not support the video tag.
// //             </video>
// //           ) : (
// //             <a href={`/storage/${attachment.path}`} download>
// //               Download {attachment.file_name}
// //             </a>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };


// const PostAttachments = ({ attachments }) => {
//   const [sortedAttachments, setSortedAttachments] = useState([]);

//   useEffect(() => {
//     const loadImageDimensions = async () => {
//       const attachmentsWithDimensions = await Promise.all(
//         attachments.map((attachment) => 
//           new Promise((resolve) => {
//             const img = new Image();
//             img.src = `/storage/${attachment.path}`;
//             img.onload = () => {
//               resolve({
//                 ...attachment,
//                 width: img.width,
//                 height: img.height,
//                 aspectRatio: img.width / img.height,
//               });
//             };
//           })
//         )
//       );

//       // Sort by height descending, so the tallest image comes first
//       const sorted = attachmentsWithDimensions.sort((a, b) => b.height - a.height);
//       setSortedAttachments(sorted);
//     };

//     loadImageDimensions();
//   }, [attachments]);

//   const attachmentCount = sortedAttachments.length;
//   let gridClass = 'attachment-grid';

//   if (attachmentCount === 1) gridClass += ' one';
//   else if (attachmentCount === 2) gridClass += ' two';
//   else if (attachmentCount === 3) gridClass += ' three';
//   else if (attachmentCount === 4) gridClass += ' four';
//   else if (attachmentCount > 4) gridClass += ' more-than-four';

//   return (
//     <div className={gridClass}>
//       {sortedAttachments.map((attachment, index) => (
//         <div key={index} className={`attachment ${attachment.aspectRatio > 1 ? 'wide' : 'tall'}`}>
//           {attachment.mime_type.startsWith("image/") ? (
//             <img src={`/storage/${attachment.path}`} alt="attachment" className="attachment-image" />
//           ) : attachment.mime_type.startsWith("video/") ? (
//             <video controls className="attachment-video">
//               <source src={`/storage/${attachment.path}`} />
//               Your browser does not support the video tag.
//             </video>
//           ) : (
//             // <a href={`/storage/${attachment.path}`} download>
//             //   Download {attachment.file_name}
//             // </a>

//             <a href={`/storage/${attachment.path}`} download className="block w-full h-24 bg-gray-100 rounded-lg text-xs font-semibold text-center leading-24">
//               Download {attachment.file_name}
//             </a>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };


// function OutputData({ polls, filterType, filterId, userId, loggedInUserId }) {
//   const [postData, setPostData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isPopupOpen, setIsPopupOpen] = useState({});
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentEditPost, setCurrentEditPost] = useState(null);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [postIdToDelete, setPostIdToDelete] = useState(null);
//   const csrfToken = useCsrf();

  
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const postsResponse = await fetch("/api/posts/posts?with[]=user&with[]=attachments&with[]=accessibilities", {
//           method: "GET",
//         });
//         if (!postsResponse.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const postsData = await postsResponse.json();

//         const posts = postsData.data.data.map((post) => {
//           post.attachments = Array.isArray(post.attachments) ? post.attachments : [post.attachments];
//           return post;
//         });

//         const postsWithUserProfiles = await Promise.all(posts.map(async (post) => {
//           const userProfileResponse = await fetch(`/api/users/users/${post.user_id}?with[]=profile`, {
//             method: "GET",
//           });
//           const userProfileData = await userProfileResponse.json();
//           post.userProfile = userProfileData.data; // Attach user profile to the post

//           // Fetch department names if post has accessibilities
//           if (Array.isArray(post.accessibilities) && post.accessibilities.length > 0) {
//             const departmentNames = await Promise.all(post.accessibilities.map(async (accessibility) => {
//               if (accessibility.accessable_type === accessibility.accessable_type) {
//                 const departmentResponse = await fetch(`/api/department/departments/${accessibility.accessable_id}`);
//                 const departmentData = await departmentResponse.json();
//                 return departmentData.data.name;
//               }
//               return null;
//             }));
//             console.log("DD", departmentNames);
//             post.departmentNames = departmentNames.filter(name => name !== null).join(', '); // Combine department names
//           } else {
//             post.departmentNames = null;
//           }
          
//           return post;
//         }));

//         setPostData(postsWithUserProfiles);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);




//   // Filter posts based on accessable_type and accessable_id
//   let filteredPostData = postData.filter(post => post.type !== 'story');

//   if (filterType !== null && filterId !== null) {
//     filteredPostData = filteredPostData.filter((post) => {
//       if (Array.isArray(post.accessibilities) && post.accessibilities.length > 0) {
//         return post.accessibilities.some(accessibility => 
//           accessibility.accessable_type === filterType && accessibility.accessable_id == filterId
//         );
//       }
//       return false;
//     });
//   }

//   console.log("USER_ID", userId);

  
//   const userPosts = userId ? postData.filter(post => post.user.id === userId && post.type !== 'story') : [];


//   // Reverse the order of posts to display latest first
//   const reversedUserPosts = userId ? [...userPosts].reverse() : [];
//   const reversedFilteredPosts = filterType ? [...filteredPostData].reverse() : [...filteredPostData].reverse();

//   console.log("userPosts", reversedUserPosts);


//   const togglePopup = (index) => {
//     setIsPopupOpen((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }));
//   };

//   const formatTimeAgo = (date) => {
//     return formatDistanceToNow(new Date(date), { addSuffix: true });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }


//   const handleEdit = (post) => {
//     console.log("EDITTING...");
//     setCurrentEditPost(post);
//     setIsEditModalOpen(true);
//   };
  

//   const handleDelete = async () => {
//     // console.log("POST_ID", postIdToDelete);
//     try {
//       const response = await fetch(`/api/posts/posts/${postIdToDelete}`, {
//         method: 'DELETE',
//         headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
//       });

//       if (response.ok) {
//         console.log(`Post with ID ${postIdToDelete} deleted successfully.`);
//         setPostData(postData.filter(post => post.id !== postIdToDelete));
//       } else {
//         console.error(`Failed to delete post with ID ${postIdToDelete}.`);
//       }
//     } catch (error) {
//       console.error(`Error deleting post with ID ${postIdToDelete}:`, error);
//     }
//     setShowDeletePopup(false);
//   };

//   const confirmDelete = (postId) => {
//     console.log("POST_ID", postId);
//     setPostIdToDelete(postId);
//     setShowDeletePopup(true);
//   };

//   console.log("RR", reversedFilteredPosts);


//   return (
//     <>
//       {polls.map((poll, index) => (
//         <div className="input-box-container" style={{ height: "auto", marginTop: "-10px" }} key={poll.id}>
//           <article className="flex flex-col px-5 py-4 bg-white rounded-xl shadow-sm max-w-[610px] max-md:pl-5">
//             <ProfileHeader name="Fareez Hishamuddin" timeAgo="1 day ago" profileImageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/726408370b648407cc55fec1ee24245aad060d459ac0f498438d167758c3a165?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" profileImageAlt="Profile image of Thomas" />
//             <div className="poll">
//               <h3>{poll.content}</h3>
//               <ul>
//                 {poll.options.map((option, i) => (
//                   <li key={i}>
//                     <FeedbackOption optionText={`${option} (${calculatePercentage(poll.id, i)}%)`} onVote={() => handleVote(poll.id, i)} />
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <FeedbackForm />
//             <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d36c4e55abf5012ece1a90ed95737b46c9b6970a05e3182fdd6248adca09028e?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" alt="" className="mt-6 aspect-[4.55] w-[76px]" />
//           </article>
//         </div>
//       ))}
//       {userId ? reversedUserPosts.map((post, index) => (
//         <div key={post.id} className="">
//           <article className="mt-4 p-4 border rounded-2xl bg-white border-2 shadow-xl w-[610px] relative">
//             <header className="flex px-px w-full max-md:flex-wrap max-md:max-w-full">
//               <div className="flex gap-1 mt-2">
//               </div>
//               <div className="flex justify-between items-start px-1 w-full mb-4 p-2 -ml-2 -mt-3">
//                 <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
//                   <div className="flex gap-1.5 -mt-1">
//                     <img 
//                       loading="lazy" 
//                       src={
//                         post.userProfile.profile?.image 
//                             ? (
//                                 post.userProfile.profile.image === '/assets/dummyStaffPlaceHolder.jpg'
//                                     ? post.userProfile.profile.image
//                                     : post.userProfile.profile.image.startsWith('avatar/')
//                                         ? `/storage/${post.userProfile.profile.image}`
//                                         : `/avatar/${post.userProfile.profile.image}`
//                             )
//                             : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(post.user.name)}&rounded=true`
//                     }
//                       alt={post.user.name} 
//                       className="shrink-0 aspect-square w-[53px] rounded-image" 
//                     />
//                     <div className="flex flex-col my-auto">
//                       <div className="text-base font-semibold text-neutral-800">{post.user.name}</div>
//                       <time className="mt-1 text-xs text-neutral-800 text-opacity-50">{formatTimeAgo(post.created_at)}</time>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-semibold text-neutral-800 bg-gray-200 rounded-md px-2 py-1 -mt-5">
//                       {post.accessibilities?.map((accessibility, index) => (
//                         <span key={index}>
//                           {accessibility.accessable_type}{": "}
//                         </span>
//                       ))}
//                       {post.departmentNames ? post.departmentNames : post.type}
//                     </span>
//                     <img loading="lazy" src="/assets/wallpost-dotbutton.svg" alt="Options" className="shrink-0 my-auto aspect-[1.23] fill-red-500 w-6 cursor-pointer mt-1" onClick={() => togglePopup(index)} />
//                   </div>
//                 </div>
//               </div>
//               {isPopupOpen[index] && (
//                 <div className="absolute bg-white border-2 rounded-xl p-1 shadow-lg mt-6 right-0 w-[160px] h-auto z-10 ">
//                   <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl  p-2" onClick={() => handleEdit(index)}><img className="w-6 h-6" src="/assets/EditIcon.svg" alt="Edit" />Edit</p>
//                   <div className="font-extrabold text-neutral-800 mb-1 mt-1 border-b-2 border-neutral-300"></div>
//                   <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" onClick={() => confirmDelete(post.id)}><img className="w-6 h-6" src="/assets/DeleteIcon.svg" alt="Delete" />Delete</p>
//                   <div className="font-extrabold text-neutral-800 mb-2 mt-1 border-b-2 border-neutral-300"></div>
//                   <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" onClick={() => handleAnnouncement(index)}><img className="w-6 h-6" src="/assets/AnnounceIcon.svg" alt="Announcement" />Announcement</p>
//                 </div>
//               )}
//             </header>
//             <div className="post-content break-words overflow-hidden" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
//               {post.content}
//             </div>
//             <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 underline max-md:max-w-full">
//               {post.tag}
//             </p>
//             <div className="grid grid-cols-3 gap-2 mt-2">
//               {post.attachments.map((attachment, index) => (
//                 <div key={index} className="attachment">
//                   {attachment.mime_type.startsWith("image/") ? (
//                     <img src={`/storage/${attachment.path}`} alt="attachment" className="w-full h-auto rounded-lg" />
//                   ) : attachment.mime_type.startsWith("video/") ? (
//                     <video controls className="max-w-full h-auto rounded-md">
//                       <source src={`/storage/${attachment.path}`} alt="attachment" className="w-full h-auto rounded-lg" />
//                       Your browser does not support the video tag.
//                     </video>
//                   ) :  (
//                     <a href={`/storage/${attachment.path}`} download className="block w-full h-24 bg-gray-100 rounded-lg text-xs font-semibold text-center leading-24">
//                       Download {attachment.file_name}
//                     </a>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-start gap-2 w-5 h-5 mt-2">
//               <img src='/assets/likeforposting.svg' alt="Like" className="w-6 h-6 cursor-pointer" />
//               <img src='/assets/commentforposting.svg' alt="Comment" className="w-6 h-6 cursor-pointer" />
//               <img src='/assets/shareforposting.svg' alt="Share" className="w-6 h-6 cursor-pointer" />
//             </div>
//           </article>
//         </div>
//       )) : reversedFilteredPosts.map((post, index) => (
//         <div key={post.id} className="">
//           <article className="mt-4 p-4 border rounded-2xl bg-white border-2 shadow-xl w-[610px] relative">
//             <header className="flex px-px w-full max-md:flex-wrap max-md:max-w-full">
//               <div className="flex gap-1 mt-2">
//               </div>
//               <div className="flex justify-between items-start px-1 w-full mb-4 p-2 -ml-2 -mt-3">
//                 <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
//                   <div className="flex gap-1.5 -mt-1">
//                     <img 
//                       loading="lazy" 
//                       src={
//                         post.userProfile.profile?.image 
//                             ? (
//                                 post.userProfile.profile.image === '/assets/dummyStaffPlaceHolder.jpg'
//                                     ? post.userProfile.profile.image
//                                     : post.userProfile.profile.image.startsWith('avatar/')
//                                         ? `/storage/${post.userProfile.profile.image}`
//                                         : `/avatar/${post.userProfile.profile.image}`
//                             )
//                             : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(post.user.name)}&rounded=true`
//                     } 
//                       alt={post.user.name} 
//                       className="shrink-0 aspect-square w-[53px] rounded-image" 
//                     />
//                     <div className="flex flex-col my-auto">
//                       <div className="text-base font-semibold text-neutral-800">{post.user.name}</div>
//                       <time className="mt-1 text-xs text-neutral-800 text-opacity-50">{formatTimeAgo(post.created_at)}</time>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-semibold text-neutral-800 bg-gray-200 rounded-md px-2 py-1 -mt-5">
//                       {post.accessibilities?.map((accessibility, index) => (
//                         <span key={index}>
//                           {accessibility.accessable_type}{": "}
//                         </span>
//                       ))}
//                       {post.departmentNames ? post.departmentNames : post.type}
//                     </span>
//                     <img loading="lazy" src="/assets/wallpost-dotbutton.svg" alt="Options" className="shrink-0 my-auto aspect-[1.23] fill-red-500 w-6 cursor-pointer mt-1" onClick={() => togglePopup(index)} />
//                   </div>
//                 </div>
//               </div>
//               {isPopupOpen[index] && (
//                 <div className="absolute bg-white border-2 rounded-xl p-1 shadow-lg mt-6 right-0 w-[160px] h-auto z-10 ">
//                   <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl  p-2" onClick={() => handleEdit(post)}><img className="w-6 h-6" src="/assets/EditIcon.svg" alt="Edit" />Edit</p>
//                   <div className="font-extrabold text-neutral-800 mb-1 mt-1 border-b-2 border-neutral-300"></div>
//                   <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" onClick={() => confirmDelete(post.id)}>
//                   <img className="w-6 h-6" src="/assets/DeleteIcon.svg" alt="Delete" />Delete</p>
//                   <div className="font-extrabold text-neutral-800 mb-2 mt-1 border-b-2 border-neutral-300"></div>
//                   <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" onClick={() => handleAnnouncement(index)}><img className="w-6 h-6" src="/assets/AnnounceIcon.svg" alt="Announcement" />Announcement</p>
//                 </div>
//               )}
//             </header>
//             <div className="post-content break-words overflow-hidden" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
//               {post.content}
//             </div>
//             <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 underline max-md:max-w-full">
//               {post.tag}
//             </p>
//             {post.attachments.length > 0 && (
//                 <div className="mt-4">
//                   <PostAttachments attachments={post.attachments} />
//                 </div>
//               )}
//             <div className="flex justify-start gap-2 w-5 h-5 mt-2">
//               <img src='/assets/likeforposting.svg' alt="Like" className="w-6 h-6 cursor-pointer" />
//               <img src='/assets/commentforposting.svg' alt="Comment" className="w-6 h-6 cursor-pointer" />
//               <img src='/assets/shareforposting.svg' alt="Share" className="w-6 h-6 cursor-pointer" />
//             </div>
//           </article>
//         </div>
//       ))}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={() => setIsEditModalOpen(false)}></div>
//           <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
//             <EditPost post={currentEditPost} loggedInUserId={loggedInUserId} onClose={() => setIsEditModalOpen(false)} />
//           </div>
//         </div>
//       )}
//       {showDeletePopup && (
//                 <div
//                     style={{
//                         position: 'fixed',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         backgroundColor: 'white',
//                         borderRadius: '8px',
//                         padding: '20px',
//                         boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)',
//                         zIndex: 10000,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         minWidth: '400px',
//                     }}
//                 >
//                     <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: 'larger' }}>
//                         <h2>Delete the Story?</h2>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
//                         <button
//                             onClick={handleDelete}
//                             style={{
//                                 backgroundColor: '#E53935',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '25px',
//                                 width: '80px',
//                                 padding: '10px 20px',
//                                 cursor: 'pointer',
//                                 marginRight: '10px',
//                             }}
//                         >
//                             Yes
//                         </button>
//                         <button
//                             // onClick={handleClosePopup}
//                             style={{
//                                 backgroundColor: 'white',
//                                 color: '#333',
//                                 border: '1px solid #ccc',
//                                 borderRadius: '25px',
//                                 width: '80px',
//                                 padding: '10px 20px',
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             No
//                         </button>
//                     </div>
//                 </div>
//             )}
//     </>
//   );
// }

// export default OutputData;




// {/* {post.attachments.map((attachment, index) => (
//                 <div key={index} className="attachment">
//                   {attachment.mime_type.startsWith("image/") ? (
//                     <img src={`/storage/${attachment.path}`} alt="attachment" className="w-full h-auto rounded-lg" />
//                   ) : attachment.mime_type.startsWith("video/") ? (
//                     <video controls className="grow shrink-0 max-w-full aspect-[1.19] w-full">
//                       <source src={`/storage/${attachment.path}`} alt="attachment" className="grow shrink-0 max-w-full aspect-[1.19] w-full" />
//                       Your browser does not support the video tag.
//                     </video>
//                   ) : (
//                     <a href={`/storage/${attachment.path}`} download className="block w-full h-24 bg-gray-100 rounded-lg text-xs font-semibold text-center leading-24">
//                       Download {attachment.file_name}
//                     </a>
//                   )}
//                 </div>
//               ))} */}



import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import EditPost from './EditPost';
import './index.css'
import { useCsrf } from "@/composables";


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

function FeedbackOption({ optionText }) {
  return (
    <div className="flex gap-2.5 px-3.5 py-2.5 mt-4 text-sm leading-5 bg-gray-100 rounded-3xl text-neutral-800 max-md:flex-wrap">
      <div className="shrink-0 self-start w-3 bg-white rounded-full h-[11px]" />
      <div className="flex-auto max-md:max-w-full">{optionText}</div>
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
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3c193bbbcd5eca7bf933dad4a6932d076b04eb038d7635c591737bbebdc61ef?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" alt="" className="shrink-0 self-start aspect-[3.85] w-[19px]" />
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

function OutputData({ polls, filterType, filterId, userId, loggedInUserId }) {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditPost, setCurrentEditPost] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const csrfToken = useCsrf();

  
  useEffect(() => {
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
          post.userProfile = userProfileData.data; // Attach user profile to the post

          // Fetch department names if post has accessibilities
          if (Array.isArray(post.accessibilities) && post.accessibilities.length > 0) {
            const departmentNames = await Promise.all(post.accessibilities.map(async (accessibility) => {
              if (accessibility.accessable_type === accessibility.accessable_type) {
                const departmentResponse = await fetch(`/api/department/departments/${accessibility.accessable_id}`);
                const departmentData = await departmentResponse.json();
                return departmentData.data.name;
              }
              return null;
            }));
            console.log("DD", departmentNames);
            post.departmentNames = departmentNames.filter(name => name !== null).join(', '); // Combine department names
          } else {
            post.departmentNames = null;
          }
          
          return post;
        }));

        setPostData(postsWithUserProfiles);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter posts based on accessable_type and accessable_id
  // let filteredPostData = postData.filter(post => post.type !== 'story');
  let filteredPostData = postData.filter(post => post.type !== 'story' && post.type !== 'files');


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

  console.log("USER_ID", userId);

  
  // const userPosts = userId ? postData.filter(post => post.user.id === userId && post.type !== 'story') : [];
  const userPosts = userId ? postData.filter(post => post.user.id === userId && post.type !== 'story' && post.type !== 'files') : [];



  // Reverse the order of posts to display latest first
  const reversedUserPosts = userId ? [...userPosts].reverse() : [];
  const reversedFilteredPosts = filterType ? [...filteredPostData].reverse() : [...filteredPostData].reverse();

  console.log("userPosts", reversedUserPosts);


  const togglePopup = (index) => {
    setIsPopupOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const formatTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  const handleEdit = (post) => {
    console.log("EDITTING...");
    setCurrentEditPost(post);
    setIsEditModalOpen(true);
  };
  

  const handleDelete = async () => {
    // console.log("POST_ID", postIdToDelete);
    try {
      const response = await fetch(`/api/posts/posts/${postIdToDelete}`, {
        method: 'DELETE',
        headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
      });

      if (response.ok) {
        console.log(`Post with ID ${postIdToDelete} deleted successfully.`);
        setPostData(postData.filter(post => post.id !== postIdToDelete));
      } else {
        console.error(`Failed to delete post with ID ${postIdToDelete}.`);
      }
    } catch (error) {
      console.error(`Error deleting post with ID ${postIdToDelete}:`, error);
    }
    setShowDeletePopup(false);
  };

  const confirmDelete = (postId) => {
    console.log("POST_ID", postId);
    setPostIdToDelete(postId);
    setShowDeletePopup(true);
  };

  console.log("RR", reversedFilteredPosts);


  return (
    <>
      {polls.map((poll, index) => (
        <div className="input-box-container" style={{ height: "auto", marginTop: "-10px" }} key={poll.id}>
          <article className="flex flex-col px-5 py-4 bg-white rounded-xl shadow-sm max-w-[610px] max-md:pl-5">
            <ProfileHeader name="Fareez Hishamuddin" timeAgo="1 day ago" profileImageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/726408370b648407cc55fec1ee24245aad060d459ac0f498438d167758c3a165?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" profileImageAlt="Profile image of Thomas" />
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
      {userId ? reversedUserPosts.map((post, index) => (
        <div key={post.id} className="">
          <article className="mt-4 p-4 border rounded-2xl bg-white border-2 shadow-xl w-[610px] relative">
            <header className="flex px-px w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 mt-2">
              </div>
              <div className="flex justify-between items-start px-1 w-full mb-4 p-2 -ml-2 -mt-3">
                <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-1.5 -mt-1">
                    {/* <img loading="lazy" src={`/storage/${post.userProfile?.profile.image}` ?? `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(post.user.name)}&rounded=true`} alt={post.user.name} className="shrink-0 aspect-square w-[53px] rounded-image" /> */}
                    <img 
                      loading="lazy" 
                      // src={
                      //   post.userProfile?.profile.image 
                      //     ? `/storage/${post.userProfile.profile.image}` 
                      //     : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(post.user.name)}&rounded=true`
                      // } 
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
                  <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl  p-2" onClick={() => handleEdit(index)}><img className="w-6 h-6" src="/assets/EditIcon.svg" alt="Edit" />Edit</p>
                  <div className="font-extrabold text-neutral-800 mb-1 mt-1 border-b-2 border-neutral-300"></div>
                  <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" onClick={() => confirmDelete(post.id)}><img className="w-6 h-6" src="/assets/DeleteIcon.svg" alt="Delete" />Delete</p>
                  <div className="font-extrabold text-neutral-800 mb-2 mt-1 border-b-2 border-neutral-300"></div>
                  <p className="cursor-pointer flex flex-row hover:bg-blue-100 rounded-xl p-2" onClick={() => handleAnnouncement(index)}><img className="w-6 h-6" src="/assets/AnnounceIcon.svg" alt="Announcement" />Announcement</p>
                </div>
              )}
            </header>
            <div className="post-content break-words overflow-hidden" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
              {post.content}
            </div>
            <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 underline max-md:max-w-full">
              {post.tag}
            </p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {post.attachments.map((attachment, index) => (
                <div key={index} className="attachment">
                  {attachment.mime_type.startsWith("image/") ? (
                    <img src={`/storage/${attachment.path}`} alt="attachment" className="w-full h-auto rounded-lg" />
                  ) : attachment.mime_type.startsWith("video/") ? (
                    <video controls className="max-w-full h-auto rounded-md">
                      <source src={`/storage/${attachment.path}`} alt="attachment" className="w-full h-auto rounded-lg" />
                      Your browser does not support the video tag.
                    </video>
                  ) :  (
                    <a href={`/storage/${attachment.path}`} download className="block w-full h-24 bg-gray-100 rounded-lg text-xs font-semibold text-center leading-24">
                      Download {attachment.file_name}
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-start gap-2 w-5 h-5 mt-2">
              <img src='/assets/likeforposting.svg' alt="Like" className="w-6 h-6 cursor-pointer" />
              <img src='/assets/commentforposting.svg' alt="Comment" className="w-6 h-6 cursor-pointer" />
              <img src='/assets/shareforposting.svg' alt="Share" className="w-6 h-6 cursor-pointer" />
            </div>
          </article>
        </div>
      )) : reversedFilteredPosts.map((post, index) => (
        <div key={post.id} className="">
          <article className="mt-4 p-4 border rounded-2xl bg-white border-2 shadow-xl w-[610px] relative">
            <header className="flex px-px w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 mt-2">
              </div>
              <div className="flex justify-between items-start px-1 w-full mb-4 p-2 -ml-2 -mt-3">
                <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-1.5 -mt-1">
                    {/* <img loading="lazy" src={`/storage/${post.userProfile?.profile.image}` ?? `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(post.user.name)}&rounded=true`} alt={post.user.name} className="shrink-0 aspect-square w-[53px] rounded-image" /> */}
                    <img 
                      loading="lazy" 
                      // src={
                      //   post.userProfile.profile?.image 
                      //     ? `/storage/${post.userProfile.profile.image}` 
                      //     : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(post.user.name)}&rounded=true`
                      // }
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
              {/* {post.tag} */}
              {post.tag.replace(/[\[\]"]/g, '')}
            </p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {post.attachments.map((attachment, index) => (
                <div key={index} className="attachment">
                  {attachment.mime_type.startsWith("image/") ? (
                    <img src={`/storage/${attachment.path}`} alt="attachment" className="w-full h-auto rounded-lg" />
                  ) : attachment.mime_type.startsWith("video/") ? (
                    <video controls className="grow shrink-0 max-w-full aspect-[1.19] w-full">
                      <source src={`/storage/${attachment.path}`} alt="attachment" className="grow shrink-0 max-w-full aspect-[1.19] w-full" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <a href={`/storage/${attachment.path}`} download className="block w-full h-24 bg-gray-100 rounded-lg text-xs font-semibold text-center leading-24">
                      Download {attachment.file_name}
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-start gap-2 w-5 h-5 mt-2">
              <img src='/assets/likeforposting.svg' alt="Like" className="w-6 h-6 cursor-pointer" />
              <img src='/assets/commentforposting.svg' alt="Comment" className="w-6 h-6 cursor-pointer" />
              <img src='/assets/shareforposting.svg' alt="Share" className="w-6 h-6 cursor-pointer" />
            </div>
          </article>
        </div>
      ))}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
            <EditPost post={currentEditPost} loggedInUserId={loggedInUserId} onClose={() => setIsEditModalOpen(false)} />
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