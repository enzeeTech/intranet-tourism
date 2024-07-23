    // import React from 'react';

    // function ProfileBio({ photo, username, email, department, unit, jobtitle, position, grade, location, phone, dateofbirth, whatsapp, isEditing, onFormDataChange, onPhotoChange }) {
    //     const handleInputChange = (e) => {
    //         const { name, value } = e.target;
    //         onFormDataChange((prevData) => ({
    //             ...prevData,
    //             [name]: value,
    //         }));
    //     };

    //     const handlePhotoChange = (e) => {
    //         const file = e.target.files[0];
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             onPhotoChange(reader.result);
    //         };
    //         if (file) {
    //             reader.readAsDataURL(file);
    //         }
    //     };

    //     return (
    //         <div className="flex-auto my-auto p-4">
    //         <div className="flex gap-5 sm:flex-col md:flex-col lg:flex-col sm:gap-4 lg:gap-6">
    //                 <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
    //                     <table className="table-auto w-full text-left border-collapse">
    //                         <tbody>
    //                             <tr>
    //                                 <td className="py-2 align-center w-1/3">
    //                                     <div className="text-base text-neutral-800 font-semibold">
    //                                         Staff’s photo
    //                                         <button
    //                                             className="ml-2 inline-block justify-center items-center w-3.5 h-3.5 text-xs text-center text-white whitespace-nowrap rounded-full bg-zinc-300"
    //                                             role="tooltip"
    //                                             tabIndex="0"
    //                                         >
    //                                             ?
    //                                         </button>
    //                                     </div>
    //                                     <div className="text-xs text-blue-500">Maximum size: 1MB</div>
    //                                 </td>
    //                                 <td className="py-2 align-center w-2/3">
    //                                     <div className="flex items-center gap-4">
    //                                         <img
    //                                             loading="lazy"
    //                                             src={photo}
    //                                             className="aspect-square rounded-md w-[99px]"
    //                                             alt="Staff's photo"
    //                                         />
    //                                         {isEditing && (
    //                                             <input
    //                                                 type="file"
    //                                                 accept="image/*"
    //                                                 onChange={handlePhotoChange}
    //                                                 className="text-xs"
    //                                             />
    //                                         )}
    //                                     </div>
    //                                 </td>
    //                             </tr>
    //                             {[
    //                                 { label: 'username', name: 'username', value: username, type: 'username' },
    //                                 { label: 'e-mail', name: 'email', value: email, type: 'email' },
    //                                 { label: 'department', name: 'department', value: department, type: 'text' },
    //                                 { label: 'unit', name: 'unit', value: unit, type: 'text' },
    //                                 { label: 'job title', name: 'job title', value: jobtitle, type: 'text' },
    //                                 { label: 'position', name: 'position', value: position, type: 'text' },
    //                                 { label: 'grade', name: 'grade', value: grade, type: 'text' },
    //                                 { label: 'location', name: 'location', value: location, type: 'text' },
    //                                 { label: 'office number', name: 'phone', value: phone, type: 'text' },
    //                                 { label: 'date of birth', name: 'date of birth', value: dateofbirth, type: 'date' },
    //                                 { label: 'whatsapp number', name: 'whatsapp', value: whatsapp, type: 'text' },
    //                             ].map(({ label, name, value, type, editable = true }) => (
    //                                 <tr key={name}>
    //                                     <td className="py-2 align-center font-semibold capitalize text-neutral-800 w-1/3">{label}</td>
    //                                     <td className="py-2 align-center w-2/3">
    //                                         {isEditing && editable ? (
    //                                             <input
    //                                                 type={type}
    //                                                 name={name}
    //                                                 value={value}
    //                                                 onChange={handleInputChange}
    //                                                 className="text-sm text-neutral-800 text-opacity-80 mt-1 block w-full rounded-full p-2 border-2 border-stone-300"
    //                                             />
    //                                         ) : (
    //                                             <div className={`text-sm mt-1 block w-full rounded-md p-2 border-2 border-transparent ${editable ? 'text-neutral-800 text-opacity-80' : 'text-neutral-500'}`}>
    //                                                 {value}
    //                                             </div>
    //                                         )}
    //                                     </td>
    //                                 </tr>
    //                             ))}
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    // export default ProfileBio;

    import React from 'react';
 
     function ProfileBio({ 
         photo, 
         username, 
         email, 
         department, 
         unit, 
         jobtitle, 
         position, 
         grade, 
         location, 
         phone, 
         dateofbirth, 
         whatsapp, 
         isEditing, 
         onFormDataChange, 
         onPhotoChange 
     }) {
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
     
         const renderField = (label, name, value, type, editable = true) => (
             <tr key={name}>
                 <td className="py-2 align-center font-semibold capitalize text-neutral-800 w-1/3">{label}</td>
                 <td className="py-2 align-center w-2/3">
                     {isEditing && editable ? (
                         <input
                             type={type}
                             name={name}
                             value={value}
                             onChange={handleInputChange}
                             className="text-sm text-neutral-800 text-opacity-80 mt-1 block w-full rounded-full p-2 border-2 border-stone-300 max-md:ml-4"
                         />
                     ) : (
                         <div className={`text-sm mt-1 block w-full rounded-md p-2 border-2 border-transparent ${editable ? 'text-neutral-800 text-opacity-80' : 'text-neutral-500'}`}>
                             {value}
                         </div>
                     )}
                 </td>
             </tr>
         );
     
         return (
             <div className="flex-auto my-auto p-4">
                 <div className="flex gap-5 sm:flex-col md:flex-col lg:flex-col sm:gap-4 lg:gap-6">
                     <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                         <table className="table-auto w-full text-left border-collapse">
                             <tbody>
                                 {photo && (
                                     <tr>
                                         <td className="py-2 align-center w-1/3">
                                             <div className="text-base text-neutral-800 font-semibold">
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
                                         <td className="py-2 align-start w-2/3">
                                             <div className="flex items-center gap-4">
                                                 <img
                                                     loading="lazy"
                                                     src={`/storage/${photo}`}
                                                     className="aspect-square rounded-md w-[90px] h-[90px] ml-4"
                                                     alt="Staff's photo"
                                                 />
                                                 {isEditing && (
                                                     <input
                                                         type="file"
                                                         accept="image/*"
                                                         onChange={handlePhotoChange}
                                                         className="text-xs"
                                                     />
                                                 )}
                                             </div>
                                         </td>
                                     </tr>
                                 )}
                                 {username && renderField('username', 'username', username, 'username')}
                                 {email && renderField('e-mail', 'email', email, 'email')}
                                 {department && renderField('department', 'department', department, 'text')}
                                 {unit && renderField('unit', 'unit', unit, 'text')}
                                 {jobtitle && renderField('job title', 'jobtitle', jobtitle, 'text')}
                                 {position && renderField('position', 'position', position, 'text')}
                                 {grade && renderField('grade', 'grade', grade, 'text')}
                                 {location && renderField('location', 'location', location, 'text')}
                                 {phone && renderField('office number', 'phone', phone, 'text')}
                                 {dateofbirth && renderField('date of birth', 'dateofbirth', dateofbirth, 'date')}
                                 {whatsapp && renderField('whatsapp number', 'whatsapp', whatsapp, 'text')}
                             </tbody>
                         </table>
                     </div>
                 </div>
             </div>
         );
     }
     
     export default ProfileBio;
