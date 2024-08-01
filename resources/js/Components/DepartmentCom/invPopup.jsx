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
    const [success, setSuccess] = useState('');
    const [currentMembers, setCurrentMembers] = useState([]);
    const csrfToken = useCsrf();

    useEffect(() => {
        fetchCurrentMembers();
    }, [departmentId]);

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

    const fetchCurrentMembers = async () => {
        try {
            const response = await fetch(`/api/crud/employment_posts?department_id=${departmentId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }
            const data = await response.json();
            const fetchedMembers = data.members || [];
            setCurrentMembers(fetchedMembers.map(member => member.user_id));
        } catch (error) {
            console.error('Error fetching current members:', error);
        }
    };

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
                const data = await response.json();
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
        if (currentMembers.includes(person.id)) {
            setError('This user is already in the department.');
            return;
        }
        if (selectedPeople.find(p => p.id === person.id)) {
            setError('This user is already selected.');
            return;
        }
        setSelectedPeople([...selectedPeople, person]);
        setError('');  
    };

    const handleDeselectPerson = (person) => {
        setSelectedPeople(selectedPeople.filter(p => p.id !== person.id));
    };

    const handleClose = () => {
        setIsAddMemberPopupOpen(false);
        setSuccess('');
        setError('');
    };

    const handleAdd = async () => {
        const url = '/api/crud/employment_posts';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', "X-CSRF-Token": csrfToken },
        };

        let hasError = false;

        for (const person of selectedPeople) {
            const userId = person.id;
            const businessPostId = String(person.employmentPost ? person.employmentPost.business_post_id : '1');
            const businessGradeId = String(person.employmentPost ? person.employmentPost.business_grade_id : '1');
            const businessSchemeId = String(person.employmentPost ? person.employmentPost.business_scheme_id : '1');

            const body = JSON.stringify({
                department_id: String(departmentId),
                business_post_id: businessPostId,
                business_grade_id: businessGradeId,
                business_scheme_id: businessSchemeId,
                user_id: String(userId),
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
                            className="w-[90%] p-2 mb-4 ml-[5%] border border-gray-300 rounded-full"
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
                        {success && <div className="mt-2 text-green-500">{success}</div>}
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
