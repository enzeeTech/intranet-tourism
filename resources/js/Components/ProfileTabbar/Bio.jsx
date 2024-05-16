import React from 'react';

function ProfileBio({ photo, email, department, position, grade, location, phone, whatsapp }) {
    return (
      <div className="flex-auto my-auto max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
            <table className="table-auto w-full text-left">
              <tbody>
                <tr>
                  <td>
                    <div className="text-base text-neutral-800">Staff’s photo</div>
                    <button className="justify-center items-center px-1 w-3 h-3 text-xs text-center text-white whitespace-nowrap rounded-full bg-zinc-300" role="tooltip" tabIndex="0">?</button>
                    <div className="mt-2 text-xs text-blue-500">Maximum size: 1MB</div>
                  </td>
                  <td>
                    <img
                      loading="lazy"
                      src={photo}
                      className="border border-solid aspect-square border-stone-300 w-[99px]"
                      alt="Staff's photo"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold capitalize text-neutral-800">e-mail</td>
                  <td className="text-sm text-neutral-800 text-opacity-80">{email}</td>
                </tr>
                <tr>
                  <td className="font-semibold capitalize text-neutral-800">department</td>
                  <td className="text-sm text-neutral-800 text-opacity-80">{department}</td>
                </tr>
                <tr>
                  <td className="font-semibold capitalize text-neutral-800">position</td>
                  <td className="text-sm text-neutral-800 text-opacity-80">{position}</td>
                </tr>
                <tr>
                  <td className="font-semibold capitalize text-neutral-800">grade</td>
                  <td className="text-sm text-neutral-800 text-opacity-80">{grade}</td>
                </tr>
                <tr>
                  <td className="font-semibold capitalize text-neutral-800">location</td>
                  <td className="text-sm text-neutral-800 text-opacity-80">{location}</td>
                </tr>
                <tr>
                  <td className="font-semibold capitalize text-neutral-800">office number</td>
                  <td className="text-sm text-neutral-800 text-opacity-80">{phone}</td>
                </tr>
                <tr>
                  <td className="font-semibold capitalize text-neutral-800">whatsapp number</td>
                  <td className="text-sm text-neutral-800 text-opacity-80">{whatsapp}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default ProfileBio;
