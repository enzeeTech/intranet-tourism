// import React, { useState, useRef } from 'react';
// import Switch from 'react-switch';
// import { useForm } from '@inertiajs/react';

// function PollOption({ option, onRemove, onChange }) {
//   return (
//     <div className="flex gap-5 px-px mt-6 text-sm leading-5 text-neutral-800 max-md:flex-wrap">
//       <div className="flex flex-auto gap-3 px-4 py-3.5 bg-gray-100 rounded-3xl max-md:flex-wrap">
//         <div className="shrink-0 self-start w-3 bg-white rounded-full h-[13px]" />
//         <input
//           type="text"
//           value={option}
//           onChange={onChange}
//           className="flex-auto bg-gray-100 outline-none"
//         />
//       </div>
//       <img
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b330e075518102f0d7cedcbac4231209eacd02d6ed1f3210266297b383a48d7?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
//         alt="Remove option"
//         className="shrink-0 my-auto aspect-square w-[19px]"
//         onClick={onRemove}
//       />
//     </div>
//   );
// }

// function AddOptionButton({ label, onClick }) {
//   return (
//     <div className="flex flex-auto gap-3 py-1.5 bg-gray-100 rounded-3xl" onClick={onClick}>
//       <div className="justify-center items-center px-2.5 text-xl font-bold ml-1 text-center text-white whitespace-nowrap bg-blue-500 rounded-3xl h-[30px] w-[30px]">
//         +
//       </div>
//       <div className="flex-auto my-auto text-sm leading-5 text-neutral-800">
//         {label}
//       </div>
//     </div>
//   );
// }

// export function Polls({ onClose }) {
//     const [inputValue, setInputValue] = useState("");
//     const textAreaRef = useRef(null);


//     const handleChange = (event) => {
//         setInputValue(event.target.value);
//     };


//   const { data, setData } = useForm({
//     remember: false,
//   });

//   const [options, setOptions] = React.useState([
//     "Yes",
//     "No",
//   ]);

//   const handleRemoveOption = (index) => {
//     const newOptions = [...options];
//     newOptions.splice(index, 1);
//     setOptions(newOptions);
//   };

//   const handleAddOption = () => {
//     setOptions([...options, `Option ${options.length + 1}`]);
//   };

//   const handleOptionChange = (index, event) => {
//     const newOptions = [...options];
//     newOptions[index] = event.target.value;
//     setOptions(newOptions);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="bg-white p-2 rounded-xl shadow-lg max-w-3xl" onClick={(e) => e.stopPropagation()}>
//         <header className="flex gap-5 self-end max-w-full text-2xl font-bold text-center text-neutral-800 w-[392px] max-md:mr-2.5">
//           <h1 className="flex ml-32">Create Poll</h1>
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
//             alt="Close icon"
//             className="shrink-0 self-start w-6 aspect-square ml-24"
//             onClick={onClose}
//           />
//         </header>
//         <main className="flex flex-col px-5 mt-9 w-full max-md:pl-5 max-md:max-w-full">
//           <div className="flex gap-4 self-start text-lg font-bold text-neutral-800">
//             <img
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/726408370b648407cc55fec1ee24245aad060d459ac0f498438d167758c3a165?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
//               alt="User avatar"
//               className="shrink-0 aspect-square w-[61px]"
//             />
//             <div className="flex-auto my-auto">Musa (Admin)</div>
//           </div>
//           <div className="mt-6 text-sm font-medium text-neutral-500 max-md:max-w-full">
//             <textarea
//               ref={textAreaRef}
//               value={inputValue}
//               onChange={handleChange}
//               placeholder="Type something..."
//               className="self-center px-2 text-xl font-bold text-neutral-800 w-full border-none appearance-none resize-none input-no-outline"
//               rows="4"
//               style={{ maxHeight: "30px", overflowY: "auto" }}
//             />
//           </div>
//           <h2 className="mt-6 ml-1 text-2xl font-bold text-neutral-800 max-md:max-w-full">
//             Add Poll
//           </h2>
//           {options.map((option, index) => (
//             <PollOption
//               key={index}
//               option={option}
//               onRemove={() => handleRemoveOption(index)}
//               onChange={(e) => handleOptionChange(index, e)}
//             />
//           ))}
//           <div className="flex gap-3 items-center mt-6">
//             <AddOptionButton
//               label="Add option"
//               onClick={handleAddOption}
//             />
//             <label className="flex items-center mt-1">
//               <Switch
//                 checked={data.remember}
//                 onChange={(checked) => setData('remember', checked)}
//                 onColor="#36c"
//                 onHandleColor="#fff"
//                 handleDiameter={24}
//                 uncheckedIcon={false}
//                 checkedIcon={false}
//                 boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
//                 activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
//                 height={16}
//                 width={40}
//                 className="react-switch"
//               />
//               <span className="ms-2 text-sm text-blue-600">Allow multiple answers?</span>
//             </label>
//           </div>
//           <div className="justify-center items-start px-4 py-3.5 mt-4 max-w-full text-sm leading-5 bg-gray-100 rounded-3xl text-neutral-800 text-opacity-50 w-[258px] max-md:pr-5">
//             Choose end date (opt.)
//           </div>
//           <button className="justify-center items-center px-16 py-3 mt-16 text-lg font-bold leading-6 text-center text-white whitespace-nowrap bg-blue-500 rounded-md max-md:px-5 max-md:mt-10 max-md:mr-1 max-md:max-w-full">
//             Post
//           </button>
//         </main>
//       </div>
//     </div>
//   );
// }



