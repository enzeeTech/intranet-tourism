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
    const [editingField, setEditingField] = useState(null);
    const [localFormData, setLocalFormData] = useState({});
    const inputRef = useRef(null);

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

    const handleEditField = (name) => {
        setEditingField(name);
    };

    const handleSaveField = () => {
        onFormDataChange(localFormData);
        setEditingField(null);
    };

    const handleCancelEdit = () => {
        setLocalFormData(originalFormData);
        setEditingField(null);
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            handleCancelEdit();
        }
    };

    useEffect(() => {
        if (editingField) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editingField]);

    const renderField = (label, name, value, type) => (
        <tr key={name}>
            <td className="py-2 align-center font-semibold capitalize text-neutral-800 w-1/3">{label}</td>
            <td className="py-2 align-center w-2/3">
                {editingField === name ? (
                    <input
                        type={type}
                        name={name}
                        value={localFormData[name]}
                        onChange={handleInputChange}
                        className="text-sm text-neutral-800 text-opacity-80 mt-1 block w-full rounded-full p-2 border-2 border-stone-300 max-md:ml-4"
                        ref={inputRef}
                    />
                ) : (
                    <div className="flex justify-between items-center">
                        <div className={`text-sm mt-1 block w-full rounded-md p-2 border-2 border-transparent text-neutral-800 text-opacity-80`}>
                            {value}
                        </div>
                        {isEditing && (
                            <button onClick={() => handleEditField(name)} className="ml-2 bg-gray-200 hover:bg-gray-400 text-black px-2 py-1 rounded-full">Edit</button>
                        )}
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
                            {renderField('Department', 'department', localFormData.department, 'text')}
                            {renderField('Unit', 'unit', localFormData.unit, 'text')}
                            {renderField('Job Title', 'jobtitle', localFormData.jobtitle, 'text')}
                            {renderField('Position', 'position', localFormData.position, 'text')}
                            {renderField('Grade', 'grade', localFormData.grade, 'text')}
                            {renderField('Location', 'location', localFormData.location, 'text')}
                            {renderField('Office Number', 'phone', localFormData.phone, 'text')}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* {isEditing && (
                <div className="flex justify-end mt-4 pb-3">
                    <button onClick={handleCancelEdit} className="bg-white text-gray-400 border border-gray-400 hover:bg-gray-400 hover:text-white px-4 py-2 rounded-full">Cancel</button>
                    <button onClick={handleSaveField} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full">Save</button>
                </div>
            )} */}
        </div>
    );
}

export default ProfileDepartment;
