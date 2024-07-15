import React, { useState, useEffect } from 'react';
import { useCsrf } from "@/composables";

const CreateImageStory = ({ file, onClose, onPostStory, userId }) => {
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
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-story-modal">
      <h2>Create a story</h2>
      <div className="story-content">
        <div className="left-column">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="text" className="label">Aa Add text</label>
              <textarea
                id="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Enter your text here..."
                className="textarea"
              />
            </div>
            <div className="buttons">
              <button type="submit" className="post-button">Post</button>
              <button type="button" className="back-button" onClick={onClose}>Go Back</button>
            </div>
          </form>
        </div>
        <div className="right-column">
          <div className="image-preview-container">
            {previewUrl && (
              <div className="image-preview" style={{ position: 'relative' }}>
                <img src={previewUrl} alt="Selected" className="image" />
                <div className="text-overlay">
                  <p>{text}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .create-story-modal {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .story-content {
          display: flex;
          width: 100%;
        }
        .left-column {
          flex: 1;
          padding: 10px;
        }
        .right-column {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }
        .textarea {
          width: 100%;
          height: 100px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          resize: none;
        }
        .buttons {
          display: flex;
          justify-content: space-between;
        }
        .post-button,
        .back-button {
          width: 48%;
          padding: 10px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }
        .post-button {
          background-color: #007bff;
          color: white;
        }
        .back-button {
          background-color: #ccc;
          color: #333;
        }
        .image-preview-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 400px;
        }
        .image-preview {
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 100%;
          max-height: 100%;
          overflow: hidden;
        }
        .image {
          max-width: 100%;
          max-height: 100%;
        }
        .text-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 10px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default CreateImageStory;
