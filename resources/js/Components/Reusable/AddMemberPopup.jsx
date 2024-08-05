import React, { useState, useEffect } from 'react';
import './AddMemberPopup.css';
import defaultImage from '../../../../public/assets/dummyStaffPlaceHolder.jpg';
import { useCsrf } from "@/composables";

const SearchPopup = ({ isAddMemberPopupOpen, setIsAddMemberPopupOpen, departmentId, onNewMemberAdded }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [currentMembers, setCurrentMembers] = useState([]);
    const [titles, setTitles] = useState([]);
    const [units, setUnits] = useState([]);
    const [title, setTitle] = useState('');
    const [unit, setUnit] = useState('');
    const [titleId, setTitleId] = useState('');
    const [unitId, setUnitId] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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

    useEffect(() => {
        fetchTitles('/api/department/business_posts?page=1');
        fetchUnits(`/api/department/business_units?department_id=${departmentId}&page=1`);
    }, [departmentId]);

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

    const fetchTitles = async (url) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: { Accept: 'application/json' }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const titleData = data.data.data.map((item) => ({
                id: item.id,
                title: item.title,
            }));

            setTitles((prevTitles) => {
                const allTitles = [...prevTitles, ...titleData];
                return allTitles.sort((a, b) => a.title.localeCompare(b.title));
            });

            if (data.data.next_page_url) {
                fetchTitles(data.data.next_page_url);
            }
        } catch (error) {
            console.error("Error fetching titles:", error);
        }
    };

    const fetchUnits = async (url) => {
        let allUnits = [];
        let hasMorePages = true;
    
        try {
            while (hasMorePages) {
                const response = await fetch(url, {
                    method: "GET",
                    headers: { Accept: 'application/json' }
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
    
                const unitData = data.data.map((unit) => ({
                    id: unit.id,
                    name: unit.name
                }));
    
                allUnits = [...allUnits, ...unitData];
    
                if (data.next_page_url) {
                    const urlObj = new URL(data.next_page_url);
                    const params = new URLSearchParams(urlObj.search);
                    params.set('department_id', departmentId);
                    url = `${urlObj.origin}${urlObj.pathname}?${params.toString()}`;
                } else {
                    hasMorePages = false;
                }
            }
            setUnits(allUnits.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (error) {
            console.error("Error fetching units:", error);
        }
    };

    const handleSelectPerson = (person) => {
        if (currentMembers.includes(person.id)) {
            setError('This user is already in the department.');
            return;
        }
        setSelectedPerson(person);
        setError('');  
    };

    const handleClose = () => {
        setIsAddMemberPopupOpen(false);
        setSelectedPerson(null);
        setSearchTerm('');
        setSearchResults([]);
        setTitle('');
        setUnit('');
        setLocation('');
        setError('');
        setSuccess(''); // Clear success message on close
    };

    const handleAdd = async () => {
        const url = '/api/department/employment_posts';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', "X-CSRF-Token": csrfToken },
        };

        const userId = selectedPerson.id;
        const businessPostId = titleId;
        const businessUnitId = unitId;
        const locationValue = location;
        const order = '0';        

        const body = JSON.stringify({
            department_id: String(departmentId),
            business_post_id: String(businessPostId),
            business_unit_id: String(businessUnitId),
            business_grade_id: String(selectedPerson.employment_post.business_grade_id),
            business_scheme_id: "1",
            user_id: String(userId),
            location: locationValue,
            order: order,
        });
        
        try {
            const response = await fetch(url, { ...options, body });
            const responseText = await response.text();
            if (!response.ok) {
                console.error('Error adding member to department:', responseText);
                setError(`Failed to add ${selectedPerson.name}.`);
                return;
            }

            const data = responseText ? JSON.parse(responseText) : {};
            console.log('Successfully added member:', data);

            console.log('selectedPerson from popup:', selectedPerson);

            const newMember = {
                id: userId,
                name: selectedPerson.name,  
                role: title,
                status: 'Online',
                imageUrl: selectedPerson.profile.image || '/assets/dummyStaffPlaceHolder.jpg',
                workNo: selectedPerson.profile.work_phone,
                phoneNo: selectedPerson.profile.phone_no,
                isDeactivated: selectedPerson.is_active,
                order: order,
            };  

            onNewMemberAdded(newMember);

            setSuccess('Member successfully added!'); // Set success message
        } catch (error) {
            console.error('Error adding member to department:', error);
            setError(`An error occurred while adding ${selectedPerson.name}.`);
        }

        setTimeout(() => {
            handleClose();
        }, 1000); // Delay closing to show success message
    };

    return (
        <div>
            {isAddMemberPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-3xl pt-7 px-4 w-[400px]">
                        <h1 className="mx-4 mb-4 text-2xl font-bold text-neutral-800">Invite People</h1>
                        <input
                            type="text"
                            placeholder="Search people"
                            value={selectedPerson ? selectedPerson.name : searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={!!selectedPerson}
                            className="w-[95%] p-2 mb-4 ml-[2.5%] border border-gray-300 rounded-full"
                        />
                        <div className="overflow-y-auto max-h-[290px] pl-2 custom-scrollbar">
                            {!selectedPerson && searchResults.map((person, index) => (
                                <div
                                    key={index}
                                    className="flex items-center p-2 cursor-pointer"
                                    onClick={() => handleSelectPerson(person)}
                                >
                                    <img src={person.profile && person.profile.image ? `/avatar/${person.profile.image}` : defaultImage} alt={person.name} className="w-10 h-10 mr-4 rounded-full" />
                                    <div>
                                        <div className="text-lg font-bold">{person.name}</div>
                                        <div className="font-light text-gray-600">{person.employment_post?.business_post.title || 'No title available'}</div>
                                    </div>
                                </div>
                            ))}
                            {error && <div className="mt-2 text-red-500">{error}</div>}
                        </div>
                        {selectedPerson && (
                            <div className="mx-2 my-2">
                                <div className="mb-2">
                                    <label className="block font-bold text-gray-700">Title</label>
                                    <select
                                        value={title.title}
                                        onChange={(e) => {
                                            setTitle(e.target.options[e.target.selectedIndex].text);
                                            setTitleId(e.target.value);
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-full"
                                    >
                                        <option value="">Select Title</option>
                                        {titles.map((title) => (
                                            <option key={title.id} value={title.id}>{title.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="block font-bold text-gray-700">Unit</label>
                                    <select
                                        value={unit.name}
                                        onChange={(e) => {
                                            setUnit(e.target.options[e.target.selectedIndex].text);
                                            setUnitId(e.target.value);
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-full"
                                    >
                                        <option value="">Select Unit</option>
                                        {units.map((unit) => (
                                            <option key={unit.id} value={unit.id}>{unit.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block font-bold text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-full"
                                    />
                                </div>
                            </div>
                        )}
                        {success && <div className="mt-2 text-green-500">{success}</div>} {/* Success message */}
                        <div className="flex justify-end -mx-4 pt-3 h-[70px] border-t" style={{ boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.18)' }}>
                            <button
                                className="px-4 mb-4 mr-2 font-bold rounded-full text-[#222222]"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="w-[100px] px-4 mb-4 mr-4 font-bold text-white bg-red-500 hover:bg-red-700 rounded-full"
                                onClick={handleAdd}
                                disabled={!selectedPerson || !title || !unit || !location}
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
