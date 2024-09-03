import React, { useState, useRef, useEffect } from 'react';
import Switch from 'react-switch';
import { useForm } from '@inertiajs/react';

function PollOption({ option, onRemove, onChange }) {
  return (
    <div className="flex gap-5 px-px mt-3 text-sm leading-5 text-neutral-800 max-md:flex-wrap">
      <div className="flex flex-auto gap-3 px-4 py-2 bg-gray-100 rounded-3xl max-md:flex-wrap">
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
        className="shrink-0 my-auto aspect-square w-[19px] cursor-pointer"
        onClick={onRemove}
      />
    </div>
  );
}

function AddOptionButton({ label, onClick }) {
  return (
    <div className="flex flex-auto gap-3 py-1.5 bg-gray-100 rounded-3xl pr-5 cursor-pointer" onClick={onClick}>
      <div className="flex justify-center items-center px-2.5 text-xl font-bold ml-1 text-center text-white bg-blue-500 rounded-3xl h-[30px] w-[30px]">
        +
      </div>
      <div className="flex-auto my-auto text-sm leading-5 text-neutral-800">
        {label}
      </div>
    </div>
  );
}

function UserInfo({ name, role, src }) {
  return (
    <div className="flex gap-4 items-center justify-start w-full mt-2 text-neutral-800">
      <img
        loading="lazy"
        src={src}
        alt=""
        className="shrink-0 aspect-square w-[42px] h-[42px] rounded-full object-cover object-center"
      />
      <div className="flex flex-col grow shrink-0 self-start mt-1.5 basis-0 w-fit">
        <p className="text-lg font-bold">{name}</p>
        <p className="-mt-1 text-sm">{role}</p>
      </div>
    </div>
  );
}

export function Polls({ onClose, onCreatePoll, id }) {
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const { data, setData } = useForm({
    remember: false,
  });

  const [options, setOptions] = useState(["Yes", "No"]);
  const [user, setUserData] = useState({ name: '', role: '', profileImage: '' });

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
      }
    }, 0);
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/users/${id}?with[]=profile`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { data } = await response.json();
      setUserData((pv) => ({
        ...pv,
        ...data,
        name: data.name,
        profileImage:
          data.profile && data.profile.image
            ? `/storage/${data.profile.image}`
            : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${data.name}&rounded=true`,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      fetchUser();
    }
  }, [id]);

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
      <div className="bg-white p-5 rounded-3xl shadow-lg max-w-3xl w-full md:w-2/3" onClick={(e) => e.stopPropagation()}>
        <header className="flex justify-between items-center mb-6 text-2xl font-bold text-neutral-800">
          <h1>Create Poll</h1>
          <button onClick={onClose}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
              alt="Close icon"
              className="w-6 cursor-pointer"
            />
          </button>
        </header>
        <main className="flex flex-col space-y-4">
          <div className="flex items-center gap-4">
            <UserInfo name={user.name} role={user.role} src={user.profileImage} />
          </div>
          <textarea
            ref={textAreaRef}
            value={inputValue}
            onChange={handleChange}
            placeholder="Type something..."
            className="w-full p-2 text-xl font-bold text-neutral-800 border rounded-md resize-none"
            rows="4"
            style={{ maxHeight: "100px", overflowY: "auto" }}
          />
          <h2 className="text-xl font-bold text-neutral-800">Add Poll</h2>
          <div className="flex flex-col gap-3 max-h-40 overflow-y-auto">
            {options.map((option, index) => (
              <PollOption
                key={index}
                option={option}
                onRemove={() => handleRemoveOption(index)}
                onChange={(e) => handleOptionChange(index, e)}
              />
            ))}
          </div>
          <AddOptionButton label="Add option" onClick={handleAddOption} />
          <div className="flex items-center gap-4">
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
            <span className="text-sm text-blue-600">Allow multiple answers?</span>
          </div>
          <div className="bg-gray-100 p-4 text-center text-sm text-neutral-800 rounded-3xl cursor-pointer">
            Choose end date (opt.)
          </div>
          <button
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-3xl"
            onClick={handlePostPoll}
          >
            Post poll
          </button>
        </main>
      </div>
    </div>
  );
}

export default Polls;
