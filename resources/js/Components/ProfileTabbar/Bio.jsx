import React from 'react';

function ProfileBio({ email, department, position, grade, location, phone, whatsapp }) {
    return (
      <div className="flex-auto my-auto max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[20%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-base font-semibold capitalize text-neutral-800 max-md:mt-10">
              <div>e-mail</div>
              <div className="mt-2.5">department</div>
              <div className="mt-3">position</div>
              <div className="mt-3">grade</div>
              <div className="mt-3">location</div>
              <div className="mt-3">office number</div>
              <div className="mt-3">whatsapp number</div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-sm text-neutral-800 text-opacity-80 max-md:mt-10">
              <div>{email}</div>
              <div className="mt-4">{department}</div>
              <div className="mt-4">{position}</div>
              <div className="mt-4">{grade}</div>
              <div className="mt-4">{location}</div>
              <div className="mt-4">{phone}</div>
              <div className="mt-4">{whatsapp}</div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProfileBio;