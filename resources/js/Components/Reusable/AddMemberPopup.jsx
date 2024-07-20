import React, { useState, useEffect } from 'react';
import './AddMemberPopup.css';
import defaultImage from '../../../../public/assets/dummyStaffPlaceHolder.jpg';

const SearchPopup = ({ isAddMemberPopupOpen, setIsAddMemberPopupOpen, departmentId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // New state for success message

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
        setLoading(true);
        setError('');
        let allResults = [];
        let currentPage = 1;
        let hasMorePages = true;

        try {
            while (hasMorePages) {
                const response = await fetch(`http://127.0.0.1:8000/api/crud/users?search=${query}&page=${currentPage}&with[]=profile&with[]=employmentPost.department&with[]=employmentPost.businessPost&with[]=employmentPost.businessUnit`);
                
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
        } finally {
            setLoading(false);
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

    const handleAdd = async () => {
        const url = 'http://localhost:8000/api/crud/employment_posts';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        };

        let hasError = false;

        for (const person of selectedPeople) {
            const employmentPost = person.employment_post;
            if (!employmentPost) {
                console.error('Missing employment post for:', person);
                setError(prev => `${prev} Missing employment post for ${person.name}. `);
                hasError = true;
                continue;
            }

            const businessPostId = String(employmentPost.business_post_id || '');
            const businessGradeId = String(employmentPost.business_grade_id || '');
            const businessSchemeId = String(employmentPost.business_scheme_id || '');

            if (!businessPostId || !businessGradeId || !businessSchemeId) {
                console.error('Missing required fields for:', person);
                setError(prev => `${prev} Missing required fields for ${person.name}. `);
                hasError = true;
                continue;
            }

            const body = JSON.stringify({
                department_id: String(departmentId),
                business_post_id: businessPostId,
                business_grade_id: businessGradeId,
                business_scheme_id: businessSchemeId,
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

                const data = responseText ? JSON.parse(responseText) : {};
                console.log('Successfully added member:', data);
                setSuccess('Members successfully added!'); // Set success message
            } catch (error) {
                console.error('Error adding member to department:', error);
                setError(prev => `${prev} An error occurred while adding ${person.name}.`);
                hasError = true;
            }
        }

        if (!hasError) {
            setTimeout(() => {
                setIsAddMemberPopupOpen(false);
                setSuccess(''); // Clear success message after closing
            }, 1000); // Delay closing to show success message
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
                            {loading ? (
                                <div className="mt-20 ml-32 loading-spinner"></div>
                            ) : (
                                searchResults.map((person, index) => (
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
                                ))
                            )}
                            {error && <div className="text-red-500 mt-2">{error}</div>}
                        </div>
                        {success && <div className="text-green-500 mt-2">{success}</div>} {/* Success message */}
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

export default SearchPopup;
