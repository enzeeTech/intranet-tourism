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
    const inputRef = useRef(null);

    const dummyOptions = ["Option 1", "Option 2", "Option 3"]; // Replace with your API data later

    useEffect(() => {
        setLocalFormData({
            department,
            unit,
            jobtitle,
            position,
            grade,
            location,
            phone
        });
    }, [department, unit, jobtitle, position, grade, location, phone]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveField = () => {
        onFormDataChange(localFormData);
    };

    const renderField = (label, name, value, editable = true) => (
        <tr key={name}>
            <td className="py-2 align-center font-semibold capitalize text-neutral-800 w-1/3">{label}</td>
            <td className="py-2 align-center w-2/3">
                {isEditing && editable ? (
                    <select
                        name={name}
                        value={localFormData[name]}
                        onChange={handleInputChange}
                        className="text-sm text-neutral-800 text-opacity-80 mt-1 block w-full rounded-full p-2 border-2 border-stone-300 max-md:ml-4"
                        ref={inputRef}
                    >
                        {dummyOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
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
                            {renderField('Department', 'department', localFormData.department)}
                            {renderField('Unit', 'unit', localFormData.unit)}
                            {renderField('Job Title', 'jobtitle', localFormData.jobtitle)}
                            {renderField('Position', 'position', localFormData.position)}
                            {renderField('Grade', 'grade', localFormData.grade, false)} {/* Grade is not editable */}
                            {renderField('Location', 'location', localFormData.location)}
                            {renderField('Office Number', 'phone', localFormData.phone)}
                        </tbody>
                    </table>
                </div>
            </div>
            {isEditing && (
                <div className="flex justify-end mt-4 pb-3">
                    <button onClick={handleSaveField} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full">Save</button>
                </div>
            )}
        </div>
    );
}

export default ProfileDepartment;
