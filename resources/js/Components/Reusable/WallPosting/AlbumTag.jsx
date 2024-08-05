import React, { useState } from 'react';
import SearchBar from "./SearchBar";
import TaggedItem from "./TaggedItem";
import ActionButtons from "./ActionButtons";
import '../css/InputBox.css';

const TagInput = ({ tags, setTags, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const predefinedTags = ['TM Networking Day', 'Peraduan Jomla!', 'Event 1', 'Event 2'];
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
        <section className="flex flex-col pt-1.5 w-full bg-white rounded-xl shadow-[2px_2px_8px_rgba(0,0,0,0.15)]">
          <header className="flex gap-5 justify-between self-end max-w-full text-2xl font-bold leading-tight text-center text-neutral-950 w-[265px]">
            <h1>Tag Album</h1>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d7986dce07599ceb2e5628dea9fdbbf7b0d6801dfeb283d90ffedce0217a1cf?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&&apiKey=23ce5a6ac4d345ebaa82bd6c33505deb" className="object-contain shrink-0 my-auto w-5 aspect-square" alt="" />
          </header>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb95fa8e5f21e40306c92e50625664e1476952960dbc6acadb3e12bbdec9547f?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&&apiKey=23ce5a6ac4d345ebaa82bd6c33505deb" className="object-contain mt-1.5 w-full aspect-[500]" alt="Album cover" />
          <div className="flex flex-col px-5 mt-4 w-full">
            <SearchBar value={searchTerm} onChange={handleSearchChange} placeholder="Search tags" />
            <div className="tags-container">
              {filteredTags.map((tag, index) => (
                <div key={index} className="tag">
                  {tag}
                  <button onClick={() => handleAddTag(tag)}>+</button>
                </div>
              ))}
            </div>
              <h2 className="self-start ml-3 text-sm font-bold leading-none text-neutral-500 mb-5 mt-5">Tagged</h2>
            <div className="tagged-items-container">
              {tags.map((tag, index) => (
                <TaggedItem key={index} tag={tag} onRemove={handleRemoveTag} />
              ))}
            </div>
           </div>
           <ActionButtons />
         </section>
       </div>
     </div>
  );
};

export default TagInput;