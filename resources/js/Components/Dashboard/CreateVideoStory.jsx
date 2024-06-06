import React, { useRef, useState } from 'react';
import defaultImg from '../../../../public/assets/story/upload-photo-story.png';

function CreateVideoStory() {
  const [video, setVideo] = useState('');
  const [text, setText] = useState('');
  const [previewedText, setPreviewedText] = useState('');

  const fileUploadRef = useRef();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setVideo(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handlePreview = () => {
    setPreviewedText(text);
  };

  const handleReset = () => {
    setVideo('');
    setText('');
    setPreviewedText('');
  };

  const handlePost = () => {
    if (video) {
      console.log('Posting story:');
      console.log('Video:', video);
      console.log('Text:', text);
      alert('Story has been posted!');
    } else if(video && text){
      alert('Story has been posted!');
    } else if(text){
      alert('Please upload a video or add video and text before posting.');
    } else{
      alert('Please upload a video or add video and text before posting.');
    }
  };

  return (
    <div className="max-w-screen-lg max-h-screen-lg mx-auto p-6 bg-white rounded-lg">
      <div className="flex rounded-lg">
        {/* Left Column: Text Input */}
        <div className="w-3/12 p-4 border-r flex flex-col gap-4">
          <textarea
            placeholder="Write your story..."
            value={text}
            onChange={handleTextChange}
            className="resize-none w-full h-48 p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            onClick={handlePreview}
          >
            Preview Text
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-neutral-300 text-black rounded-full hover:bg-neutral-400 bg-blue-500"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-green-600 text-white rounded-full hover:bg-green-700"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
        <div className='w-2/12 max-w-24'></div>
        {/* Right Column: Video Upload and Preview */}
        <div className="w-7/12 flex justify-center items-center relative p-4">
          <button onClick={handleVideoUpload} className="relative max-h-96 max-w-full">
            {video ? (
              <video className="max-h-96 max-w-full object-contain rounded-lg" controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={defaultImg}
                alt="Uploading"
                className="max-h-96 max-w-full object-contain rounded-lg"
              />
            )}
            {previewedText && (
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-white text-center p-2 rounded-b-lg">
                {previewedText}
              </div>
            )}
          </button>
          <input
            type="file"
            ref={fileUploadRef}
            hidden
            accept="video/*"
            onChange={handleVideoChange}
          />
        </div>
        <div className='w-2/12 max-w-24'></div>
      </div>
    </div>
  );
}

export default CreateVideoStory;
