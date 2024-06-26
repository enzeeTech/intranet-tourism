// import React, { useState, useRef, useEffect } from 'react';
// import { Stage, Layer, Text } from 'react-konva';

// const TextOverlay = ({ imageUrl, onSave, selectedColor }) => {
//     const [text, setText] = useState('Double-click to edit');
//     const [x, setX] = useState(50);
//     const [y, setY] = useState(50);
//     const [editable, setEditable] = useState(false);
//     const textRef = useRef(null);
//     const inputRef = useRef(null);
//     const [inputStyle, setInputStyle] = useState({
//         position: 'absolute',
//         display: 'none'
//     });

//     const handleDragEnd = (e) => {
//         setX(e.target.x());
//         setY(e.target.y());
//     };

//     const handleDoubleClick = () => {
//         setEditable(true);
//     };

//     const handleBlur = () => {
//         setEditable(false);
//         onSave(text, x, y);
//     };

//     const handleInputChange = (e) => {
//         setText(e.target.value);
//     };

//     const applyStyles = () => {
//         const stage = textRef.current.getStage();
//         const textNode = textRef.current;

//         if (!stage || !textNode) return;

//         const textPosition = textNode.getClientRect({ skipTransform: true });
//         const layerPosition = stage.getClientRect();
//         const absPosition = {
//             x: layerPosition.x + textPosition.x,
//             y: layerPosition.y + textPosition.y
//         };

//         setInputStyle({
//             position: 'absolute',
//             left: `${absPosition.x + 20}px`,
//             top: `${absPosition.y + 48}px`,
//             width: `${textPosition.width}px`,
//             height: `${textPosition.height}px`,
//             fontSize: `${textNode.fontSize()}px`,
//             fontFamily: textNode.fontFamily(),
//             color: selectedColor, // Use selected color for text
//             backgroundColor: 'transparent',
//             border: 'none',
//             outline: 'none',
//             padding: '0',
//             margin: '0',
//             resize: 'none',
//             transformOrigin: 'top left',
//             transform: `scale(${stage.scaleX()}, ${stage.scaleY()}) rotate(${textNode.rotation()}deg)`
//         });
//     };

//     useEffect(() => {
//         applyStyles();
//     }, [text, x, y, selectedColor]);

//     return (
//         <div>
//             <div style={{ position: 'relative', width: '100%', height: '400px' }}>
//                 <img src={imageUrl} alt="Story" style={{ width: '100%', height: '100%', position: 'absolute' }} />
//                 <Stage width={500} height={400} style={{ position: 'absolute', top: 0, left: 0 }}>
//                     <Layer>
//                         <Text
//                             text={text}
//                             x={x}
//                             y={y}
//                             draggable
//                             fontSize={25}
//                             fill={selectedColor} // Use selected color for text fill
//                             onDragEnd={handleDragEnd}
//                             onDblClick={handleDoubleClick}
//                             ref={textRef}
//                         />
//                     </Layer>
//                 </Stage>
//             </div>
//             {editable && (
//                 <div>
//                     <input
//                         ref={inputRef}
//                         type="text"
//                         value={text}
//                         onChange={handleInputChange}
//                         onBlur={handleBlur}
//                         style={inputStyle}
//                         autoFocus
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TextOverlay;



// import React, { useState, useRef, useEffect } from 'react';
// import { Stage, Layer, Text } from 'react-konva';

// const TextOverlay = ({ imageUrl, onSave, selectedColor }) => {
//     const [text, setText] = useState('Double-click to edit');
//     const [x, setX] = useState(50);
//     const [y, setY] = useState(50);
//     const [editable, setEditable] = useState(false);
//     const textRef = useRef(null);
//     const inputRef = useRef(null);
//     const [inputStyle, setInputStyle] = useState({
//         position: 'absolute',
//         display: 'none'
//     });

//     const handleDragEnd = (e) => {
//         setX(e.target.x());
//         setY(e.target.y());
//     };

//     const handleDoubleClick = () => {
//         setEditable(true);
//     };

//     const handleBlur = () => {
//         setEditable(false);
//         onSave(text, x, y); // Call onSave with updated text position
//     };

//     const handleInputChange = (e) => {
//         setText(e.target.value);
//     };

//     const applyStyles = () => {
//         const stage = textRef.current.getStage();
//         const textNode = textRef.current;

//         if (!stage || !textNode) return;

