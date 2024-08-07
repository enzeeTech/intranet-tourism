import React, { useState, useEffect, useRef } from 'react';

function ProfileDepartment({
    department,
    unit,
    jobtitle,
    position,
    grade,
    location,
    phone,
    isEditing,
    onFormDataChange,
    originalFormData
}) {
    const [localFormData, setLocalFormData] = useState({});
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [jobTitleOptions, setJobTitleOptions] = useState([]);
    const [positionOptions, setPositionOptions] = useState([]);
    const [gradeOptions, setGradeOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [phoneOptions, setPhoneOptions] = useState([]);

    const inputRef = useRef(null);

    const csrfToken = ''; // Add your CSRF token here if needed

    useEffect(() => {
        const formData = {
            department,
            unit,
            jobtitle,
            position,
            grade,
            location,
            phone
        };
        setLocalFormData(formData);
    }, [department, unit, jobtitle, position, grade, location, phone]);

    const fetchData = async (API_URL, setOptions, label) => {
        let allItems = [];
        let currentPage = 1;
        let lastPage = 1;

        try {
            while (currentPage <= lastPage) {
                const response = await fetch(`${API_URL}?page=${currentPage}`, {
                    method: "GET",
                    headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok for ${label}`);
                }
                const data = await response.json();
                allItems = allItems.concat(data.data.data);
                lastPage = data.data.last_page;
                currentPage++;
            }
            setOptions(allItems);
        } catch (error) {
            console.error(`Error fetching data for ${label}:`, error);
        }
    };

    const fetchBusinessUnits = async () => {
        let allUnits = [];
        let currentPage = 1;
        let lastPage = 1;

        try {
            while (currentPage <= lastPage) {
                const response = await fetch(`/api/department/business_units?page=${currentPage}`, {
                    method: "GET",
                    headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok for Units');
                }
                const data = await response.json();
                allUnits = allUnits.concat(data.data);
                lastPage = data.last_page;
                currentPage++;
            }
            setUnitOptions(allUnits);
        } catch (error) {
            console.error('Error fetching data for Units:', error);
        }
    };

    useEffect(() => {
        fetchData('/api/department/departments', setDepartmentOptions, 'Departments');
        fetchBusinessUnits();
        fetchData('/api/department/business_posts', setJobTitleOptions, 'Positions');
        fetchData('/api/department/business_grades', setGradeOptions, 'Grades');
        fetchData('/api/department/employment_posts', setPhoneOptions, 'Location');
        fetchData('/api/department/employment_posts', setPhoneOptions, 'Phones');
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // Update the local form data
        setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    
        // Call the parent handler to update the main form data with the specific ID fields
        if (onFormDataChange) {
            const updatedData = {
                [name]: value,
            };
    
            // Append the IDs to the updated data
            if (name === 'department') {
                updatedData.department_id = value;
            } else if (name === 'unit') {
                updatedData.business_unit_id = value;
            } else if (name === 'jobtitle') {
                updatedData.business_post_id = value;
            } else if (name === 'grade') {
                updatedData.business_grade_id = value;
            } else if (name === 'location') {
                updatedData.location = value;
            } else if (name === 'phone') {
                updatedData.work_phone = value;
            }
            
    
            onFormDataChange(updatedData);
        }
    };
    
    

    const renderField = (label, name, value, options, editable = true, onChangeHandler = handleInputChange) => (
        <tr key={name}>
            <td className="py-2 align-center font-semibold capitalize text-neutral-800 w-1/3">{label}</td>
            <td className="py-2 align-center w-2/3">
                {isEditing && editable ? (
                    <select
                        name={name}
                        value={localFormData[name] || ''} // Ensure value is defined
                        onChange={onChangeHandler}
                        className="text-sm text-neutral-800 text-opacity-80 mt-1 block w-full rounded-full p-2 border-2 border-stone-300 max-md:ml-4 overflow-y-auto"
                        ref={inputRef}
                        style={{ maxHeight: '150px' }} // Set max height for scrollable options
                    >
                        <option value={value}>{value}</option> {/* Display the current value as an option */}
                        {options && options.map((option, index) => (
                            <option key={index} value={option?.id || ''}>{option?.title || option?.name || '' || option?.code || ''}</option>
                        ))}
                    </select>
                ) : (
                    <div className="text-sm mt-1 block w-full rounded-md p-2 border-2 border-transparent text-neutral-800 text-opacity-80">
                        {value}
                    </div>
                )}
            </td>
        </tr>
    );

    console.log("LOCALDATA", localFormData);

    return (
        <div className="flex-auto my-auto p-4">
            <div className="flex gap-5 sm:flex-col md:flex-col lg:flex-col sm:gap-4 lg:gap-6">
                <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                    <table className="table-auto w-full text-left border-collapse">
                        <tbody>
                            {renderField('Department', 'department', localFormData.department, departmentOptions, true, handleInputChange)}
                            {renderField('Unit', 'unit', localFormData.unit, unitOptions, true, handleInputChange)}
                            {renderField('Job Title', 'jobtitle', localFormData.jobtitle, jobTitleOptions, true, handleInputChange)}
                            {renderField('Position', 'position', localFormData.position, positionOptions, true, handleInputChange)}
                            {renderField('Grade', 'grade', localFormData.grade, gradeOptions, true, handleInputChange)}
                            <tr>
                                <td className="py-2 align-center font-semibold capitalize text-neutral-800 w-1/3">Location</td>
                                <td className="py-2 align-center w-2/3">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={localFormData.location || ''}
                                            onChange={handleInputChange}
                                            className="text-sm text-neutral-800 text-opacity-80 mt-1 block w-full rounded-full p-2 border-2 border-stone-300 max-md:ml-4"
                                        />
                                    ) : (
                                        <div className="text-sm mt-1 block w-full rounded-md p-2 border-2 border-transparent text-neutral-800 text-opacity-80">
                                            {localFormData.location}
                                        </div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 align-center font-semibold capitalize text-neutral-800 w-1/3">Office Number</td>
                                <td className="py-2 align-center w-2/3">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            value={localFormData.phone || ''}
                                            onChange={handleInputChange}
                                            className="text-sm text-neutral-800 text-opacity-80 mt-1 block w-full rounded-full p-2 border-2 border-stone-300 max-md:ml-4"
                                        />
                                    ) : (
                                        <div className="text-sm mt-1 block w-full rounded-md p-2 border-2 border-transparent text-neutral-800 text-opacity-80">
                                            {localFormData.phone}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProfileDepartment;
