 import React, { useState, useEffect, useRef } from 'react';
 function ProfileBio({
     photo,
     username,
     email,
     dateofbirth,
     whatsapp,
     isEditing,
     onFormDataChange,
     onPhotoChange,
     originalFormData,
     onEditBio,
     onCancelBio,
     onSaveBio,
     userId // Add userId as a prop
 }) {
     const [localFormData, setLocalFormData] = useState({});
     const formRef = useRef(null);
 
     useEffect(() => {
         setLocalFormData({
             username,
             email,
             dateofbirth,
             whatsapp
         });
     }, [username, email, dateofbirth, whatsapp]);
 
     useEffect(() => {
         if (isEditing) {
             document.addEventListener('mousedown', handleClickOutside);
         } else {
             document.removeEventListener('mousedown', handleClickOutside);
         }
         return () => {
             document.removeEventListener('mousedown', handleClickOutside);
         };
     }, [isEditing]);
 
     const handleClickOutside = (event) => {
         if (formRef.current && !formRef.current.contains(event.target)) {
             onCancelBio();
         }
     };
 
     const handleInputChange = (e) => {
         const { name, value } = e.target;
         setLocalFormData((prevData) => ({
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
 
     const renderField = (label, name, value, type) => (
         <tr key={name}>
             <td className="py-2 align-center font-semibold capitalize text-neutral-800 w-1/3">{label}</td>
             <td className="py-2 align-center w-2/3">
                 {isEditing ? (
                     <input
                         type={type}
                         name={name}
                         value={localFormData[name]}
                         onChange={handleInputChange}
                         className="text-sm text-neutral-800 text-opacity-80 mt-1 block w-full rounded-full p-2 border-2 border-stone-300 max-md:ml-4"
                     />
                 ) : (
                     <div className="text-sm mt-1 block w-full rounded-md p-2 border-2 border-transparent text-neutral-800 text-opacity-80">
                         {value}
                     </div>
                 )}
             </td>
         </tr>
     );
 
     return (
         <div ref={formRef} className="flex-auto my-auto p-4">
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
                                                 src={photo}
                                                 className="aspect-square rounded-md w-[90px] h-[120px] ml-4 object-cover"
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
                             {username && renderField('Username', 'username', localFormData.username, 'text')}
                             {email && renderField('E-mail', 'email', localFormData.email, 'email')}
                             {dateofbirth && renderField('Date of Birth', 'dateofbirth', localFormData.dateofbirth, 'date')}
                             {whatsapp && renderField('Whatsapp Number', 'whatsapp', localFormData.whatsapp, 'text')}
                         </tbody>
                     </table>
                 </div>
             </div>
             {isEditing && (
                 <div className="flex justify-end mt-4 pb-3">
                     <button onClick={onCancelBio} className="bg-white text-gray-400 border border-gray-400 hover:bg-gray-400 hover:text-white px-4 py-2 rounded-full">Cancel</button>
                     <button onClick={() => onSaveBio({ ...localFormData, user_id: userId })} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full">Save</button>
                 </div>
             )}
         </div>
     );
 }
 
 export default ProfileBio;