//         const textPosition = textNode.getClientRect({ skipTransform: true });
//         const layerPosition = stage.getClientRect();
//         const absPosition = {
//             x: layerPosition.x + textPosition.x,
//             y: layerPosition.y + textPosition.y
//         };

//         setInputStyle({
//             position: 'absolute',
//             left: `${absPosition.x + 20}px`,
//             top: `${absPosition.y + 48}px`,
//             width: `${textPosition.width}px`,
//             height: `${textPosition.height}px`,
//             fontSize: `${textNode.fontSize()}px`,
//             fontFamily: textNode.fontFamily(),
//             color: selectedColor, // Use selected color for text
//             backgroundColor: 'transparent',
//             border: 'none',
//             outline: 'none',
//             padding: '0',
//             margin: '0',
//             resize: 'none',
//             transformOrigin: 'top left',
//             transform: `scale(${stage.scaleX()}, ${stage.scaleY()}) rotate(${textNode.rotation()}deg)`
//         });
//     };

//     useEffect(() => {
//         applyStyles();
//     }, [text, x, y, selectedColor]);

//     return (
//         <div>
//             <div style={{ position: 'relative', width: '100%', height: '400px' }}>
//                 <img src={imageUrl} alt="Story" style={{ width: '100%', height: '100%', position: 'absolute' }} />
//                 <Stage width={500} height={400} style={{ position: 'absolute', top: 0, left: 0 }}>
//                     <Layer>
//                         <Text
//                             text={text}
//                             x={x}
//                             y={y}
//                             draggable
//                             fontSize={25}
//                             fill={selectedColor} // Use selected color for text fill
//                             onDragEnd={handleDragEnd}
//                             onDblClick={handleDoubleClick}
//                             ref={textRef}
//                         />
//                     </Layer>
//                 </Stage>
//             </div>
//             {editable && (
//                 <div>
//                     <input
//                         ref={inputRef}
//                         type="text"
//                         value={text}
//                         onChange={handleInputChange}
//                         onBlur={handleBlur}
//                         style={inputStyle}
//                         autoFocus
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TextOverlay;



import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text } from 'react-konva';

const TextOverlay = ({ imageUrl, onSave, selectedColor }) => {
    const [text, setText] = useState('Double-click to edit');
    const [x, setX] = useState(50);
    const [y, setY] = useState(50);
    const [editable, setEditable] = useState(false);
    const textRef = useRef(null);
    const inputRef = useRef(null);
    const [inputStyle, setInputStyle] = useState({
        position: 'absolute',
        display: 'none'
    });

    const handleDragEnd = (e) => {
        setX(e.target.x());
        setY(e.target.y());
    };

    const handleDoubleClick = () => {
        setEditable(true);
    };

    const handleBlur = () => {
        setEditable(false);
        onSave(text, x, y); // Call onSave with updated text position
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const applyStyles = () => {
        const stage = textRef.current.getStage();
        const textNode = textRef.current;

        if (!stage || !textNode) return;

        const textPosition = textNode.getClientRect({ skipTransform: true });
        const layerPosition = stage.getClientRect();
        const absPosition = {
            x: layerPosition.x + textPosition.x,
            y: layerPosition.y + textPosition.y
        };

        setInputStyle({
            position: 'absolute',
            left: `${absPosition.x + 20}px`,
            top: `${absPosition.y + 48}px`,
            width: `${textPosition.width}px`,
            height: `${textPosition.height}px`,
            fontSize: `${textNode.fontSize()}px`,
            fontFamily: textNode.fontFamily(),
            color: selectedColor, // Use selected color for text
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '0',
            margin: '0',
            resize: 'none',
            transformOrigin: 'top left',
            transform: `scale(${stage.scaleX()}, ${stage.scaleY()}) rotate(${textNode.rotation()}deg)`
        });
    };

    useEffect(() => {
        applyStyles();
    }, [text, x, y, selectedColor]);

    return (
        <div>
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <img src={imageUrl} alt="Story" style={{ width: '100%', height: '100%', position: 'absolute' }} />
                <Stage width={500} height={400} style={{ position: 'absolute', top: 0, left: 0 }}>
                    <Layer>
                        <Text
                            text={text}
                            x={x}
                            y={y}
                            draggable
                            fontSize={25}
                            fill={selectedColor} // Use selected color for text fill
                            onDragEnd={handleDragEnd}
                            onDblClick={handleDoubleClick}
                            ref={textRef}
                        />
                    </Layer>
                </Stage>
            </div>
            {editable && (
                <div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={text}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        style={inputStyle}
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

export default TextOverlay;
