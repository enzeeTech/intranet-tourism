import React, { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';
import { Polls } from "./InputPolls";
import { People } from "./InputPeople";
import '../css/InputBox.css';
import '../../../Pages/Calendar/index.css';
import '../css/posting-department.css'


function ShareYourThoughtsDepart() {
  const [inputValue, setInputValue] = useState("");
  const [showPollPopup, setShowPollPopup] = useState(false);
  const [showPeoplePopup, setShowPeoplePopup] = useState(false);
  const [posts, setPosts] = useState([]); // State to store the submitted posts
  const textAreaRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClickImg = () => {
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
    setShowPollPopup(true);
  };

  const handleClickDoc = () => {
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
    setShowPeoplePopup(true);
  };

  const closePopup = () => {
    setShowPollPopup(false);
    setShowPeoplePopup(false);
  };

  const handleSubmitPost = () => {
    if (inputValue.trim()) {
      const currentTime = new Date(); // Capture the current time
      setPosts([{ text: inputValue, time: currentTime }, ...posts]);
      setInputValue(""); // Clear the input field after submission
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger re-render to update relative time
      setPosts([...posts]);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [posts]);

  return (
    <section className="flex flex-col ">
      <div className="input-box-container flex justify-between  border-slaute-200 bg-white rounded-2xl shadow-sm max-md:flex-wrap max-md:max-w-full" style={{ width: "875px", height: "90px" }}>
        <div className="flex flex-col">
          <textarea
            ref={textAreaRef}
            value={inputValue}
            onChange={handleChange}
            placeholder="Share Your Thoughts..."
            className="-300 self-center mt-1 h-8 px-2 text-sm border-none appearance-none resize-none input-no-outline w-32 h-[100px]"
            style={{
              width: "800px",
              height: "100px",
              outline: "none",
              border: "none",
            }}
          />
          <div className="flex gap-3 ">
            <img
              loading="lazy"
              src="assets/inputpolls.svg"
              alt="Icon 1"
              className="w-[15px] h-auto"
              onClick={handleClickPoll}
            />
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
      <div className="flex flex-col space-y-2 h-23 w-8  -mt-4">
        <img
          loading="lazy"
          src="assets/wallpost-dotbutton.svg"
          alt="Submit"
          className="shrink-0 my-auto aspect-[1.23] fill-red-500 w-6  cursor-pointer"
          onClick={handleSubmitPost}
        />
         <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb9e6a4fb4fdc3ecfcef04a0984faf7c2720a004081fccbe4db40b1509a23780?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
          alt="Submit"
          className="shrink-0 my-auto aspect-[1.23] fill-red-500 w-6   cursor-pointer"
          onClick={handleSubmitPost}
        /></div>
      </div>
      {showPollPopup && <Polls onClose={closePopup} />}
      {showPeoplePopup && <People onClose={closePopup} />}
      
<div className="mt-4 ">
  {posts.map((post, index) => (
    <div key={index} className=" mt-4 p-4 border rounded-2xl bg-white border-2 shadow-xl w-[875px] ">
      <p className="text-gray-500 text-sm">{formatDistanceToNow(new Date(post.time), { addSuffix: true })}</p>
      <div className="post-content break-words overflow-hidden">
        {post.text}
      </div>
      <div className="flex justify-start gap-2 w-4 h-4">
        <img src='/assets/likeforposting.svg' alt="Like" className="w-6 h-6 cursor-pointer" />
        <img src='/assets/commentforposting.svg' alt="Comment" className="w-6 h-6 cursor-pointer" />
        <img src='/assets/shareforposting.svg' alt="Share" className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  ))}
</div>



    </section>
  );
}

export default ShareYourThoughtsDepart;
