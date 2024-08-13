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


//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="flex flex-col font-semibold rounded-none max-w-[442px]">
//         <section className="flex flex-col pt-1.5 w-full bg-white rounded-3xl shadow-custom">
//           <header className="flex gap-5 mt-4 justify-between self-end max-w-full text-2xl font-bold leading-tight text-center text-neutral-950 w-[265px]">
//             <h1>Tag Album</h1>
//             <img src="/assets/cancel.svg" alt="Close icon" className="w-6 h-6 mr-4" onClick={onClose} />
//           </header>
//           {/* <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb95fa8e5f21e40306c92e50625664e1476952960dbc6acadb3e12bbdec9547f?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&&apiKey=23ce5a6ac4d345ebaa82bd6c33505deb" className="object-contain mt-1.5 w-full aspect-[500]" alt="Album cover" /> */}
//           <div className="flex flex-col px-5 mt-2 mb-4 w-full">
//             <SearchBar value={searchTerm} onChange={handleSearchChange} placeholder="Search tags" />
//             <div className="tags-container">
//               {filteredTags.map((tag, index) => (
//                 <div key={index} className="tag">
//                   {tag}
//                   <button onClick={() => handleAddTag(tag)}>+</button>
//                 </div>
//               ))}
//             </div>
//               <h2 className="self-start text-sm font-bold leading-none text-neutral-500 mb-0 mt-5">Tagged</h2>
//             <div className="tagged-items-container">
//               {tags.map((tag, index) => (
//                 <TaggedItem key={index} tag={tag} onRemove={handleRemoveTag} />
//               ))}
//             </div>
//            </div>
//            <ActionButtons />
//          </section>
//        </div>
//      </div>
//   );
// };



return (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="flex flex-col font-semibold rounded-none max-w-[442px]">
      <section className="flex flex-col pt-1.5 w-full bg-white rounded-3xl shadow-custom">
        <header className="flex gap-5 mt-4 justify-between self-end max-w-full text-2xl font-bold leading-tight text-center text-neutral-950 w-[265px]">
          <h1>Tag Album</h1>
          <img loading="lazy" src="/assets/cancel.svg" className="w-6 h-6 mr-4" alt="Close AlbumTag Popup" onClick={onClose} />
        </header>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb95fa8e5f21e40306c92e50625664e1476952960dbc6acadb3e12bbdec9547f?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&&apiKey=23ce5a6ac4d345ebaa82bd6c33505deb" className="object-contain mt-1.5 w-full aspect-[500]" alt="Album cover" />
        <div className="flex flex-col px-5 mt-2 mb-4 w-full">
          <SearchBar value={searchTerm} onChange={handleSearchChange} placeholder="Search tags" />
          <div className="tags-container">
            {filteredTags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <button onClick={() => handleAddTag(tag)}>+</button>
              </div>
            ))}
          </div>
            <h2 className="self-start ml-3 text-sm font-bold leading-none text-neutral-500 mb-0 mt-5">Tagged</h2>
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