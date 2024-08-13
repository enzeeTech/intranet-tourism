import React from "react";

function ActionButtons() {
  return (
    <footer className="flex gap-2 py-4 pr-8 justify-end mt-4 w-full text-sm leading-tight text-center whitespace-nowrap bg-white rounded-b-lg rounded-3 shadow-[0px_-1px_5px_rgba(0,0,0,0.18)]">
      <button className="gap-2 self-stretch py-2 w-20 text-md bg-white rounded-full text-neutral-950">
        Cancel
      </button>
      <button className="gap-2 self-stretch py-2 px-4 text-md text-white bg-blue-500 hover:bg-blue-700 rounded-full">
        Save
      </button>
    </footer>
  );
}

export default ActionButtons;