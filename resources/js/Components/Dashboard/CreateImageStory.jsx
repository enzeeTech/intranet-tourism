// import React, { useState } from 'react';

// const CreateImageStory = ({ onPostStory }) => {
//     const [media, setMedia] = useState(null);
//     const [mediaType, setMediaType] = useState(null);

//     const handleMediaChange = (e) => {
//         const file = e.target.files[0];
//         const fileType = file.type.startsWith('video') ? 'video' : 'image';
//         setMediaType(fileType);
//         setMedia(URL.createObjectURL(file));
//     };

//     const handlePostStory = () => {
//         if (media) {
//             const newStory = {
//                 url: media,
//                 type: mediaType,
//                 caption: 'New story',
//                 timestamp: Date.now() // Add timestamp
//             };
//             onPostStory(newStory);
//         }
//     };

//     return (
//         <div>
//             <h2>Create Media Story</h2>
//             <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
//             {media && (
//                 mediaType === 'video' ? (
//                     <video src={media} controls style={{ width: '100%', marginTop: '10px' }} />
//                 ) : (
//                     <img src={media} alt="Story preview" style={{ width: '100%', marginTop: '10px' }} />
//                 )
//             )}
//             <button onClick={handlePostStory}>Post Story</button>
//         </div>
//     );
// };

// export default CreateImageStory;



import React, { useState } from 'react';
import TextOverlay from './TextOverlay';

const CreateImageStory = ({ onPostStory }) => {
    const [image, setImage] = useState(null);
    const [textData, setTextData] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSaveText = (text, x, y) => {
        setTextData({ text, x, y });
    };

    const handlePost = () => {
        if (image && textData) {
            const newStory = {
                url: image,
                text: textData.text,
                x: textData.x,
                y: textData.y,
                type: 'image'
            };
            onPostStory(newStory);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <TextOverlay imageUrl={image} onSave={handleSaveText} />}
            <button onClick={handlePost}>Post Story</button>
        </div>
    );
};

export default CreateImageStory;
