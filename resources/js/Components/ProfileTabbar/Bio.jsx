import React from 'react';

function ProfileBio({ photo, email, department, position, grade, location, phone, whatsapp, isEditing, onFormDataChange, onPhotoChange }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFormDataChange((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            onPhotoChange(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex-auto my-auto max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                    <table className="table-auto w-11/12 text-left border-collapse">
                        <tbody>
                            <tr>
                                <td className="py-2">
                                    <div className="text-base text-neutral-800">
                                        Staff’s photo
                                        <button
                                            className="ml-2 inline-block justify-center items-center w-3.5 h-3.5 text-xs text-center text-white whitespace-nowrap rounded-full bg-zinc-300"
                                            role="tooltip"
                                            tabIndex="0"
                                        >
                                            ?
                                        </button>
                                    </div>
                                    <div className="text-xs text-blue-500">Maximum size: 1MB</div>
                                </td>
                                <td className="py-2">
                                    <div>
                                        <img
                                            loading="lazy"
                                            src={photo}
                                            className="border border-hidden aspect-square border-stone-300 w-[99px]"
                                            alt="Staff's photo"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="text-xs mt-1 block"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold capitalize text-neutral-800">e-mail</td>
                                <td className="py-2 text-sm text-neutral-800 text-opacity-80">
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleInputChange}
                                            className="text-sm text-neutral-800 text-opacity-80 mt-1 block w-full rounded-full shadow-sm"
                                        />
                                    ) : (
                                        email
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold capitalize text-neutral-800">department</td>
                                <td className="py-2 text-sm text-neutral-800 text-opacity-80">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="department"
                                            value={department}
                                            onChange={handleInputChange}
                                            className="text-sm mt-1 block w-full rounded-full shadow-sm"
                                        />
                                    ) : (
                                        department
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold capitalize text-neutral-800">position</td>
                                <td className="py-2 text-sm text-neutral-800 text-opacity-80">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="position"
                                            value={position}
                                            onChange={handleInputChange}
                                            className="text-sm mt-1 block w-full rounded-full shadow-sm"
                                        />
                                    ) : (
                                        position
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold capitalize text-neutral-800">grade</td>
                                <td className="py-2 text-sm text-neutral-800 text-opacity-80">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="grade"
                                            value={grade}
                                            onChange={handleInputChange}
                                            className="text-sm mt-1 block w-full rounded-full shadow-sm"
                                        />
                                    ) : (
                                        grade
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold capitalize text-neutral-800">location</td>
                                <td className="py-2 text-sm text-neutral-800 text-opacity-80">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={location}
                                            onChange={handleInputChange}
                                            className="text-sm mt-1 block w-full rounded-full shadow-sm"
                                        />
                                    ) : (
                                        location
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold capitalize text-neutral-800">office number</td>
                                <td className="py-2 text-sm text-neutral-800 text-opacity-80">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            value={phone}
                                            onChange={handleInputChange}
                                            className="text-sm mt-1 block w-full rounded-full shadow-sm"
                                        />
                                    ) : (
                                        phone
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold capitalize text-neutral-800">whatsapp number</td>
                                <td className="py-2 text-sm text-neutral-800 text-opacity-80">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="whatsapp"
                                            value={whatsapp}
                                            onChange={handleInputChange}
                                            className="text-sm mt-1 block w-full rounded-full shadow-sm"
                                        />
                                    ) : (
                                        whatsapp
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProfileBio;
