// import React, { useEffect, useRef, useState } from 'react';

// // SearchBar Component
// function SearchBar({ onChange }) {
//   return (
//     <form className="flex items-center justify-center w-full text-lg text-opacity-50 rounded-md text-neutral-800">
//       <label className="sr-only" htmlFor="searchInput">Search people</label>
//       <input
//         id="searchInput"
//         type="text"
//         placeholder="Search people"
//         className="w-[500px] h-[43px] rounded-[30px] border-2 p-2"
//         aria-label="Search people"
//         onChange={onChange}
//         style={{ borderColor: 'initial', outline: 'none' }}
//         onFocus={(e) => (e.target.style.borderColor = 'blue')}
//         onBlur={(e) => (e.target.style.borderColor = 'initial')}
//       />
//     </form>
//   );
// }

// // UserItem Component
// function UserItem({ imgSrc, name, department }) {
//   return (
//     <div className="flex justify-between w-full gap-5 mt-4 text-base font-bold text-neutral-800">
//       <div className="flex gap-4">
//         <img loading="lazy" src={imgSrc} alt={`${name} (${department})`} className="shrink-0 aspect-square w-[51px]" />
//         <div className="flex-auto my-auto">{name} ({department})</div>
//       </div>
//       <img loading="lazy" src="/assets/pangkah.svg" alt="" className="w-5 my-auto shrink-0 aspect-square" />
//     </div>
//   );
// }

