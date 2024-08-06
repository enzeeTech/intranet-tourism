import React, { useState, useEffect } from 'react';
import { useCsrf } from "@/composables";
import Stories from 'react-insta-stories';
import './styles.css'

const CreateImageStory = ({ file, onClose, onPostStory, userId, onGoBack }) => {
  const [image, setImage] = useState(null); // State to store the uploaded image file
  const [text, setText] = useState(''); // State to store the text input
  const [previewUrl, setPreviewUrl] = useState(''); // State to store the preview URL of the image
  const csrfToken = useCsrf(); // Get CSRF token for secure form submission

  useEffect(() => {
    if (file) {
      const reader = new FileReader(); // Create a new FileReader to read the uploaded file
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Set the preview URL once the file is read
      };
      reader.readAsDataURL(file); // Read the file as a data URL
      setImage(file); // Set the image file state
    }
  }, [file]); // Run this effect when the `file` changes

  const handleTextChange = (e) => {
    setText(e.target.value); // Update the text state on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const formData = new FormData(); // Create a new FormData object to send the form data
    formData.append('user_id', userId); // Append user ID to the form data
    formData.append('type', 'story'); // Append type to the form data
    formData.append('visibility', 'public'); // Append visibility to the form data
    formData.append('content', text); // Append text content to the form data
    formData.append('tag', JSON.stringify([])); // Append an empty array for tags

    if (image) {
      formData.append('attachments[0]', image); // Append the image file to the form data
    }

    try {
      const response = await fetch('/api/posts/posts', {
        method: 'POST',
        body: formData, // Set the request body to the form data
        headers: {
          Accept: 'application/json',
          'X-CSRF-Token': csrfToken // Include CSRF token for security
        },
      });

      if (response.ok) {
        const newStory = {
          src: URL.createObjectURL(file), // Create an object URL for the file
          alt: 'New Story',
          timestamp: Date.now(), // Set the current timestamp
          caption: text, // Set the caption text
          user_id: userId, // Set the user ID
          viewed: false, // Set viewed to false
        };
        onPostStory(newStory); // Call the onPostStory callback with the new story
        window.location.reload(); // Reload the page
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
    }
  };

  return (
    <div className="create-story-modal px-4 py-6">
      <h2 className="mt-0 mb-4 max-md:mb-0 font-bold text-lg md:text-2xl">Create a story</h2>
      <hr className="border-t border-gray-200 mb-4 " />

      <div className="flex flex-col md:flex-row md:space-x-10">
        
      <div className="flex justify-center items-center mt-6 max-md:mt-2 max-md:mb-4 md:mt-0 md:w-1/2">
          {previewUrl && (
            <div className="image-preview relative">
              <Stories
                stories={[{ url: previewUrl, type: 'image', text }]}
                defaultInterval={1500}
                width={300}
                height={460}
                storyStyles={{
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
                style={{ borderRadius: '8px', objectFit: 'cover' }}
              />
              <div className="text-overlay absolute bottom-0 left-0 w-full p-4 text-white bg-black bg-opacity-50">
                <p>{text}</p>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="flex items-center mb-4">
                <img src="/assets/AaIcon.svg" alt="Add text" className="w-10" />
                <label htmlFor="text" className="ml-2 text-sm md:text-base font-bold">Add caption</label>
              </div>
              <textarea
                id="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Enter caption"
                className="w-full h-24 max-md:h-auto p-2 border border-gray-300 rounded-md resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 my-4">
              <button type="button" className="w-full md:w-auto py-2 max-md:py-0 px-4 font-bold border-2 text-gray-400 border-gray-400 hover:bg-gray-400 hover:text-white rounded-full" onClick={onGoBack}>Cancel</button>
              <button type="submit" className="w-full md:w-auto py-2 max-md:py-2 px-4 font-bold bg-blue-500 hover:bg-blue-700 text-white rounded-full mb-2 md:mb-0">Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// export default CreateImageStory;

// import React, { useState, useEffect } from 'react';
// import { useCsrf } from "@/composables";
// import Stories from 'react-insta-stories';
// import './styles.css'

// const CreateImageStory = ({ file, onClose, onPostStory, userId, onGoBack }) => {
//   const [image, setImage] = useState(null);
//   const [text, setText] = useState('');
//   const [previewUrl, setPreviewUrl] = useState('');
//   const csrfToken = useCsrf(); // Get CSRF token

//   useEffect(() => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//       setImage(file);
//     }
//   }, [file]);

//   const handleTextChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('user_id', userId);
//     formData.append('type', 'story');
//     formData.append('visibility', 'public');
//     formData.append('content', text);
//     formData.append('tag', JSON.stringify([])); // Assuming no tags for stories, adjust if needed

//     if (image) {
//       formData.append('attachments[0]', image);
//     }

//     try {
//       const response = await fetch('/api/posts/posts', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           Accept: 'application/json',
//           'X-CSRF-Token': csrfToken // Include CSRF token
//         },
//       });

//       if (response.ok) {
//         const newStory = {
//           src: URL.createObjectURL(file),
//           alt: 'New Story',
//           timestamp: Date.now(),
//           caption: text,
//           user_id: userId,
//           viewed: false,
//         };
//         onPostStory(newStory);
//         // onClose();
//         window.location.reload();
//       } else {
//         throw new Error('Network response was not ok');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="create-story-modal">
//       <h2 style={{ marginTop: '-10px', marginBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>Create a story</h2>
//       <hr className="full-width-line" style={{ borderColor: '#E5E5E5', borderWidth: '1px' }} />

//       <div className="story-content">
//         <div className="left-column">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <div>
//                 {/* <hr className="half-width-line" style={{ marginLeft: '-30px', borderColor: '#E5E5E5', borderWidth: '1px' }} /> */}
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <img src="/assets/AaIcon.svg" alt="Add text" className='w-10 mb-3' />
//                   <label htmlFor="text" className="label" style={{ marginLeft: '8px' }}>Add caption</label>
//                 </div>
//               </div>
//                 {/* <hr className="half-width-line" style={{ marginLeft: '-30px', borderColor: '#E5E5E5', borderWidth: '1px' }} /> */}
//               <textarea
//                 id="text"
//                 value={text}
//                 onChange={handleTextChange}
//                 placeholder="Enter caption"
//                 className="textarea"
//               />
//             </div>
//             <div className="buttons">
//               <button type="submit" className="post-button py-2 font-bold bg-blue-500 hover:bg-blue-700 text-white mb-2">Post</button>
//               <button type="button" className="back-button py-2 font-bold border-2 text-gray-400 border-gray-400 hover:bg-gray-400 hover:text-white" onClick={onGoBack}>Cancel</button>
//             </div>
//           </form>
//         </div>
//         <div style={{
//           display: 'flex',
//           alignItems: 'stretch', // Ensure the line stretches fully
//           marginTop: '-8px'
//         }}>
//           <div style={{
//             borderRight: '2px solid #E5E5E5', // Line style
//             height: '100.1%', // Make the line fill the container's height
//             marginLeft: '10px', // Space between label and line
//           }}></div>
//         </div>
//         <div className="right-column">
//           <div className="image-preview-container">
//             {previewUrl && (
//               <div className="image-preview" style={{ position: 'relative' }}>
//                 {/* Preview using react-insta-stories */}
//                 <Stories
//                   stories={[{ url: previewUrl, type: 'image', text }]}
//                   defaultInterval={1500}
//                   width={300}
//                   height={640}
//                   storyStyles={{
//                     borderRadius: '8px',
//                     objectFit: 'cover',
//                   }}
//                   style={{ borderRadius: '8px', objectFit: 'cover' }}
//                 />
//                 <div className="text-overlay">
//                   <p>{text}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default CreateImageStory;

