// import * as React from "react";
// import { useState, useEffect } from "react";

// function Avatar({ src, alt }) {
//   return <img loading="lazy" src={src} alt={alt} className="shrink-0 aspect-square w-[53px]" />;
// }

// function UserInfo({ name, timestamp }) {
//   return (
//     <div className="flex flex-col my-auto">
//       <div className="text-base font-bold text-neutral-800">{name}</div>
//       <div className="mt-3 text-xs text-neutral-800 text-opacity-50">{timestamp}</div>
//     </div>
//   );
// }

// function IconButton({ src, alt }) {
//   return <img loading="lazy" src={src} alt={alt} className="shrink-0 w-7 aspect-square" />;
// }

// function OutputData() {
//   const [postData, setPostData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/crud/posts?with[]=attachments", {
//       method: "GET",
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Posts data:", data.data.data);
//         const posts = data.data.data.map((post) => {
//           post.attachments = Array.isArray(post.attachments) ? post.attachments : [post.attachments];
//           return post;
//         });
//         setPostData(posts);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching posts:", error);
//         setLoading(false);
//       });
//   }, []);

//   const icons = [
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/594907e3c69b98b6d0101683915b195ce42280c8ba80773ecd95b387436ea664?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&", alt: "Icon 1" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/202b9f1277b73cbc2e1879918537061084b7287ef0a87b496a5b16d68837ff74?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&", alt: "Icon 2" },
//   ];

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       {postData && postData.map((post) => (
//         <div key={post.id} className="input-box-container" style={{ height: "auto", marginTop: "-10px" }}>
//           <article className="flex flex-col px-5 pb-2.5 bg-white rounded-2xl shadow-sm max-w-[610px]">
//             <header className="flex gap-5 justify-between items-start px-px w-full max-md:flex-wrap max-md:max-w-full">
//               <div className="flex gap-1 mt-2">
//                 {/* <Avatar src={post.user.avatar} alt={`${post.user.name}'s avatar`} /> */}
//                 {/* <UserInfo name={post.user.name} timestamp={post.timestamp} /> */}
//               </div>
//               <div className="flex gap-5 justify-between">
//                 {icons.map((icon, index) => (
//                   <IconButton key={index} src={icon.src} alt={icon.alt} />
//                 ))}
//               </div>
//             </header>
//             <p className="mt-2.5 text-base leading-6 text-neutral-800 max-md:max-w-full">
//               {post.content}
//             </p>
//             <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 underline max-md:max-w-full">
//               {post.tag}
//             </p>
//             {/* Render attachments */}
//             <div className="grid grid-cols-3 gap-2 mt-2">
//               {post.attachments.map((attachment, index) => (
//                 <div key={index} className="attachment">
//                   {attachment.mime_type.startsWith("image/") ? (
//                     <img src={`/storage/${attachment.path}`} alt="Attachment" className="w-full h-32 object-cover" />
//                   ) : attachment.mime_type.startsWith("video/") ? (
//                     <video controls className="w-full h-32 object-cover">
//                       <source src={`/storage/${attachment.path}`} type={attachment.mime_type} />
//                       Your browser does not support the video tag.
//                     </video>
//                   ) : (
//                     <a href={`/storage/${attachment.path}`} target="_blank" rel="noopener noreferrer">
//                       {attachment.path.split("/").pop()}
//                     </a>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </article>
//         </div>
//       ))}
//     </>
//   );
// }

// export default OutputData;



// import * as React from "react";
// import { useState, useEffect, useRef } from "react";

// function Avatar({ src, alt }) {
//   return <img loading="lazy" src={src} alt={alt} className="shrink-0 aspect-square w-[53px]" />;
// }

// function UserInfo({ name, timestamp }) {
//   return (
//     <div className="flex flex-col my-auto">
//       <div className="text-base font-bold text-neutral-800">{name}</div>
//       <div className="mt-3 text-xs text-neutral-800 text-opacity-50">{timestamp}</div>
//     </div>
//   );
// }

// function FeedbackOption({ optionText }) {
//     return (
//       <div className="flex gap-2.5 px-3.5 py-2.5 mt-4 text-sm leading-5 bg-gray-100 rounded-3xl text-neutral-800 max-md:flex-wrap">
//         <div className="shrink-0 self-start w-3 bg-white rounded-full h-[11px]" />
//         <div className="flex-auto max-md:max-w-full">{optionText}</div>
//       </div>
//     );
//   }

// function ProfileHeader({ name, timeAgo, profileImageSrc, profileImageAlt }) {
//     return (
//       <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
//         <div className="flex gap-1.5">
//           <img loading="lazy" src={profileImageSrc} alt={profileImageAlt} className="shrink-0 aspect-square w-[53px]" />
//           <div className="flex flex-col my-auto">
//             <div className="text-base font-semibold text-neutral-800">{name}</div>
//             <time className="mt-3 text-xs text-neutral-800 text-opacity-50">{timeAgo}</time>
//           </div>
//         </div>
//         <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3c193bbbcd5eca7bf933dad4a6932d076b04eb038d7635c591737bbebdc61ef?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" alt="" className="shrink-0 self-start aspect-[3.85] w-[19px]" />
//       </header>
//     );
//   }


//   function FeedbackForm() {
//   const [inputValue, setInputValue] = useState("");
//   const textAreaRef = useRef(null);

//     const handleChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     const HandleFeedbackClick = () => {
//         console.log('Sending Form...');
//     };
//     return (
//       <form className="flex gap-3.5 mt-4 max-md:flex-wrap max-md:max-w-full">
//         {/* <div className="mt-6 text-sm font-medium text-neutral-500 max-md:max-w-full"> */}
//             <textarea
//               ref={textAreaRef}
//               value={inputValue}
//               onChange={handleChange}
//               placeholder="Give Your Feedback"
//               className="grow justify-center items-start px-5 py-3 text-sm leading-5 rounded-md border border-gray-100 border-solid text-neutral-800 text-opacity-50 w-fit max-md:px-5 max-md:max-w-full"
//               rows="4"
//               style={{ maxHeight: "30px", overflowY: "auto" }}
//             />
//           {/* </div> */}
//         {/* <button className="grow justify-center items-start px-5 py-3 text-sm leading-5 rounded-md border border-gray-100 border-solid text-neutral-800 text-opacity-50 w-fit max-md:px-5 max-md:max-w-full">
//           Give Your Feedback
//         </button> */}
//         <button className="flex flex-col justify-center my-auto text-xs font-semibold leading-5 text-center text-white whitespace-nowrap px-6 py-2 bg-red-500 rounded-2xl max-md:px-5" onClick={HandleFeedbackClick}>
//           Send
//         </button>
//       </form>
//     );
//   }

// function IconButton({ src, alt }) {
//   return <img loading="lazy" src={src} alt={alt} className="shrink-0 w-7 aspect-square" />;
// }

// function OutputData({ polls }) {
//   const [postData, setPostData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/crud/posts?with[]=attachments", {
//       method: "GET",
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const posts = data.data.data.map((post) => {
//           post.attachments = Array.isArray(post.attachments) ? post.attachments : [post.attachments];
//           return post;
//         });
//         setPostData(posts);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching posts:", error);
//         setLoading(false);
//       });
//   }, []);

//   const icons = [
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/594907e3c69b98b6d0101683915b195ce42280c8ba80773ecd95b387436ea664?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&", alt: "Icon 1" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/202b9f1277b73cbc2e1879918537061084b7287ef0a87b496a5b16d68837ff74?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&", alt: "Icon 2" },
//   ];

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       {polls.map((poll, index) => (
//         <div className="input-box-container" style={{ height: "auto", marginTop: "-10px" }}>
//         <article className="flex flex-col px-5 py-4 bg-white rounded-xl shadow-sm max-w-[610px] max-md:pl-5">
//         <ProfileHeader name="Fareez Hishamuddin" timeAgo="1 day ago" profileImageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/726408370b648407cc55fec1ee24245aad060d459ac0f498438d167758c3a165?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" profileImageAlt="Profile image of Thomas" />
//         {/* <p className="mt-3 text-base leading-6 text-neutral-800 max-md:max-w-full"> */}
//         <div key={index} className="poll">
//           <h3>{poll.content}</h3>
//           <ul>
//             {poll.options.map((option, i) => (
//             //   <li key={i}>{option}</li>
//                 <FeedbackOption key={i} optionText={option} />
//             ))}
//           </ul>
//           {/* <p>Allow multiple answers: {poll.allowMultipleAnswers ? "Yes" : "No"}</p> */}
//         </div>
//         <FeedbackForm />
//       <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d36c4e55abf5012ece1a90ed95737b46c9b6970a05e3182fdd6248adca09028e?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" alt="" className="mt-6 aspect-[4.55] w-[76px]" />
//         </article>
//         </div>
//       ))}
//       {postData && postData.map((post) => (
//         <div key={post.id} className="input-box-container" style={{ height: "auto", marginTop: "-10px" }}>
//           <article className="flex flex-col px-5 pb-2.5 bg-white rounded-2xl shadow-sm max-w-[610px]">
//             <header className="flex gap-5 justify-between items-start px-px w-full max-md:flex-wrap max-md:max-w-full">
//               <div className="flex gap-1 mt-2">
//                 {/* <Avatar src={post.user.avatar} alt={`${post.user.name}'s avatar`} /> */}
//                 {/* <UserInfo name={post.user.name} timestamp={post.timestamp} /> */}
//               </div>
//               <div className="flex gap-5 justify-between">
//                 {icons.map((icon, index) => (
//                   <IconButton key={index} src={icon.src} alt={icon.alt} />
//                 ))}
//               </div>
//             </header>
//             <p className="mt-2.5 text-base leading-6 text-neutral-800 max-md:max-w-full">
//               {post.content}
//             </p>
//             <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 underline max-md:max-w-full">
//               {post.tag}
//             </p>
//             <div className="grid grid-cols-3 gap-2 mt-2">
//               {post.attachments.map((attachment, index) => (
//                 <div key={index} className="attachment">
//                   {attachment.mime_type.startsWith("image/") ? (
//                     <img src={`/storage/${attachment.path}`} alt="attachment" className="w-full h-auto rounded-lg" />
//                   ) : (
//                     <a href={`/storage/${attachment.path}`} download className="block w-full h-24 bg-gray-100 rounded-lg text-xs font-semibold text-center leading-24">
//                       Download {attachment.file_name}
//                     </a>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </article>
//         </div>
//       ))}
//     </>
//   );
// }

// export default OutputData;



import * as React from "react";
import { useState, useEffect, useRef } from "react";

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

  const HandleFeedbackClick = () => {
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
      <button className="flex flex-col justify-center my-auto text-xs font-semibold leading-5 text-center text-white whitespace-nowrap px-6 py-2 bg-red-500 rounded-2xl max-md:px-5" onClick={HandleFeedbackClick}>
        Send
      </button>
    </form>
  );
}

function IconButton({ src, alt }) {
  return <img loading="lazy" src={src} alt={alt} className="shrink-0 w-7 aspect-square" />;
}

function OutputData({ polls }) {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/crud/posts?with[]=attachments", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const posts = data.data.data.map((post) => {
          post.attachments = Array.isArray(post.attachments) ? post.attachments : [post.attachments];
          return post;
        });
        setPostData(posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const icons = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/594907e3c69b98b6d0101683915b195ce42280c8ba80773ecd95b387436ea664?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&", alt: "Icon 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/202b9f1277b73cbc2e1879918537061084b7287ef0a87b496a5b16d68837ff74?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&", alt: "Icon 2" },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {polls.map((poll, index) => (
        <div className="input-box-container" style={{ height: "auto", marginTop: "-10px" }}>
          <article className="flex flex-col px-5 py-4 bg-white rounded-xl shadow-sm max-w-[610px] max-md:pl-5">
            <ProfileHeader name="Fareez Hishamuddin" timeAgo="1 day ago" profileImageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/726408370b648407cc55fec1ee24245aad060d459ac0f498438d167758c3a165?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" profileImageAlt="Profile image of Thomas" />
            <div key={index} className="poll">
              <h3>{poll.content}</h3>
              <ul>
                {poll.options.map((option, i) => (
                  <FeedbackOption key={i} optionText={option} />
                ))}
              </ul>
            </div>
            <FeedbackForm />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d36c4e55abf5012ece1a90ed95737b46c9b6970a05e3182fdd6248adca09028e?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" alt="" className="mt-6 aspect-[4.55] w-[76px]" />
          </article>
        </div>
      ))}
      {postData && postData.map((post) => (
        <div key={post.id} className="input-box-container" style={{ height: "auto", marginTop: "-10px" }}>
          <article className="flex flex-col px-5 pb-2.5 bg-white rounded-2xl shadow-sm max-w-[610px]">
            <header className="flex gap-5 justify-between items-start px-px w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 mt-2">
                {/* <Avatar src={post.user.avatar} alt={`${post.user.name}'s avatar`} /> */}
                {/* <UserInfo name={post.user.name} timestamp={post.timestamp} /> */}
              </div>
              <div className="flex gap-5 justify-between">
                {icons.map((icon, index) => (
                  <IconButton key={index} src={icon.src} alt={icon.alt} />
                ))}
              </div>
            </header>
            <p className="mt-2.5 text-base leading-6 text-neutral-800 max-md:max-w-full">
              {post.content}
            </p>
            <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 underline max-md:max-w-full">
              {post.tag}
            </p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {post.attachments.map((attachment, index) => (
                <div key={index} className="attachment">
                  {attachment.mime_type.startsWith("image/") ? (
                    <img src={`/storage/${attachment.path}`} alt="attachment" className="w-full h-32 object-cover" />
                  ) : attachment.mime_type.startsWith("video/") ? (
                    <video controls className="w-full h-32 object-cover">
                      <source src={`/storage/${attachment.path}`} type={attachment.mime_type} />
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
          </article>
        </div>
      ))}
    </>
  );
}

export default OutputData;