// // Invite Component
// function Invite({ onClose }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const users = [
//     { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9419b503653a3e9877c5f4645f1692737a3fd9cd52fcad5fa8fd9077eaedc3c2?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", name: "Aisha Binti", department: "Department" },
//     { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9419b503653a3e9877c5f4645f1692737a3fd9cd52fcad5fa8fd9077eaedc3c2?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", name: "John Doe", department: "Sales" },
//     { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9419b503653a3e9877c5f4645f1692737a3fd9cd52fcad5fa8fd9077eaedc3c2?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", name: "Jane Smith", department: "Marketing" }
//   ];

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const popupRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (popupRef.current && !popupRef.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [onClose]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <section ref={popupRef} className="flex flex-col pt-6 pb-5 bg-white rounded-2xl shadow-sm max-w-[431px]">
//         <header className="flex gap-5 self-center max-w-full text-lg font-extrabold text-center text-neutral-800 w-[431px] px-2">
//           <div className="flex-auto mb-4 text-xl font-bold">Invite people</div>
//           {/* <button onClick={onClose} className="s">
//             <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&" alt="" className="w-6 shrink-0 aspect-square" />
//           </button> */}
//         </header>
//         <main className="flex flex-col items-center w-full px-4">
//           <SearchBar onChange={handleSearchChange} />
//           {filteredUsers.map((user, index) => (
//             <UserItem key={index} imgSrc={user.imgSrc} name={user.name} department={user.department} />
//           ))}
//           <div className="flex self-end gap-5 mt-6 text-sm text-center">
//             <button className="my-auto font-semibold text-neutral-800" onClick={onClose}>Cancel</button>
//             <button className="justify-center px-6 py-2.5 bg-blue-500 hover:bg-blue-700 rounded-full font-bold text-white">Save</button>
//           </div>
//         </main>
//       </section>
//     </div>
//   );
// }

// export default Invite;

import React, { useState, useEffect } from 'react';
import '../Reusable/AddMemberPopup.css';
import defaultImage from '../../../../public/assets/dummyStaffPlaceHolder.jpg';
import { useCsrf } from "@/composables";

const Invite = ({ isAddMemberPopupOpen, setIsAddMemberPopupOpen, departmentId, onNewMemberAdded }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // New state for success message
    const csrfToken = useCsrf();

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (searchTerm) {
                fetchAllSearchResults(searchTerm);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [searchTerm]);

    const fetchAllSearchResults = async (query) => {
        setError('');
        let allResults = [];
        let currentPage = 1;
        let hasMorePages = true;

        try {
            while (hasMorePages) {
                const response = await fetch(`/api/crud/users?search=${query}&page=${currentPage}&with[]=profile&with[]=employmentPost.department&with[]=employmentPost.businessPost&with[]=employmentPost.businessUnit`);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }

                const responseText = await response.text();
                const data = responseText ? JSON.parse(responseText) : {};

                allResults = [...allResults, ...data.data.data];
                currentPage++;
                hasMorePages = data.data.next_page_url !== null;
            }
            setSearchResults(allResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError('Failed to fetch search results. Please try again.');
        }
    };

    const handleSelectPerson = (person) => {
        if (!selectedPeople.includes(person)) {
            setSelectedPeople([...selectedPeople, person]);
        }
    };

    const handleDeselectPerson = (person) => {
        setSelectedPeople(selectedPeople.filter(p => p !== person));
    };

    const handleClose = () => {
        setIsAddMemberPopupOpen(false);
        setSuccess(''); // Clear success message on close
    };

    console.log('selectedPeople', selectedPeople);

    const handleAdd = async () => {
        const url = '/api/crud/employment_posts';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', "X-CSRF-Token": csrfToken },
        };

        let hasError = false;

        for (const person of selectedPeople) {

            // if (!employmentPost) {
            //     console.error('Missing employment post for:', person);
            //     setError(prev => `${prev} Missing employment post for ${person.name}. `);
            //     hasError = true;
            //     continue;
            // }
            
            const userId = person.id;
            console.log('userId', userId);
            const businessPostId = String(person.employmentPost? person.employmentPost.business_post_id : '1');
            const businessGradeId = String(person.employmentPost? person.employmentPost.business_grade_id : '1');
            const businessSchemeId = String(person.employmentPost? person.employmentPost.business_scheme_id : '1');

            // if (!businessPostId || !businessGradeId || !businessSchemeId) {
            //     console.error('Missing required fields for:', person);
            //     setError(prev => `${prev} Missing required fields for ${person.name}. `);
            //     hasError = true;
            //     continue;
            // }
                

            const body = JSON.stringify({
                department_id: String(departmentId),
                business_post_id: businessPostId,
                business_grade_id: businessGradeId,
                business_scheme_id: businessSchemeId,
                user_id : String(userId),
            });

            try {
                const response = await fetch(url, { ...options, body });
                const responseText = await response.text();
                if (!response.ok) {
                    console.error('Error adding member to department:', responseText);
                    setError(prev => `${prev} Failed to add ${person.name}.`);
                    hasError = true;
                    continue;
                }

                const newMemberData = {
                  user_id: userId,
                  employment_post_id: businessPostId,
                  profile: {
                    bio: person.name,
                    image: person.profile?.image || '/assets/dummyStaffPlaceHolder.jpg',
                  },
                  employment_post: {
                    title: person.employmentPost?.title || '',
                  },
                  user: {
                    is_active: person.is_active,
                  }
                };
          
                onNewMemberAdded(newMemberData);

                // const data = responseText ? JSON.parse(responseText) : {};
                // console.log('Successfully added member:', data);
                setSuccess('Members successfully added!'); 
            } catch (error) {
                console.error('Error adding member to department:', error);
                setError(prev => `${prev} An error occurred while adding ${person.name}.`);
                hasError = true;
            }
        }

        if (!hasError) {
            setTimeout(() => {
                setIsAddMemberPopupOpen(false);
                setSuccess(''); 
            }, 1000); 
        }
    };

    return (
        <div>
            {isAddMemberPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg pt-7 w-[400px]">
                        <input
                            type="text"
                            placeholder="Search people"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[95%] p-2 mb-4 ml-[2.5%] border border-gray-300 rounded-full"
                        />
                        <div className="flex flex-wrap gap-2 px-2 mb-4 ml-1">
                            {selectedPeople.map((person, index) => (
                                <div key={index} className="flex items-center px-3 py-1 bg-[#EBF5FF] rounded-lg">
                                    <span className="mr-2 text-[#4780FF]">{person.name}</span>
                                    <button
                                        className="text-[#4780FF]"
                                        onClick={() => handleDeselectPerson(person)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="overflow-y-auto max-h-[290px] pl-2 custom-scrollbar">
                            {searchResults.map((person, index) => (
                                <div
                                    key={index}
                                    className="flex items-center p-2 cursor-pointer"
                                    onClick={() => handleSelectPerson(person)}
                                >
                                    <img src={person.profile && person.profile.image ? `/avatar/${person.profile.image}` : defaultImage} alt={person.name} className="w-10 h-10 mr-4 rounded-full" />
                                    <div>
                                        <div className="text-lg font-bold">{person.name}</div>
                                        <div className="font-light text-gray-600">{person.employment_post?.title || 'No title available'}</div>
                                    </div>
                                </div>
                            ))}
                            {error && <div className="mt-2 text-red-500">{error}</div>}

                        </div>
                        {success && <div className="mt-2 text-green-500">{success}</div>} {/* Success message */}
                        <div className="flex justify-end pt-3 h-[70px] border-t" style={{ boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.18)' }}>
                            <button
                                className="px-4 mb-4 mr-2 rounded-full text-[#222222]"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="w-[100px] px-4 mb-4 mr-4 text-white bg-red-500 hover:bg-red-700 rounded-full"
                                onClick={handleAdd}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invite;

