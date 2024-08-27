import React, { useState } from 'react';
import SearchBar from "./SearchBar";
import TaggedItem from "./TaggedItem";
import ActionButtons from "./ActionButtons";
import '../css/InputBox.css';

const TagInput = ({ tags, setTags, onClose, onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const predefinedTags = ['TM Networking Day', 'Peraduan Jomla!', 'Event 1', 'Event 2', 'Event 5', 'Event 4', 'Event 3'];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const filteredTags = predefinedTags.filter(tag =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="flex flex-col font-semibold rounded-none max-w-[442px]">
        <section className="flex flex-col pt-1.5 w-full bg-white rounded-2xl shadow-custom">
          <div className="flex flex-row w-full items-center justify-between px-6 mt-4 mb-2">
                <div className="text-2xl font-bold w-full">
                  Tag People
                </div>
                <div className="w-full flex justify-end">
                    <img
                        loading="lazy"
                        src="/assets/cancel.svg"
                        alt="Close icon"
                        className="self-end w-6 aspect-square cursor-pointer"
                        onClick={onClose}
                    />
                </div>
              </div>
            <div className="flex flex-col px-5 mt-1.5">
            <SearchBar value={searchTerm} onChange={handleSearchChange} placeholder="Search tags"/>
            <div className="tags-container">
              {filteredTags.map((tag, index) => (
                <div key={index} className="tag">
                  {tag}
                  <button onClick={() => handleAddTag(tag)}>+</button>
                </div>
              ))}
            </div>
            <h2 className="self-start text-sm font-bold leading-none text-neutral-500 mb-0 mt-5">Tagged</h2>
            <div className="tagged-items-container">
              {tags.map((tag, index) => (
                <TaggedItem key={index} tag={tag} onRemove={handleRemoveTag} />
              ))}
            </div>
          </div>
          <ActionButtons onSave={onSave} onCancel={onClose} />
        </section>
      </div>
    </div>
  );
};

export default TagInput;
