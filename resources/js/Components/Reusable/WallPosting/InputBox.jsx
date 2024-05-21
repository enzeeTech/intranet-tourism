import React, { useState, useRef } from "react";
import { Polls } from "./InputPolls";
import { People } from "./InputPeople";
import '../css/InputBox.css';
import '../../../Pages/Calendar/index.css';

function ShareYourThoughts() {
  const [inputValue, setInputValue] = useState("");
  const [showPollPopup, setShowPollPopup] = useState(false);
  const [showPeoplePopup, setShowPeoplePopup] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const textAreaRef = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClickSend = () => {
    const formData = new FormData();
    formData.append('user_id', '1');
    formData.append('type', 'post');
    formData.append('visibility', 'public');
    formData.append('content', inputValue);

    // Append files as an array
    attachments.forEach((file, index) => {
      formData.append(`attachments[${index}]`, file);
    });

    fetch("/api/crud/posts", {
      method: "POST",
      body: formData,
      headers: { Accept: 'application/json' }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Clear the input value and attachments after successful submission
        setInputValue("");
        setAttachments([]);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFileUpload = (file) => {
    setAttachments((prevAttachments) => [...prevAttachments, file]);

    // Optionally update textarea with file name
    const fileName = file.name;
    const newValue = `${inputValue}\n${fileName}`;
    setInputValue(newValue);
  };

  const createFileInputHandler = (accept) => () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = accept;
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      handleFileUpload(file);
    };
    fileInput.click();
  };

  const handleClickImg = createFileInputHandler('image/*');
  const handleClickVid = createFileInputHandler('video/*');
  const handleClickDoc = createFileInputHandler('application/pdf, .doc, .docx, .txt');

  const handleClickPoll = () => {
    console.log('masukkan poll bro');
    setShowPollPopup(true);
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
            placeholder="Share Your Thoughts..."
            className="self-center mt-1 h-8 px-2 text-sm border-none appearance-none resize-none input-no-outline"
            style={{
              width: "540px",
              height: "1000px",
              outline: "none",
              border: "none",
            }}
          />
          <div className="self-center mt-7 flex gap-3 -ml-96 mr-8">
            <button>
              <img
                loading="lazy"
                src="assets/inputpolls.svg"
                alt="Icon 1"
                className="w-[15px] h-auto"
                onClick={handleClickPoll}
              />
            </button>
            <button>
              <img
                loading="lazy"
                src="assets/inputimg.svg"
                alt="Icon 2"
                className="w-[15px] h-auto"
                onClick={handleClickImg}
              />
            </button>
            <button>
              <img
                loading="lazy"
                src="assets/inputvid.svg"
                alt="Icon 3"
                className="w-[15px] h-auto"
                onClick={handleClickVid}
              />
            </button>
            <button>
              <img
                loading="lazy"
                src="assets/inputdoc.svg"
                alt="Icon 4"
                className="w-[15px] h-auto"
                onClick={handleClickDoc}
              />
            </button>
            <button>
              <img
                loading="lazy"
                src="assets/inputpeople.svg"
                alt="Icon 5"
                className="w-[10px] h-auto"
                onClick={handleClickPeople}
              />
            </button>
          </div>
        </div>
        <button
          onClick={handleClickSend}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "63px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "12px",
              marginLeft: "-20px",
            }}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb9e6a4fb4fdc3ecfcef04a0984faf7c2720a004081fccbe4db40b1509a23780?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
              alt=""
              style={{
                width: "50%",
                height: "50%",
              }}
            />
          </div>
        </button>
      </div>
      {showPollPopup && <Polls onClose={closePopup} />}
      {showPeoplePopup && <People onClose={closePopup} />}
    </section>
  );
}

export default ShareYourThoughts;
