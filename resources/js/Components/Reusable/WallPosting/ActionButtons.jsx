import React from "react";

function ActionButtons() {
  return (
    <footer className="flex gap-5 py-4 pr-8 pl-20 mt-4 w-full text-sm leading-tight text-center whitespace-nowrap bg-white rounded-b-lg rounded-none shadow-[0px_-1px_5px_rgba(0,0,0,0.18)]">
      <button className="gap-2 self-stretch py-2 w-20 bg-white rounded-2xl min-w-[80px] text-neutral-950">
        Cancel
      </button>
      <button className="gap-2 self-stretch py-2 w-20 text-white bg-blue-500 rounded-2xl min-w-[80px]">
        Yes
      </button>
    </footer>
  );
}

export default ActionButtons;