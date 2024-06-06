// import React, { useEffect, useState } from "react";

// const ImageComponent = ({ src, alt, className }) => (
//   <img loading="lazy" src={src} alt={alt} className={className} />
// );

// function Image({ selectedItem }) {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/crud/resources")
//       .then((response) => response.json())
//       .then((data) => {
//         const imagePaths = data.data.data
//           .filter((item) => {
//             // Check if the item is an image, you can adjust the condition based on your API response
//             const fileExtension = item.path.split('.').pop().toLowerCase();
//             return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension);
//           })
//           .map((item) => ({
//             src: `http://127.0.0.1:8000/storage/${item.path}`,
//             alt: `Description ${item.id}`,
//             category: item.attachable_type // Adjust as per your condition
//           }));
//         setImages(imagePaths);
//       })
//       .catch((error) => console.error("Error fetching images:", error));
//   }, []);

//   // Filter images based on selectedItem
//   const filteredImages = selectedItem === 'All' ? images : images.filter(image => image.category === selectedItem);

//   return (
//     <section className="flex flex-col px-4 pt-4 py-3 pb-3 max-w-[1500px] max-md:px-5 bg-white rounded-2xl shadow-lg mt-4">
//       <header>
//         <h1 className="text-2xl font-bold text-neutral-800 max-md:max-w-full pb-2">
//           Images
//         </h1>
//         <hr className="underline" />
//       </header>
//       <section className="mt-8 max-md:max-w-full">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {filteredImages.length > 0 ? (
//             filteredImages.map((img, index) => (
//               <figure key={index} className="flex flex-col">
//                 <ImageComponent
//                   src={img.src}
//                   alt={img.alt}
//                   className="grow shrink-0 max-w-full aspect-[1.19] w-full"
//                 />
//               </figure>
//             ))
//           ) : (
//             <p>No Images available...</p>
//           )}
//         </div>
//       </section>
//     </section>
//   );
// }

// export default Image;





import React, { useEffect, useState } from "react";

const ImageComponent = ({ src, alt, className }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className={className}
    style={{ objectFit: "cover", width: "100%", height: "100%" }}
  />
);

function Image({ selectedItem }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/crud/resources")
      .then((response) => response.json())
      .then((data) => {
        const imagePaths = data.data.data
          .filter((item) => {
            // Check if the item is an image, you can adjust the condition based on your API response
            const fileExtension = item.path.split('.').pop().toLowerCase();
            return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension);
          })
          .map((item) => ({
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
                  className="grow shrink-0 w-full h-full"
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
