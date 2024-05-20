import React from 'react';

function RequestSentMessage({ onClose }) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="p-2 rounded-3xl w-4xl" onClick={(e) => e.stopPropagation()}>
        <section className="flex flex-col px-2.5 pt-16 font-bold text-center bg-white rounded-xl shadow-lg w-[380px] h-[165px]">
          <div className="flex flex-col w-full">
            <h2 className="text-xl text-neutral-800">Request Sent to Jomla! Admin</h2>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RequestSentMessage;
