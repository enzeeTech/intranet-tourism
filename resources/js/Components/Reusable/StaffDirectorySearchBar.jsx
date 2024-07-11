import React, { useState, useEffect } from 'react';
import searchIcon from '../../../../public/assets/searchStaffButton.png'; 
import staffListIconActive from '../../../../public/assets/staffListButton.png'; 
import staffListIconInactive from '../../../../public/assets/staffListButtonInactive.png';
import orgChartIconInactive from '../../../../public/assets/orgChartInactive.png';
import orgChartIconActive from '../../../../public/assets/orgChartActive.png';
import defaultImage from '../../../../public/assets/dummyStaffPlaceHolder.jpg';
import './css/StaffDirectorySearchBar.css';
import './css/General.css';

const SearchMembers = ({ onSearch, handleStaffListButton, handleOrgChartButton, isStaffListActive, isOrgChartActive }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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

  const handleSearch = () => {
    fetchAllSearchResults(searchTerm);
  };

  return (
    <div className="staff-search-bar-container max-w-[1100px] p-4 bg-white rounded-2xl shadow-custom mb-5 relative">
      <div className="mb-1 staff-search-bar-title">
        <h2 className="text-xl font-semibold">Search Members...</h2>
      </div>
      <div className={`flex flex-col items-center space-y-3 staff-search-bar sm:flex-row sm:space-y-0 sm:space-x-3 ${searchResults.length > 0 ? 'open-dropdown' : ''}`}>
        <input
          type="text"
          className={`flex-grow w-full p-3 border border-[#E4E4E4] rounded-full search-input sm:w-auto ${searchResults.length > 0 ? 'dropdown-open' : ''}`}
          placeholder="Search Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="flex w-full space-x-3 sm:justify-end sm:w-auto">
          <button onClick={handleSearch} style={{ height: 'auto', width: '123px'}}>
            <img src={searchIcon} alt="Search" />
          </button>
          <button onClick={handleStaffListButton} style={{ width: '60px', paddingTop: '3px', marginLeft: '-5px'}}>
            <img src={isStaffListActive ? staffListIconActive : staffListIconInactive} alt="Staff List" />
          </button>
          <button onClick={handleOrgChartButton} style={{width: '60px', paddingTop: '3px', marginLeft: '-15px'}}>
            <img src={isOrgChartActive ? orgChartIconActive : orgChartIconInactive} alt="Org Chart" />
          </button>
        </div>
      </div>
      {searchTerm && (
        <div className="mt-2 overflow-y-auto bg-white border border-gray-300 search-results-container custom-scrollbar max-h-72">
          {loading ? (
            <p className="p-2">Loading...</p>
          ) : (
            searchResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-2 search-result-item hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <img src={result.profile?.image1 || defaultImage} alt={result.name} className="w-10 h-10 mr-3 rounded-full" />
                  <p className="font-semibold">{result.name}</p>
                </div>
                <p className="text-gray-600">{result.employment_post?.title || 'No title available'}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMembers;
