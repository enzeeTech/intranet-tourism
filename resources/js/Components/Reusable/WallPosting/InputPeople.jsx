import * as React from "react";

function SearchPeopleInput() {
  return (
    <div className="justify-center items-start px-6 py-3.5 text-lg text-center border border-blue-500 border-solid rounded-[30px] text-neutral-800 text-opacity-50">
      Search people
    </div>
  );
}

function ChosenPerson() {
  return (
    <>
      <div className="mt-5 text-sm font-semibold text-neutral-500">Chosen</div>
      <div className="flex flex-col justify-center items-start px-4 py-3 mt-2.5 text-xs font-semibold text-blue-600 rounded-xl border border-blue-500 border-solid">
        <div className="flex gap-3 px-2.5 py-1.5 bg-blue-50 rounded">
          <div>Aisha Binti</div>
          <img
            loading="lazy"
            src="assets/CloseIcon.svg"
            alt="Close icon"
            className="shrink-0 border-solid aspect-square stroke-[1px] stroke-blue-600 w-[9px]"
          />
        </div>
      </div>
    </>
  );
}

function RecommendedPerson({ imageSrc, name, department }) {
  return (
    <div className="flex gap-4 mt-2.5 font-bold text-neutral-800">
      <img loading="lazy" src={imageSrc} alt={`${name}'s profile`} className="shrink-0 aspect-square w-[51px]" />
      <div className="flex-auto my-auto">
        {name} ({department})
      </div>
    </div>
  );
}

export function People({ onClose }) {
  const recommendedPeople = [
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/3c186747555d0e85b18ac89bc39afbfe0d07cf5f990babccb5e49dc11dcbf4d2?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", name: "Ben Tan", department: "Department" },
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/babaa0a7cfce79e95f22bdb2470d4ce9bdf6512d4e5ce820f9c9a0f7ff5c7ba3?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", name: "Thomas", department: "Department" },
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ce27c1a7971ae842d63e076d0c4294921597016aafa94ffea8d0d842fe8f1a86?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", name: "Sarah", department: "Department" },
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ae031b0af7aa77f787d0ad1a6c2d666928ffd95103015379c0f28c752cb9d40d?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", name: "Nick", department: "Department" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-full max-w-screen-md bg-white p-2 rounded-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="w-full flex justify-end">
          <img loading="lazy" src="/assets/cancel.svg" alt="Close icon" className="self-end w-6 aspect-square" onClick={onClose} />
        </div>
        <div className="flex flex-col px-5 mt-1.5">
          <SearchPeopleInput />
          <ChosenPerson />
          <div className="mt-5 text-sm font-semibold text-neutral-500">Recommended</div>
          {recommendedPeople.map((person) => (
            <RecommendedPerson key={person.name} imageSrc={person.imageSrc} name={person.name} department={person.department} />
          ))}
          <div className="flex gap-5 justify-between self-end text-sm mb-4 text-center whitespace-nowrap">
            <div className="my-auto font-semibold text-md text-neutral-800" onClick={onClose}>Cancel</div>
            <div className="flex flex-col justify-center font-bold text-white">
              <button className="justify-center text-md px-4 py-2 bg-red-500 hover:bg-red-700 rounded-3xl">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
