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
    <div className="flex flex-col grow items-center text-sm text-center whitespace-nowrap text-neutral-800 max-md:mt-6">

{/* <div className="w-100 h-100 border-2 border-gray-700 rounded-full shadow-lg relative"> */}


      <img src={src} alt={alt} className="aspect-square w-[98px]" />
            {/* <img className="absolute h-5 w-5 left-20 mt-14 " src={addbtn}/>  */}

      {/* </div> */}

      <div className="mt-3">{name}</div>
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
      addbtn: "/public/assets/addStory.svg",
      name: "Thomas",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/26e9c323e2b3e2d4cb3ba7c439300d489fcd7efc28471a423d6df3137de94320?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Aisha",
      addbtn: "/public/assets/addStory.svg",
      name: "Aisha",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f9f2a26cfd4c2c4cfd165c8a11e72547b5817ce689fd1780656a7eef5b65f656?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Dan",
      addbtn: "/public/assets/addStory.svg",
      name: "Dan",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/39895574049d881fb475ea138e7d0fa865baaad0626f61c876f3d7b93f879f0b?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Musa",
      addbtn: "/public/assets/addStory.svg",
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
