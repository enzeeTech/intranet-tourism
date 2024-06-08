import React, { useState } from 'react';
import '../css/InputBox.css';

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');
  const predefinedTags = ['TM Networking Day', 'Peraduan Jomla!'];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="tag-input-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a tag"
        list="predefined-tags"
        className="tag-input"
      />
      <datalist id="predefined-tags">
        {predefinedTags.map((tag, index) => (
          <option key={index} value={tag} />
        ))}
      </datalist>
      <button onClick={handleAddTag} className="add-tag-button">Add Tag</button>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <button className="remove-tag-button" onClick={() => handleRemoveTag(tag)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
