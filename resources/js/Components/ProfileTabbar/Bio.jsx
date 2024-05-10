import React from 'react';

function ProfileBio({ email, department, position, grade, location, phone }) {
    return (
      <div className="flex-auto my-auto max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[36%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-base font-semibold capitalize text-neutral-800 max-md:mt-10">
              <div>e-mail</div>
              <div className="mt-6">department</div>
              <div className="mt-8">position</div>
              <div className="mt-7">grade</div>
              <div className="mt-7">location</div>
              <div className="mt-7">mob/Ext number</div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-sm text-neutral-800 text-opacity-80 max-md:mt-10">
              <div>{email}</div>
              <div className="mt-8">{department}</div>
              <div className="mt-8">{position}</div>
              <div className="mt-8">{grade}</div>
              <div className="mt-8">{location}</div>
              <div className="mt-8">{phone}</div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProfileBio;