import * as React from "react";
import { useState, useRef } from "react";
import { Polls } from "./InputPolls";
import { People } from "./InputPeople";
import '../css/InputBox.css';

function ShareYourThoughts() {
  const [inputValue, setInputValue] = useState("");
  const [showPollPopup, setShowPollPopup] = useState(false);
  const [showPeoplePopup, setShowPeoplePopup] = useState(false);
  const textAreaRef = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClickImg = () => {
    console.log('masukkan gamba bro');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      // You can upload the file to your server here
      console.log('Uploading file:', file);
  
      // If you want to display the file name in the textarea
      const fileName = file.name;
      const newValue = `${inputValue}\n${fileName}`;
      setInputValue(newValue);
  
      // Set focus back to the textarea
      textAreaRef.current.focus();
    };
    fileInput.click();
  };  

  const handleClickVid = () => {
    console.log('masukkan video bro');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'video/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // You can upload the file to your server here
      console.log('Uploading file:', file);

      // If you want to display the file name in the textarea
      const fileName = file.name;
      const newValue = `${inputValue}\n${fileName}`;
      setInputValue(newValue);

      // Set focus back to the textarea
      textAreaRef.current.focus();
    };
    fileInput.click();
  };

  const handleClickPoll = () => {
    console.log('masukkan poll bro');
    setShowPollPopup(true);
  };

  const handleClickDoc = () => {
    console.log('masukkan doc bro');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/pdf, .doc, .docx, .txt'; // Accept PDF, Word documents, and text files
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // You can upload the file to your server here
      console.log('Uploading file:', file);

      // If you want to display the file name in the textarea
      const fileName = file.name;
      const newValue = `${inputValue}\n${fileName}`;
      setInputValue(newValue);

      // Set focus back to the textarea
      textAreaRef.current.focus();
    };
    fileInput.click();
  };

  const handleClickPeople = () => {
    console.log('masukkan orang bro');
    setShowPeoplePopup(true);
  };

  const closePopup = () => {
    setShowPollPopup(false);
    setShowPeoplePopup(false);
    console.log("tutup");
  };

  return (
    <section className="flex flex-col justify-center text-sm max-w-[610px] text-neutral-800">
      <div className="input-box-container mt-16 flex gap-5 justify-between px-8 pt-5 pb-2 w-24 bg-white rounded-2xl shadow-sm max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col">
          <textarea
            ref={textAreaRef}
            value={inputValue}
            onChange={handleChange}
            placeholder="Share Your Thoughts"
            className="self-center mt-1 h-8 px-2 text-sm border-none appearance-none resize-none"
            style={{
              width: "570px",
              height: "50px", // Set the desired height
              outline: "none", // Remove the default outline on focus
              border: "none", // Remove the border
            }}
          />
          <div className="self-center mt-7 flex gap-3 -ml-96 mr-16">
            {/* Example icon */}
            <img
              loading="lazy"
              src="assets/inputpolls.svg"
              alt="Icon 1"
              className="w-[15px] h-auto"
              onClick={handleClickPoll}
            />
            {/* Repeat for the other icons */}
            <img
              loading="lazy"
              src="assets/inputimg.svg"
              alt="Icon 2"
              className="w-[15px] h-auto"
              onClick={handleClickImg}
            />
            <img
              loading="lazy"
              src="assets/inputvid.svg"
              alt="Icon 3"
              className="w-[15px] h-auto"
              onClick={handleClickVid}
            />
            <img
              loading="lazy"
              src="assets/inputdoc.svg"
              alt="Icon 4"
              className="w-[15px] h-auto"
              onClick={handleClickDoc}
            />
            <img
              loading="lazy"
              src="assets/inputpeople.svg"
              alt="Icon 5"
              className="w-[10px] h-auto"
              onClick={handleClickPeople}
            />
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb9e6a4fb4fdc3ecfcef04a0984faf7c2720a004081fccbe4db40b1509a23780?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
          alt=""
          className="shrink-0 my-auto aspect-[1.23] fill-red-500 w-[21px] mt-12 mr-10 -ml-12"
        />
      </div>
      {showPollPopup && <Polls onClose={closePopup} />}
      {showPeoplePopup && <People onClose={closePopup} />}
    </section>
  );
}

export default ShareYourThoughts;
