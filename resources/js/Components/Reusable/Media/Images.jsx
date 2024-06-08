// import React from "react";

// const ImageComponent = ({ src, alt, className }) => (
//   <img loading="lazy" src={src} alt={alt} className={className} />
// );

// function Image({ selectedItem }) {
//     const images = [
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f97088dce5111b021f152bc5a78566079408d1831f76b2a187727921544d3bf0?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_1-", category: 'TM Networking Day' },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d66f2bb2f745226540d4ec558fda8dc2eaaf952817f3889e30a21110c34abdd5?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_2-", category: 'Peraduan Jomla!' },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/937066010662aa5c99da9c16b6ce7a5975493bd3b8df162053ae6be701066cfb?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_3-", category: 'TM Networking Day' },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/46e728e4a05232c07d9ad4e18ba2e67a578afe3bba9bca1587052926f3b7a88e?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_4-", category: 'Peraduan Jomla!' },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/18654f25a91a2bdc5cb994045c725e075fd63fa77ae78d40530c416a98b7febe?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_5-", category: 'TM Networking Day' },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9f4a0a9b363e1a198b095a9caf775513e3f329693adfb544fbf830e1b3a86169?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_6-", category: 'Peraduan Jomla!' },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/78225388b08dc607fbc2d2855c235239da4742e20a3310ad52ae7d45dfb70e2c?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_7-", category: 'TM Networking Day' },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/937066010662aa5c99da9c16b6ce7a5975493bd3b8df162053ae6be701066cfb?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_8-", category: 'Peraduan Jomla!' },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f97088dce5111b021f152bc5a78566079408d1831f76b2a187727921544d3bf0?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_9-", category: 'TM Networking Day' },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/36dc735e1357fa1aea511068b61b4ef411ac5aef074f44048a757b589f34151e?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_10-", category: 'Peraduan Jomla!' },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/694f6195df5089e538c5154786e73aab779be8af85919d46a8b867d72e36a707?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_11-", category: 'TM Networking Day' },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/18654f25a91a2bdc5cb994045c725e075fd63fa77ae78d40530c416a98b7febe?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Description ext_12-", category: 'Peraduan Jomla!' },
//         // Add more images here
//     ];

//     // Filter images based on selectedItem
//     const filteredImages = selectedItem === 'All' ? images : images.filter(image => image.category === selectedItem);

//     return (
//       <section className="flex flex-col px-4 pt-4 py-3 pb-3 max-w-[1500px] max-md:px-5 bg-white rounded-2xl shadow-lg mt-4">
//         <header>
//           <h1 className="text-2xl font-bold text-neutral-800 max-md:max-w-full pb-2">
//             Images
//           </h1>
//           <hr className="underline" />
//         </header>
//         <section className="mt-8 max-md:max-w-full">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//             {filteredImages.length > 0 ? (
//               filteredImages.map((img, index) => (
//                 <figure key={index} className="flex flex-col">
//                   <ImageComponent
//                     src={img.src}
//                     alt={img.alt}
//                     className="grow shrink-0 max-w-full aspect-[1.19] w-full"
//                   />
//                 </figure>
//               ))
//             ) : (
//               <p>No Images available...</p>
//             )}
//           </div>
//         </section>
//       </section>
//     );
// }

// export default Image;


// import React, { useState, useEffect } from "react";

// const ImageComponent = ({ src, alt, className }) => (
//   <img loading="lazy" src={src} alt={alt} className={className} />
// );

// function Images({ selectedItem }) {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await fetch("/api/crud/resources");
//         const data = await response.json();
//         const imagePaths = data.data.data.map(item => ({
//           src: `/storage/${item.path}`, // Adjust the base URL as needed
//           alt: `Image ${item.id}`,
//           category: item.attachable_type // Or any other relevant property
//         }));
//         setImages(imagePaths);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   return (
//     <div>
//       {images.map((image, index) => (
//         <ImageComponent
//           key={index}
//           src={image.src}
//           alt={image.alt}
//           className="image-class" // Add your desired class name here
//         />
//       ))}
//     </div>
//   );
// }

// export default Images;





import React, { useEffect, useState } from "react";

const ImageComponent = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={className} />
);

function Image({ selectedItem }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/crud/resources")
      .then((response) => response.json())
      .then((data) => {
        const imagePaths = data.data.data.map((item) => ({
          src: `http://127.0.0.1:8000/storage/${item.path}`,
          alt: `Description ${item.id}`,
          category: item.attachable_type // Adjust as per your condition
        }));
        setImages(imagePaths);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  // Filter images based on selectedItem
  const filteredImages = selectedItem === 'All' ? images : images.filter(image => image.category === selectedItem);

  return (
    <section className="flex flex-col px-4 pt-4 py-3 pb-3 max-w-[1500px] max-md:px-5 bg-white rounded-2xl shadow-lg mt-4">
      <header>
        <h1 className="text-2xl font-bold text-neutral-800 max-md:max-w-full pb-2">
          Images
        </h1>
        <hr className="underline" />
      </header>
      <section className="mt-8 max-md:max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredImages.length > 0 ? (
            filteredImages.map((img, index) => (
              <figure key={index} className="flex flex-col">
                <ImageComponent
                  src={img.src}
                  alt={img.alt}
                  className="grow shrink-0 max-w-full aspect-[1.19] w-full"
                />
              </figure>
            ))
          ) : (
            <p>No Images available...</p>
          )}
        </div>
      </section>
    </section>
  );
}

export default Image;