import React, { useState, useRef } from 'react';
import Switch from 'react-switch';
import { useForm } from '@inertiajs/react';

function PollOption({ option, onRemove, onChange }) {
  return (
    <div className="flex gap-5 px-px mt-6 text-sm leading-5 text-neutral-800 max-md:flex-wrap">
      <div className="flex flex-auto gap-3 px-4 py-3.5 bg-gray-100 rounded-3xl max-md:flex-wrap">
        <div className="shrink-0 self-start w-3 bg-white rounded-full h-[13px]" />
        <input
          type="text"
          value={option}
          onChange={onChange}
          className="flex-auto bg-gray-100 outline-none"
        />
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b330e075518102f0d7cedcbac4231209eacd02d6ed1f3210266297b383a48d7?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
        alt="Remove option"
        className="shrink-0 my-auto aspect-square w-[19px]"
        onClick={onRemove}
      />
    </div>
  );
}

function AddOptionButton({ label, onClick }) {
  return (
    <div className="flex flex-auto gap-3 py-1.5 bg-gray-100 rounded-3xl" onClick={onClick}>
      <div className="justify-center items-center px-2.5 text-xl font-bold ml-1 text-center text-white whitespace-nowrap bg-blue-500 rounded-3xl h-[30px] w-[30px]">
        +
      </div>
      <div className="flex-auto my-auto text-sm leading-5 text-neutral-800">
        {label}
      </div>
    </div>
  );
}

export function Polls({ onClose, onCreatePoll }) {
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const { data, setData } = useForm({
    remember: false,
  });

  const [options, setOptions] = useState(["Yes", "No"]);

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handlePostPoll = () => {
    const newPoll = {
      id: Date.now(),
      content: inputValue,
      options: options,
      allowMultipleAnswers: data.remember,
      timestamp: new Date().toISOString(),
    };
    onCreatePoll(newPoll);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-2 rounded-xl shadow-lg max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <header className="flex gap-5 self-end max-w-full text-2xl font-bold text-center text-neutral-800 w-[392px] max-md:mr-2.5">
          <h1 className="flex ml-32">Create Poll</h1>
          <button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
            alt="Close icon"
            className="shrink-0 self-start w-6 aspect-square ml-24"
            onClick={onClose}
          />
          </button>
        </header>
        <main className="flex flex-col px-5 mt-9 w-full max-md:pl-5 max-md:max-w-full">
          <div className="flex gap-4 self-start text-lg font-bold text-neutral-800">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/726408370b648407cc55fec1ee24245aad060d459ac0f498438d167758c3a165?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
              alt="User avatar"
              className="shrink-0 aspect-square w-[61px]"
            />
            <div className="flex-auto my-auto">Musa (Admin)</div>
          </div>
          <div className="mt-6 text-sm font-medium text-neutral-500 max-md:max-w-full">
            <textarea
              ref={textAreaRef}
              value={inputValue}
              onChange={handleChange}
              placeholder="Type something..."
              className="self-center px-2 text-xl font-bold text-neutral-800 w-full border-none appearance-none resize-none input-no-outline"
              rows="4"
              style={{ maxHeight: "30px", overflowY: "auto" }}
            />
          </div>
          <h2 className="mt-6 ml-1 text-2xl font-bold text-neutral-800 max-md:max-w-full">
            Add Poll
          </h2>
          {options.map((option, index) => (
            <PollOption
              key={index}
              option={option}
              onRemove={() => handleRemoveOption(index)}
              onChange={(e) => handleOptionChange(index, e)}
            />
          ))}
          <div className="flex gap-3 items-center mt-6">
            <AddOptionButton
              label="Add option"
              onClick={handleAddOption}
            />
            <label className="flex items-center mt-1">
              <Switch
                checked={data.remember}
                onChange={(checked) => setData('remember', checked)}
                onColor="#36c"
                onHandleColor="#fff"
                handleDiameter={24}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={16}
                width={40}
                className="react-switch"
              />
              <span className="ms-2 text-sm text-blue-600">Allow multiple answers?</span>
            </label>
          </div>
          <div className="justify-center items-start px-4 py-3.5 mt-4 max-w-full text-sm leading-5 bg-gray-100 rounded-3xl text-neutral-800 text-opacity-50 w-[258px] max-md:pr-5">
            Choose end date (opt.)
          </div>
          <button
            className="justify-center items-center px-16 py-3 mt-16 text-lg font-bold leading-6 text-center text-white whitespace-nowrap bg-blue-500 rounded-md max-md:px-5 max-md:mt-10 max-md:mr-1 max-md:max-w-full"
            onClick={handlePostPoll}
          >
            Post
          </button>
        </main>
      </div>
    </div>
  );
}
