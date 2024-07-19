import React, { useState, useEffect } from 'react';
import './AddMemberPopup.css';
import defaultImage from '../../../../public/assets/dummyStaffPlaceHolder.jpg';

const SearchPopup = ({ isAddMemberPopupOpen, setIsAddMemberPopupOpen, people }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [loading, setLoading] = useState(false);

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

    console.log('searchResults', searchResults);

    const fetchAllSearchResults = async (query) => {
        setLoading(true);
        let allResults = [];
        let currentPage = 1;
        let hasMorePages = true;

        try {
            while (hasMorePages) {
            const response = await fetch(`http://127.0.0.1:8000/api/crud/users?search=${query}&page=${currentPage}&with[]=profile&with[]=employmentPost.department&with[]=employmentPost.businessPost&with[]=employmentPost.businessUnit`);
            const data = await response.json();
            allResults = [...allResults, ...data.data.data];
            currentPage++;
            hasMorePages = data.data.next_page_url !== null;
            }
            setSearchResults(allResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const topShadowStyle = {
        boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.18)'
    };

    const handleSearch = () => {
        fetchAllSearchResults(searchTerm);
    };

    // const filteredPeople = people.filter(person =>
    //     person.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

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
    };

    const handleAdd = () => {
        console.log('Selected people:', selectedPeople);
        setIsAddMemberPopupOpen(false);
    }

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
                        <div className="flex flex-wrap gap-2 px-2 mb-4 ml-1 ">
                            {selectedPeople.map((person, index) => (
                                <div key={index} className="flex items-center px-3 py-1 bg-[#EBF5FF] rounded-lg">
                                    <span className="mr-2 text-[#4780FF] ">{person.name}</span>
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
                                <div>Loading...</div>
                            ) : (
                                searchResults.map((person, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center p-2 cursor-pointer"
                                        onClick={() => handleSelectPerson(person)}
                                    >
                                        <img src={person.profile.image ? `/avatar/${person.profile.image}` : defaultImage} alt={person.name} className="w-10 h-10 mr-4 rounded-full" />
                                        <div>
                                            <div className="text-lg font-bold">{person.name}</div>
                                            <div className="font-light text-gray-600">{person.employment_post?.title || 'No title available'}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="flex justify-end pt-3 h-[70px] border-t" style={{...topShadowStyle}}>
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
