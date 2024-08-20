import React, { useState } from 'react';
import '../../../../css/style.css';
import { useCsrf } from '@/composables';

const BirthdayCom = ({ profileImage, name, loggedInUser }) => {
  const [backgroundImage, setBackgroundImage] = useState('https://cdn.builder.io/api/v1/image/assets/TEMP/a5f2b039b27282b6d5794f5fa883fc7c70e5fd79a56f9976119dd49c2054bc8e?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&');
  const [text, setText] = useState('Make a wish...');
  const csrfToken = useCsrf();
  const [inputText, setInputText] = useState(text);
  const [inputValue, setInputValue] = useState("");
  const [attachments, setAttachments] = useState([]);

  const handleBackgroundChange = (imageSrc) => {
    setBackgroundImage(imageSrc);
  };

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText(inputText);
  };

  const handleClickSend = () => {
    const formData = new FormData();

    // Append common fields
    formData.append("user_id", loggedInUser.id);
    formData.append("type", "birthday");
    formData.append("visibility", "public");
    formData.append("content", inputValue);

    // Append the selected background image as an attachment if it's a supported format
    fetch(backgroundImage)
      .then(res => res.blob())
      .then(blob => {
        const allowedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp'];
        if (allowedFormats.includes(blob.type)) {
          const file = new File([blob], `background.${blob.type.split('/')[1]}`, { type: blob.type });
          formData.append("attachments[]", file);
        } else {
          alert('Only JPG, JPEG, PNG, WEBP, and BMP formats are supported for background images.');
          return;
        }

        // Append any additional attachments
        attachments.forEach((file, index) => {
          formData.append(`attachments[${index}]`, file);
        });

        // Make the API call
        fetch("/api/posts/posts", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "X-CSRF-Token": csrfToken,
          },
        })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
        })
        .then(() => {
          // Reset state
          setInputValue("");
          setAttachments([]);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      });
  };

  const createFileInputHandler = (accept) => () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = accept;
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Check if the selected file format is supported
      const allowedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp'];
      if (!allowedFormats.includes(file.type)) {
        alert('Only JPG, JPEG, PNG, WEBP, and BMP formats are supported for background images.');
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setBackgroundImage(fileUrl); // Update background image with the selected file

      // Optionally, add to attachments array if you want to send it as an attachment
      setAttachments([...attachments, file]);
    };
    fileInput.click();
  };

  const handleClickImg = createFileInputHandler("image/jpeg, image/png, image/webp, image/bmp");

  return (
    <section className="flex flex-col pt-2 pb-3.5 bg-white rounded-xl w-full max-w-xl mx-auto">
      <div className="flex flex-col px-4 mt-3 w-full">
        <div className="flex flex-col gap-1 text-xs font-semibold text-neutral-800">
          <div className="flex justify-center">
            <p className="text-xl">CREATE POST</p>
          </div>
          <div className="w-full border-b-2 mb-2 mt-2"></div>
          <div className="flex flex-row mb-2">
            <img
              loading="lazy"
              src={profileImage}
              className="shrink-0 aspect-square w-[38px] rounded-full"
              alt="Profile"
            />
            <p className="my-auto text-xl ml-2">{loggedInUser.name}</p>
          </div>
        </div>

        <div
          className="relative rounded-xl overflow-hidden flex flex-col justify-center items-center px-16 pt-20 pb-20 mt-1.5 text-3xl font-black text-center text-white text-opacity-70"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full bg-transparent border-none outline-none text-center text-white text-3xl font-black"
            placeholder="Make a wish..."
          />
        </div>

        <div className="relative mt-2 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-6 lg:grid-cols-16 xl:grid-cols-20 h-24 w-full overflow-x-auto border-2 rounded-2xl px-2 py-2">
        <img
            loading="lazy"
            src="/assets/Birthday-Template-1.png"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 1"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-1.png')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-2.png"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 2"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-2.png')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-3.png"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 3"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-3.png')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-4.jpg"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 4"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-4.jpg')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-5.png"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 5"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-5.png')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-6.jpg"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 6"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-6.jpg')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-7.png"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 7"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-7.png')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-8.jpg"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 8"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-8.jpg')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-9.png"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 9"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-9.png')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-10.png"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 10"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-10.png')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-11.jpg"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 11"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-11.jpg')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-12.jpg"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 12"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-12.jpg')}
          />
            <img
            loading="lazy"
            src="/assets/Birthday-Template-1.png"
            className="w-12 h-9 cursor-pointer rounded-lg mb-1.5"
            alt="image 1"
            onClick={() => handleBackgroundChange('/assets/Birthday-Template-1.png')}
          />
          {/* Additional images */}
        </div>

        <form className="flex flex-col w-full mt-4" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <img
              src={profileImage}
              alt={`${name}'s avatar`}
              className="w-8 h-8 rounded-full mr-2"
            />
            <p className="my-auto font-semibold text-gray-800">{name}</p>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center px-16 py-2 mt-4 text-sm font-bold text-white bg-sky-500 rounded-xl"
            onClick={handleClickSend}
          >
            Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default BirthdayCom;
