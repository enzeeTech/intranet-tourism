import React, { useState, useEffect } from 'react';
import { useCsrf } from "@/composables";
import Stories from 'react-insta-stories';
import './styles.css'

const CreateImageStory = ({ file, onClose, onPostStory, userId, onGoBack }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const csrfToken = useCsrf(); // Get CSRF token

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  }, [file]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('type', 'story');
    formData.append('visibility', 'public');
    formData.append('content', text);
    formData.append('tag', JSON.stringify([])); // Assuming no tags for stories, adjust if needed

    if (image) {
      formData.append('attachments[0]', image);
    }

    try {
      const response = await fetch('/api/posts/posts', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'X-CSRF-Token': csrfToken // Include CSRF token
        },
      });

      if (response.ok) {
        const newStory = {
          src: URL.createObjectURL(file),
          alt: 'New Story',
          timestamp: Date.now(),
          caption: text,
          user_id: userId,
          viewed: false,
        };
        onPostStory(newStory);
        // onClose();
        window.location.reload();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-story-modal">
      <h2 style={{ marginTop: '-10px', marginBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>Create a story</h2>
      <hr className="full-width-line" style={{ borderColor: '#E5E5E5', borderWidth: '1px' }} />

      <div className="story-content">
        <div className="left-column">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div>
                {/* <hr className="half-width-line" style={{ marginLeft: '-30px', borderColor: '#E5E5E5', borderWidth: '1px' }} /> */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="/assets/AaIcon.svg" alt="Add text" className='w-10 mb-3' />
                  <label htmlFor="text" className="label" style={{ marginLeft: '8px' }}>Add text</label>
                </div>
              </div>
                {/* <hr className="half-width-line" style={{ marginLeft: '-30px', borderColor: '#E5E5E5', borderWidth: '1px' }} /> */}
              <textarea
                id="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Enter caption"
                className="textarea"
              />
            </div>
            <div className="buttons">
              <button type="submit" className="post-button font-bold shadow-custom bg-blue-500 hover:bg-blue-700 text-white mb-2">Post</button>
              <button type="button" className="back-button font-bold shadow-custom border-2 border-gray-400 hover:bg-gray-400 hover:text-white" onClick={onGoBack}>Cancel</button>
            </div>
          </form>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'stretch', // Ensure the line stretches fully
          marginTop: '-8px'
        }}>
          <div style={{
            borderRight: '2px solid #E5E5E5', // Line style
            height: '100.1%', // Make the line fill the container's height
            marginLeft: '10px', // Space between label and line
          }}></div>
        </div>
        <div className="right-column">
          <div className="image-preview-container">
            {previewUrl && (
              <div className="image-preview" style={{ position: 'relative' }}>
                {/* Preview using react-insta-stories */}
                <Stories
                  stories={[{ url: previewUrl, type: 'image', text }]}
                  defaultInterval={1500}
                  width={300}
                  height={640}
                  storyStyles={{
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                  style={{ borderRadius: '8px', objectFit: 'cover' }}
                />
                <div className="text-overlay">
                  <p>{text}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateImageStory;
