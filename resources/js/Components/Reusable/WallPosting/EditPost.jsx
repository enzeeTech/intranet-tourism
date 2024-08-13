import React, { useState, useEffect } from 'react';
import { useCsrf } from "@/composables";

function EditPost({ post, onClose, loggedInUserId }) {
  const [content, setContent] = useState(post.content || '');
  const [attachments, setAttachments] = useState(post.attachments || []);
  const [tags, setTags] = useState(post.tags || []);
  const csrfToken = useCsrf();

  useEffect(() => {
    setContent(post.content || '');
    setTags(post.tags || []);
    setAttachments(post.attachments || []);
  }, [post]);

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleDeleteAttachment = (index) => {
    setAttachments(prevAttachments => prevAttachments.filter((_, i) => i !== index));
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append('_method', 'PUT');
  //     formData.append("user_id", loggedInUserId);
  //     formData.append("type", "post");
  //     formData.append("visibility", "public");
  //     formData.append('content', content);
  //     formData.append('tag', JSON.stringify(tags));

  //     attachments.forEach((file, index) => {
  //       if (file instanceof File) {
  //         formData.append(`attachments[${index}]`, file);
  //       } else {
  //         formData.append(`attachments[${index}]`, file);
  //       }
  //     });

  //     const response = await fetch(`/api/posts/posts/${post.id}`, {
  //       method: 'POST',
  //       body: formData,
  //       headers: { Accept: 'application/json', 'X-CSRF-Token': csrfToken },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const responseData = await response.json();
  //     console.log(responseData);

  //     // Close the modal and refresh the page
  //     onClose();
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Error updating post:', error);
  //   }
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append("user_id", loggedInUserId);
      formData.append("type", "post");
      formData.append("visibility", "public");
  
      // Check if content is not empty or just whitespace before adding to FormData
      if (content.trim()) {
        formData.append('content', content);
      }
  
      formData.append('tag', JSON.stringify(tags));
  
      attachments.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`attachments[${index}]`, file);
        } else {
          formData.append(`attachments[${index}]`, file);
        }
      });
  
      const response = await fetch(`/api/posts/posts/${post.id}`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json', 'X-CSRF-Token': csrfToken },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log(responseData);
  
      // Close the modal and refresh the page
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  

  return (
    <div className="edit-post-modal p-6 bg-white rounded-xl shadow-lg">
      <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-1.5">
          <img loading="lazy" src={`/storage/${post.userProfile?.profile.image}` ?? `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(post.user.name)}&rounded=true`} alt="Profile image" className="shrink-0 aspect-square w-[53px] rounded-image" />
          <div className="flex flex-col my-auto">
            <div className="text-base font-semibold text-neutral-800">{post.user?.username}</div>
          </div>
        </div>
      </header>
      <form onSubmit={handleFormSubmit} className="mt-4">
        <textarea
          value={content}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="Edit your content"
        />
        <input type="file" onChange={handleFileChange} className="mt-2" multiple />
        <div className="grid grid-cols-3 gap-2 mt-2">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative attachment">
              <button
                type="button"
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                onClick={() => handleDeleteAttachment(index)}
              >
                X
              </button>
              {attachment.mime_type && attachment.mime_type.startsWith("image/") ? (
                <img src={`/storage/${attachment.path}`} alt="attachment" className="w-full h-auto rounded-lg" />
              ) : attachment.mime_type && attachment.mime_type.startsWith("video/") ? (
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
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
          Save
        </button>
        <button type="button" onClick={onClose} className="mt-2 p-2 bg-red-500 text-white rounded">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditPost;
