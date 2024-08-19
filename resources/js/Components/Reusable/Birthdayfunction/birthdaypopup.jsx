import React, { useState } from 'react';
import '../../../../css/style.css';

const BirthdayCom = ({ profileImage, name }) => {
  const [backgroundImage, setBackgroundImage] = useState('https://cdn.builder.io/api/v1/image/assets/TEMP/a5f2b039b27282b6d5794f5fa883fc7c70e5fd79a56f9976119dd49c2054bc8e?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&');
  const [text, setText] = useState('Make a wish...');
  const [inputText, setInputText] = useState(text);

  const handleBackgroundChange = (imageSrc) => {
    setBackgroundImage(imageSrc);
  };

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText(inputText);
  };

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
            <p className="my-auto text-xl ml-2">{name}</p>
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
            value={inputText}
            onChange={handleTextChange}
            className="absolute inset-0 w-full h-full bg-transparent border-none outline-none text-center text-white text-3xl font-black"
            placeholder="Make a wish..."
          />
        </div>

        <div className="relative mt-2 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-6 lg:grid-cols-16 xl:grid-cols-20 h-24 w-full overflow-x-auto border-2 rounded-2xl px-2 py-2">
          <img
            loading="lazy"
            src="/assets/smile.jpg"
            className=" w-[30px] cursor-pointer rounded-full mb-2 "
            alt="Post image 1"
            onClick={() => handleBackgroundChange('/assets/smile.jpg')}
          />
          <img
            loading="lazy"
            src="/assets/birthday-bg.svg"
            className=" w-[30px] h-[30px] cursor-pointer rounded-full mb-2 "
            alt="Post image 2"
            onClick={() => handleBackgroundChange('/assets/birthday-bg.svg')}
          />
          {/* Additional images */}
        </div>

        <form className="flex flex-col w-full mt-4" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <label htmlFor="tagInput" className="sr-only">Tag the person</label>
            <div
              className="flex items-center font-extrabold text-blue-500 rounded-full bg-slate-100 h-[21px] w-[21px] justify-center"
              aria-hidden="true"
            >
              @
            </div>
            <input
              id="tagInput"
              className="flex-auto ml-2 text-neutral-400 rounded-2xl"
              type="text"
              placeholder="Tag the person"
              aria-label="Tag the person"
            />
          </div>
          <button
            type="submit"
            className="flex justify-center items-center px-16 py-2 mt-4 text-sm font-bold text-white bg-sky-500 rounded-xl"
          >
            Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default BirthdayCom;
