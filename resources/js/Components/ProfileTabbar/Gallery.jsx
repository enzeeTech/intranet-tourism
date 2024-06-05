import React from 'react';

const files = [
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  // More files...
]

const videoData = [
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  // More files...
]

function ProfileGallery() {
  return (
    <div className="flex flex-col w-full mt-6">
      <section className="px-6 py-6 w-full bg-white rounded-md shadow-custom max-md:px-5 max-md:max-w-full">
        <div className="text-2xl font-bold text-neutral-800 mb-6">Photo</div>
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {files.map((file, index) => (
            <li key={`${file.source}-${index}`} className="relative">
              <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img src={file.source} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                <button type="button" className="absolute inset-0 focus:outline-none">
                  <span className="sr-only">View details for {file.title}</span>
                </button>
              </div>
              <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{file.title}</p>
              <p className="pointer-events-none block text-sm font-medium text-gray-500">{file.size}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="px-6 py-6 w-full bg-white rounded-md shadow-custom max-md:px-5 max-md:max-w-full mt-10">
        <div className="text-2xl font-bold text-neutral-800 mb-6">Videos</div>
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {videoData.map((video, index) => (
            <li key={`${video.source}-${index}`} className="relative">
              <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img src={video.source} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                <button type="button" className="absolute inset-0 focus:outline-none">
                  <span className="sr-only">View details for {video.title}</span>
                </button>
              </div>
              <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{video.title}</p>
              <p className="pointer-events-none block text-sm font-medium text-gray-500">{video.size}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ProfileGallery;


// function MediaItem({ src, alt }) {
//   return (
//     <div className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
//       <img
//         loading="lazy"
//         src={src}
//         alt={alt}
//         className="grow shrink-0 mt-3.5 max-w-full aspect-[1.19] w-auto max-md:mt-10"
//       />
//     </div>
//   );
// }

// export function ProfileGallery() {
//   return (
    // <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
    //   {files.map((file) => (
    //     <li key={file.source} className="relative">
    //       <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
    //         <img src={file.source} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
    //         <button type="button" className="absolute inset-0 focus:outline-none">
    //           <span className="sr-only">View details for {file.title}</span>
    //         </button>
    //       </div>
    //       <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{file.title}</p>
    //       <p className="pointer-events-none block text-sm font-medium text-gray-500">{file.size}</p>
    //     </li>
    //   ))}
    // </ul>
//   )
// }

// export default ProfileGallery;

        {/* <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b964b38ab4577424894ab89afca98d210e5a3ab6ee6f4091065c1b0e53df2748?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
              alt="Main Photo"
              className="self-center mt-3.5 aspect-[1.19] w-[172px]"
            />
          </div>
          {photoData.map((photo, index) => (
            <MediaItem key={index} src={photo.src} alt={photo.alt} />
          ))}
        </div> */}