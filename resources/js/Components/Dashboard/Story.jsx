import React, { useState, useRef, useEffect } from "react";
import defaultImg from '../../../../public/assets/story/upload-photo-story.png';

// CreateStory component
const CreateStory = ({ goBack, onClose }) => {
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [previewedText, setPreviewedText] = useState('');

  const fileUploadRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
  };

  const handleTextChange = (e) => {
    if (!image) {
      alert('Please upload an image first.');
    } else {
      setText(e.target.value);
    }
  };

  const handlePreview = () => {
    setPreviewedText(text);
  };

  const handleReset = () => {
    setImage('');
    setText('');
    setPreviewedText('');
  };

  const handlePost = () => {
    if (image && text) {
      console.log('Posting story:');
      console.log('Image:', image);
      console.log('Text:', text);
      alert('Story has been posted!');
    } else if (!image && !text) {
      alert('Please upload an image or add text before posting.');
    } else {
      alert('Please add both image and text before posting.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-bold mb-4 text-center w-full">Create Picture Story</h1>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          <img src="/assets/icon-close.png" alt="Close" />
        </button>
      </div>
      <div className="flex rounded-lg ">
        <div className="w-3/12 p-4 border-r flex flex-col gap-4 w-full">
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
            className="py-2 px-4 bg-neutral-300 text-black rounded-full hover:bg-neutral-400"
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
          <button
            type="button"
            className="py-2 px-4 bg-gray-600 text-white rounded-full hover:bg-gray-700"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
        <div className="w-9/12 flex justify-center items-center relative p-4">
          <button onClick={handleImageUpload} className="relative max-h-96 max-w-full">
            <img
              src={image || defaultImg}
              alt="Uploading"
              className="max-h-96 max-w-full object-contain rounded-lg"
            />
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
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

const CreateVideoStory = ({ goBack, onClose }) => {
  const [video, setVideo] = useState('');
  const [text, setText] = useState('');
  const [previewedText, setPreviewedText] = useState('');

  const fileUploadRef = useRef();
  const videoRef = useRef();

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
    if (!video) {
      alert('Please upload an video first.');
    } else {
      setText(e.target.value);
    }
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
    if (video && text) {
      console.log('Posting story:');
      console.log('Video:', video);
      console.log('Text:', text);
      alert('Story has been posted!');
    } else if (!video && !text) {
      alert('Please upload a video or add text before posting.');
    } else {
      alert('Please add both video and text before posting.');
    }
  };

  useEffect(() => {
    let timer;
    if (videoRef.current) {
      videoRef.current.addEventListener('play', () => {
        timer = setTimeout(() => {
          videoRef.current.pause();
        }, 30000); // 30 seconds
      });
    }
    return () => {
      if (timer) clearTimeout(timer);
      if (videoRef.current) videoRef.current.removeEventListener('play', () => {});
    };
  }, [video]);

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-bold mb-4 text-center w-full">Create Video Story</h1>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          <img src="/assets/icon-close.png" alt="Close" />
        </button>
      </div>
      <div className="flex rounded-lg w-full">
        <div className="w-3/12 p-4 border-r flex flex-col gap-4">
          <textarea
            placeholder="Write your story..."
            value={text}
            onChange={handleTextChange}
            className="resize-none w-full h-48 p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 max-w-32 "
            onClick={handlePreview}
          >
            Preview Text
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-neutral-300 text-black rounded-full hover:bg-neutral-400 max-w-32"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-green-600 text-white rounded-full hover:bg-green-700 max-w-32"
            onClick={handlePost}
          >
            Post
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-gray-600 text-white rounded-full hover:bg-gray-700 max-w-32"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
        <div className="w-9/12 flex justify-center items-center relative p-4">
          
          {video ? (
            <div className="relative max-h-96 max-w-full">
              <video ref={videoRef} className="max-h-96 max-w-full object-contain rounded-lg" controls autoPlay>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {previewedText && (
                <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-white text-center p-2 rounded-b-lg">
                  {previewedText}
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleVideoUpload} className="relative max-h-96 max-w-full">
              <img
                src={defaultImg}
                alt="Uploading"
                className="max-h-96 max-w-full object-contain rounded-lg"
              />
              </button>
            )}
          <input
            type="file"
            ref={fileUploadRef}
            hidden
            accept="video/*"
            onChange={handleVideoChange}
          />
        </div>
      </div>
    </div>
  );
};

// Popup component
const Popup = ({ isOpen, onClose }) => {
  const [section, setSection] = useState('main');

  const handlePictureClick = () => {
    setSection('picture');
  };

  const handleVideoClick = () => {
    setSection('video');
  };

  const handleBackClick = () => {
    setSection('main');
  };

  const handleClose = () => {
    setSection('main');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {section === 'main' && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold w-full text-center">Create a Story</h1>
            <button onClick={handleClose} className="text-gray-600 hover:text-black">
              <img src="/assets/icon-close.png" alt="Close" />
            </button>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded m-2"
            onClick={handlePictureClick}
          >
            Picture
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded m-2"
            onClick={handleVideoClick}
          >
            Video
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded m-2"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      )}
      {section === 'picture' && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-5/6 h-5/6">
          <CreateStory goBack={handleBackClick} onClose={handleClose} />
        </div>
      )}
      {section === 'video' && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-5/6 h-5/6">
          <CreateVideoStory goBack={handleBackClick} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

// ImagePopup component
const ImagePopup = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="p-6 rounded-lg text-center">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold w-full text-center"> </h1>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <img src="/assets/icon-close.png" alt="Close" />
          </button>
        </div>
        <div className=" w-96 h-120">
          <img src={image} alt="Popup" className="object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
};

// Avatar component
function Avatar({ src, alt, name }) {
  return (
    <div className="flex flex-col grow items-center text-sm text-center whitespace-nowrap text-neutral-800 max-md:mt-6">
      <img src={src} alt={alt} className="aspect-square w-[98px]" />
      <div className="mt-3">{name}</div>
    </div>
  );
}

// Stories component
function Stories() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [image] = useState("https://th.bing.com/th/id/R.f48ceff9ab3322d4e84ed12a44c484d1?rik=0KQ6OgL4T%2b9uCA&riu=http%3a%2f%2fwww.photo-paysage.com%2falbums%2fuserpics%2f10001%2fCascade_-15.JPG&ehk=kx1JjE9ugj%2bZvUIrjzSmcnslPc7NE1cOnZdra%2f3pJEM%3d&risl=1&pid=ImgRaw&r=0");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openImagePopup = () => {
    setIsImagePopupOpen(true);
  };

  const closeImagePopup = () => {
    setIsImagePopupOpen(false);
  }
  
  const avatars = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f112564488aa36e3249859d0a7978ae87e135589f7a2546f20452573f4289865?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Thomas",
      name: "Thomas",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/26e9c323e2b3e2d4cb3ba7c439300d489fcd7efc28471a423d6df3137de94320?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Aisha",
      name: "Aisha",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f9f2a26cfd4c2c4cfd165c8a11e72547b5817ce689fd1780656a7eef5b65f656?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Dan",
      name: "Dan",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/39895574049d881fb475ea138e7d0fa865baaad0626f61c876f3d7b93f879f0b?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Musa",
      name: "Musa",
    },
  ];

  return (
    <div className="max-w-[624px]">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="relative">
        <button onClick={openPopup}>
          <div className="flex items-center bg-gray h-24 border-4 border-white-700 rounded-full p-px">
            <img className="flex items-center bg-black h-24 w-24  rounded-full "
              src="/assets/profileDummy.png"
              // alt="Decorative border"
            /><img className="absolute h-5 w-5 left-20 mt-14 " 
            src="/assets/story/iconAddStory.svg"/>
          </div>
          </button>
          {/* <button
            className="bg-blue-500 text-white py-2 px-4 rounded ml-4"
            onClick={openImagePopup}
          >
            Open Image Popup
          </button> */}
          <Popup isOpen={isPopupOpen} onClose={closePopup} />
          <ImagePopup isOpen={isImagePopupOpen} onClose={closeImagePopup} image={image} />
        </div>
        <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
          <div className="px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full"
                >
                  <Avatar
                    src={avatar.src}
                    alt={avatar.alt}
                    name={avatar.name}
                    onClick={openImagePopup}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stories;
