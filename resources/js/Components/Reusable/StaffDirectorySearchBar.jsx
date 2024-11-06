import React, { useState, useEffect } from 'react';
import searchIcon from '../../../../public/assets/searchStaffButton.png';
import staffListIconActive from '../../../../public/assets/staffListButton.svg';
import staffListIconInactive from '../../../../public/assets/staffListButtonInactive.svg';
import orgChartIconInactive from '../../../../public/assets/orgChartInactive.svg';
import orgChartIconActive from '../../../../public/assets/orgChartActive.svg';
import defaultImage from '../../../../public/assets/dummyStaffPlaceHolder.jpg';
import './css/StaffDirectorySearchBar.css';
import './css/General.css';

const SearchMembers = ({ onSearch, handleStaffListButton, handleOrgChartButton, isStaffListActive, isOrgChartActive }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllSearchResults = async (query) => {
      setError('');
      let allResults = [];

      try {
          const response = await fetch(`/api/users/users?search=${query}&disabledPagination=true&with[]=profile&with[]=employmentPost.department&with[]=employmentPost.businessPost&with[]=employmentPost.businessUnit`);

          if (!response.ok) {
              throw new Error(`Failed to fetch: ${response.statusText}`);
          }

          const responseText = await response.text();
          const data = responseText ? JSON.parse(responseText) : {};

          allResults = data.data;

          setSearchResults(allResults);
      } catch (error) {
          console.error('Error fetching search results:', error);
          setError('Failed to fetch search results. Please try again.');
      } finally {
          setLoading(false);
      }
  };

  let debounceTimeout;

  useEffect(() => {
      clearTimeout(debounceTimeout);

      if (searchTerm.trim() !== '') {
          setLoading(true);
          debounceTimeout = setTimeout(() => {
              fetchAllSearchResults(searchTerm);
          }, 1000);
      } else {
          setSearchResults([]);
      }

      return () => clearTimeout(debounceTimeout);

  }, [searchTerm]);

  const handleSearch = () => {
    fetchAllSearchResults(searchTerm);
  };

  const getImageSource = (imageUrl) => {
    console.log('imageURL', imageUrl);
    if (imageUrl?.startsWith('staff_image/')) {
      return `/storage/${imageUrl}`;
    } else {
      return imageUrl === '/assets/dummyStaffPlaceHolder.jpg'
        ? imageUrl
        : `/avatar/${imageUrl}`;
    }
  };

  return (
    <div className="staff-search-bar-container max-w-[1100px] p-4 bg-white rounded-2xl shadow-custom mb-5 sm:left">
      <div className="mb-1 staff-search-bar-title">
        <h2 className="font-semibold lg:text-xl sm:text-sm md:text-md">Search Staff</h2>
      </div>
      <div className={`flex flex-col items-center space-y-3 staff-search-bar sm:flex-row sm:space-y-0 sm:space-x-3 ${searchResults.length > 0 ? 'open-dropdown' : ''}`}>
        <input
          type="text"
          className={`text-md px-6 bg-gray-100 border-gray-100 rounded-full flex-grow w-full py-3 search-input-staff-search-bar sm:w-auto ${searchResults.length > 0 ? 'dropdown-open' : ''}`}
          placeholder="Search name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex w-full space-x-3 sm:justify-end sm:w-auto">
          <button onClick={handleSearch} className="font-bold mt-0 text-md px-4 py-2 items-center bg-primary-500 text-white rounded-full hover:bg-primary-700 h-[43px]">
            Search
          </button>
          <button onClick={handleStaffListButton} className="shrink=0 w-10 aspect-square">
            <img src={isStaffListActive ? staffListIconActive : staffListIconInactive} alt="Staff List" />
          </button>
          <button onClick={handleOrgChartButton} className="shrink=0 w-10 aspect-square">
            <img src={isOrgChartActive ? orgChartIconActive : orgChartIconInactive} alt="Org Chart" />
          </button>
        </div>
      </div>
      {searchTerm && (
        <div className="mt-2 overflow-y-auto bg-white border border-gray-300 search-results-container custom-scrollbar max-h-72">
          {loading ? (
            <p className="p-2">Loading...</p>
          ) : error ? (
            <p className="p-2">{error}</p>
          ) : searchResults.length === 0 ? (
            <p className="p-2">No members found.</p>
          ) : (
            searchResults.map((result) => (
              <a key={result.id} href={`/user/${result.id}`}>
                <div className="flex items-center justify-between p-2 cursor-pointer search-result-item hover:bg-gray-100">
                  <div className="flex items-center cursor-pointer">
                    <img src={getImageSource(result.profile?.staff_image || '/assets/dummyStaffPlaceHolder.jpg')} alt={result.name} className="w-10 h-10 mr-3 rounded-full cursor-pointer" />
                    <p className="font-semibold cursor-pointer">{result.name}</p>
                  </div>
                  <p className="text-gray-600">{result.employment_post?.business_post.title || 'No title available'}</p>
                </div>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMembers;
