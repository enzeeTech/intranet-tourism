import Login from '@/Pages/Auth/Login';
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

    useEffect(() => {
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

        fetchData('/api/department/departments', setDepartmentOptions, 'Departments');
        fetchData('/api/department/business_units', setUnitOptions, 'Units');
        fetchData('/api/department/business_posts', setPositionOptions, 'Positions');
        fetchData('/api/department/employment_posts', (data) => {
            const jobTitles = data.filter(post => post.category === 'job_title');
            const locations = data.filter(post => post.category === 'location');
            const phones = data.filter(post => post.category === 'phone');
            setJobTitleOptions(jobTitles);
            setLocationOptions(locations);
            setPhoneOptions(phones);
        }, 'Employment Posts');
        fetchData('/api/department/business_grades', setGradeOptions, 'Grades');
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (onFormDataChange) {
            onFormDataChange({ ...localFormData, [name]: value });
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
