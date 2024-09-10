import React, { useState, useRef, useEffect } from 'react';
import dropDownDownArrow from '../../../../public/assets/dropdownDownArrow.png'; 
import dropDownUpArrow from '../../../../public/assets/dropdownUpArrow.png'; 
import dummyStaffPlaceHolder from '../../../../public/assets/dummyStaffPlaceHolder.jpg';
import SearchPopup from './AddMemberPopup';
import ThreeDotButton from './ThreeDotButton'; 
import './css/DropdownStaffDirectory.css';

const DepartmentDropdown = ({ departments, onSelectDepartment, staffMembers, onNewMemberAdded, fetchStaffMembers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(() => {
    const savedDepartment = localStorage.getItem('selectedDepartment');
    return savedDepartment ? JSON.parse(savedDepartment) : { id: '', name: '' };
  });
  const [isAddMemberPopupOpen, setIsAddMemberPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    return savedSearchTerm || '';
  });
  const dropdownRef = useRef(null);

    // Clear local storage
    useEffect(() => {
      // Clear only the dropdown selection related to department
      localStorage.removeItem('selectedDepartment'); 
      localStorage.removeItem('searchTerm');
    
      // Reset state for dropdown
      setSelectedDepartment({ id: '', name: '' });
      setSearchTerm(''); 
    
      // Optionally set dropdown to closed when clearing
      setIsOpen(false);
    }, []); 

  const people = [
    { name: 'Aisha Binti SOmething shas as dasd asd', position: 'Pengarah Kanan', avatar: dummyStaffPlaceHolder },
    { name: 'Ben Tan', position: 'Timbalan Pengarah Kanan', avatar: dummyStaffPlaceHolder },
    { name: 'Nick', position: 'Setiausaha Pejabat', avatar: dummyStaffPlaceHolder },
    { name: 'Sarah', position: 'Setiausaha Pejabat', avatar: dummyStaffPlaceHolder },
    { name: 'Thomas', position: 'Timbalan Pengarah Kanan', avatar: dummyStaffPlaceHolder },
    { name: 'Zack', position: 'Pegawai', avatar: dummyStaffPlaceHolder },
    { name: 'Zara', position: 'Pegawai', avatar: dummyStaffPlaceHolder },
  ];

  const handleSelect = (department) => {
    setSelectedDepartment(department);
    localStorage.setItem('selectedDepartment', JSON.stringify(department));
    onSelectDepartment(department.id);
    setIsOpen(false);
    setSearchTerm(department.name);
    localStorage.setItem('searchTerm', department.name);
    fetchStaffMembers(department.id);
  };

  const toggleAddMemberPopup = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsAddMemberPopupOpen((prev) => !prev);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    event.preventDefault();
    event.stopPropagation();
    setSearchTerm('');
    setIsOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClickOutside = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      if (selectedDepartment.name){
        setSearchTerm(selectedDepartment.name);
      } else {
        setSearchTerm('');
      }
    }
    
  };
  
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="flex justify-between department-dropdown-container max-md:flex-row max-md:justify-start" ref={dropdownRef}>
      <div className="flex flex-row items-center max-md:flex-col max-md:w-full max-md:gap-4">
        <div className={`dropdown-header  ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Select Department"
            className="font-bold dropdown-header-input"
          />
          <img style={{ width: '15px', marginRight: '10px' }} src={isOpen ? dropDownUpArrow : dropDownDownArrow} alt="Toggle Dropdown" />
        </div>
        <div className="justify-start max-md:w-full">
          {selectedDepartment.id && (
            <a href={`/departmentInner?departmentId=${selectedDepartment.id}`}>
              <button className="flex-1 text-sm font-bold rounded-full whitespace-nowrap px-4 md:py-2.5 md:mr-4 max-md:py-2.5 lg:py-2.5 bg-blue-500 text-white hover:bg-blue-700">
                Visit Department
              </button>
            </a>      
          )}
        </div>  
      </div>
      {isOpen && (
        <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
          {filteredDepartments.map((dept) => (
            <li key={dept.id} onClick={() => handleSelect(dept)}>
              {dept.name}
            </li>
          ))}
        </ul>
      )}
      <div className="relative flex flex-row items-center justify-between w-full max-md:mt-4 max-md:flex-row max-md:justify-between lg:ml-0">
        {selectedDepartment.id && (
          <button 
            className="flex items-center justify-center text-sm font-bold px-6 py-2.5 bg-red-500 text-white rounded-full hover:bg-red-700" 
            onClick={toggleAddMemberPopup}
          >
            <img src="/assets/plus.svg" alt="Plus icon" className="w-3 h-3 mr-2" />
            Member
          </button>
        )}
        {selectedDepartment.id && (
          <ThreeDotButton selectedDepartmentId={selectedDepartment.id} />
        )}
      </div>
      {isAddMemberPopupOpen && (
        <SearchPopup
          isAddMemberPopupOpen={isAddMemberPopupOpen}
          setIsAddMemberPopupOpen={setIsAddMemberPopupOpen}
          departmentId={selectedDepartment.id}
          people={staffMembers}  // Ensure `staffMembers` is being used here
          onNewMemberAdded={onNewMemberAdded}
        />
      )}
    </div>
  );
};

export default DepartmentDropdown;
