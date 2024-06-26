// import React, { useState } from 'react';
// import TextOverlay from './TextOverlay';
// import { ChromePicker } from 'react-color';

// const CreateImageStory = ({ onPostStory }) => {
//     const [image, setImage] = useState(null);
//     const [textData, setTextData] = useState(null);
//     const [selectedColor, setSelectedColor] = useState('#ffffff'); // Initial color

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setImage(reader.result);
//         };
//         reader.readAsDataURL(file);
//     };

//     const handleSaveText = (text, x, y) => {
//         setTextData({ text, x, y });
//     };

//     const handlePost = () => {
//         if (image && textData) {
//             const newStory = {
//                 url: image,
//                 text: textData.text,
//                 x: textData.x,
//                 y: textData.y,
//                 color: selectedColor, // Include selected color
//                 type: 'image'
//             };
//             onPostStory(newStory);
//         }
//     };

//     const handleColorChange = (color) => {
//         setSelectedColor(color.hex);
//     };

//     return (
//         <div>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {image && (
//                 <>
//                     <TextOverlay
//                         imageUrl={image}
//                         onSave={handleSaveText}
//                         selectedColor={selectedColor} // Pass selected color
//                     />
//                     <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//                         <button onClick={handlePost} style={{ marginRight: '10px' }}>Post Story</button>
//                         <ChromePicker
//                             color={selectedColor}
//                             onChange={handleColorChange}
//                             onChangeComplete={handleColorChange}
//                         />
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default CreateImageStory;


// import React, { useState } from 'react';
// import TextOverlay from './TextOverlay';
// import { ChromePicker } from 'react-color';

// const CreateImageStory = ({ onPostStory }) => {
//     const [image, setImage] = useState(null);
//     const [textData, setTextData] = useState(null);
//     const [selectedColor, setSelectedColor] = useState('#ffffff'); // Initial color

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setImage(reader.result);
//         };
//         reader.readAsDataURL(file);
//     };

//     const handleSaveText = (text, x, y) => {
//         setTextData({ text, x, y, color: selectedColor });
//     };

//     const handlePost = () => {
//         if (image && textData) {
//             const newStory = {
//                 url: image,
//                 text: textData.text,
//                 x: textData.x,
//                 y: textData.y,
//                 color: textData.color, // Include selected color
//                 type: 'image'
//             };
//             onPostStory(newStory);
//         }
//     };

//     const handleColorChange = (color) => {
//         setSelectedColor(color.hex);
//     };

//     return (
//         <div>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {image && (
//                 <>
//                     <TextOverlay
//                         imageUrl={image}
//                         onSave={handleSaveText}
//                         selectedColor={selectedColor} // Pass selected color
//                     />
//                     <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//                         <button onClick={handlePost} style={{ marginRight: '10px' }}>Post Story</button>
//                         <ChromePicker
//                             color={selectedColor}
//                             onChange={handleColorChange}
//                             onChangeComplete={handleColorChange}
//                         />
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default CreateImageStory;


import React, { useState } from 'react';
import TextOverlay from './TextOverlay';
import { ChromePicker } from 'react-color';

const CreateImageStory = ({ onPostStory }) => {
    const [image, setImage] = useState(null);
    const [textData, setTextData] = useState(null);
    const [selectedColor, setSelectedColor] = useState('#ffffff'); // Initial color

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSaveText = (text, x, y) => {
        setTextData({ text, x, y, color: selectedColor });
    };

    const handlePost = () => {
        if (image && textData) {
            const newStory = {
                url: image,
                text: textData.text,
                x: textData.x,
                y: textData.y,
                color: textData.color, // Include selected color
                type: 'image'
            };
            onPostStory(newStory);
        }
    };

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && (
                <>
                    <TextOverlay
                        imageUrl={image}
                        onSave={handleSaveText}
                        selectedColor={selectedColor} // Pass selected color
                    />
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <button onClick={handlePost} style={{ marginRight: '10px' }}>Post Story</button>
                        <ChromePicker
                            color={selectedColor}
                            onChange={handleColorChange}
                            onChangeComplete={handleColorChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CreateImageStory;
