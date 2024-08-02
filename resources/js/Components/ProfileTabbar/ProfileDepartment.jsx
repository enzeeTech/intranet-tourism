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
                    console.log(`Received data for ${label}:`, data);

                    allItems = allItems.concat(data.data.data);
                    lastPage = data.data.last_page;
                    currentPage++;
                }
                console.log(`All data fetched for ${label}:`, allItems);
                setOptions(allItems);
            } catch (error) {
                console.error(`Error fetching data for ${label}:`, error);
            }
        };

        fetchData('/api/department/departments', setDepartmentOptions, 'Departments');
        fetchData('/api/department/business_units', setUnitOptions, 'Units');
        fetchData('/api/department/employment_posts', setJobTitleOptions, 'Job Titles');
        fetchData('/api/department/business_posts', setPositionOptions, 'Positions');
        fetchData('/api/department/business_schemes&with[]=business_grades', setGradeOptions, 'Grades');
        fetchData('/api/department/employment_posts', setLocationOptions, 'Locations');
        fetchData('/api/department/employment_posts', setPhoneOptions, 'Phones');
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(`Field ${name} changed to:`, value);
    };

    const handleDepartmentChange = (e) => {
        const selectedDepartmentId = e.target.value;
        const selectedDepartment = departmentOptions.find(dept => dept.id === parseInt(selectedDepartmentId));

        setLocalFormData((prevData) => ({
            ...prevData,
            department: selectedDepartmentId,
            departmentName: selectedDepartment ? selectedDepartment.name : '',
        }));

        if (onFormDataChange) {
            onFormDataChange({ ...localFormData, department: selectedDepartmentId });
        }

        console.log(`Department changed to:`, selectedDepartment);
    };

    const handleUnitChange = (e) => {
        const selectedUnitId = e.target.value;
        const selectedUnit = unitOptions.find(unit => unit.id === parseInt(selectedUnitId));

        setLocalFormData((prevData) => ({
            ...prevData,
            unit: selectedUnitId,
            unitName: selectedUnit ? selectedUnit.name : '',
        }));

        if (onFormDataChange) {
            onFormDataChange({ ...localFormData, unit: selectedUnitId });
        }

        console.log(`Unit changed to:`, selectedUnit);
    };

    const handleJobTitleChange = (e) => {
        const selectedJobTitleId = e.target.value;
        const selectedJobTitle = jobTitleOptions.find(jobTitle => jobTitle.id === parseInt(selectedJobTitleId));

        setLocalFormData((prevData) => ({
            ...prevData,
            jobtitle: selectedJobTitleId,
            jobTitleName: selectedJobTitle ? selectedJobTitle.name : '',
        }));

        if (onFormDataChange) {
            onFormDataChange({ ...localFormData, jobtitle: selectedJobTitleId });
        }

        console.log(`Job Title changed to:`, selectedJobTitle);
    };

    const handlePositionChange = (e) => {
        const selectedPositionId = e.target.value;
        const selectedPosition = positionOptions.find(position => position.id === parseInt(selectedPositionId));

        setLocalFormData((prevData) => ({
            ...prevData,
            position: selectedPositionId,
            positionName: selectedPosition ? selectedPosition.title : '',
        }));

        if (onFormDataChange) {
            onFormDataChange({ ...localFormData, position: selectedPositionId });
        }

        console.log(`Position changed to:`, selectedPosition);
    };

    const handleGradeChange = (e) => {
        const selectedGradeId = e.target.value;
        const selectedGrade = gradeOptions.find(grade => grade.id === parseInt(selectedGradeId));

        setLocalFormData((prevData) => ({
            ...prevData,
            grade: selectedGradeId,
            gradeName: selectedGrade ? selectedGrade.name : '',
        }));

        if (onFormDataChange) {
            onFormDataChange({ ...localFormData, grade: selectedGradeId });
        }

        console.log(`Grade changed to:`, selectedGrade);
    };

    const handleLocationChange = (e) => {
        const selectedLocationId = e.target.value;
        const selectedLocation = locationOptions.find(location => location.id === parseInt(selectedLocationId));

        setLocalFormData((prevData) => ({
            ...prevData,
            location: selectedLocationId,
            locationName: selectedLocation ? selectedLocation.name : '',
        }));

        if (onFormDataChange) {
            onFormDataChange({ ...localFormData, location: selectedLocationId });
        }

        console.log(`Location changed to:`, selectedLocation);
    };

    const handlePhoneChange = (e) => {
        const selectedPhoneId = e.target.value;
        const selectedPhone = phoneOptions.find(phone => phone.id === parseInt(selectedPhoneId));

        setLocalFormData((prevData) => ({
            ...prevData,
            phone: selectedPhoneId,
            phoneName: selectedPhone ? selectedPhone.name : '',
        }));

        if (onFormDataChange) {
            onFormDataChange({ ...localFormData, phone: selectedPhoneId });
        }

        console.log(`Phone changed to:`, selectedPhone);
    };

    const renderField = (label, name, value, options, editable = true, onChangeHandler = handleInputChange) => (
        <tr key={name}>
            <td className="py-2 align-center font-semibold capitalize text-neutral-800 w-1/3">{label}</td>
            <td className="py-2 align-center w-2/3">
                {isEditing && editable ? (
                    <select
                        name={name}
                        value={localFormData[name]} // Bind to localFormData to track changes
                        onChange={onChangeHandler}
                        className="text-sm text-neutral-800 text-opacity-80 mt-1 block w-full rounded-full p-2 border-2 border-stone-300 max-md:ml-4 overflow-y-auto"
                        ref={inputRef}
                        style={{ maxHeight: '150px' }} // Set max height for scrollable options
                    >
                        <option value={value}>{value}</option> {/* Display the current value as an option */}
                        {options.map((option, index) => (
                            <option key={index} value={option.id}>{option.title || option.name}</option>
                        ))}
                    </select>
                ) : (
                    <div className={`text-sm mt-1 block w-full rounded-md p-2 border-2 border-transparent text-neutral-800 text-opacity-80`}>
                        {value}
                    </div>
                )}
            </td>
        </tr>
    );

    return (
        <div className="flex-auto my-auto p-4">
            <div className="flex gap-5 sm:flex-col md:flex-col lg:flex-col sm:gap-4 lg:gap-6">
                <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                    <table className="table-auto w-full text-left border-collapse">
                        <tbody>
                            {renderField('Department', 'department', originalFormData.department, departmentOptions, true, handleDepartmentChange)}
                            {renderField('Unit', 'unit', originalFormData.unit, unitOptions, true, handleUnitChange)}
                            {renderField('Job Title', 'jobtitle', originalFormData.jobtitle, jobTitleOptions, true, handleJobTitleChange)}
                            {renderField('Position', 'position', originalFormData.position, positionOptions, true, handlePositionChange)}
                            {renderField('Grade', 'grade', originalFormData.grade, gradeOptions, true, handleGradeChange)}
                            {renderField('Location', 'location', originalFormData.location, locationOptions, true, handleLocationChange)}
                            {renderField('Office Number', 'phone', originalFormData.phone, phoneOptions, true, handlePhoneChange)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProfileDepartment;
