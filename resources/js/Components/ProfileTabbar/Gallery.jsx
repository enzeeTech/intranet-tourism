import React from 'react';

function PhotoItem({ src, alt }) {
    return (
      <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className="grow shrink-0 mt-8 max-w-full aspect-[1.19] w-[173px] max-md:mt-10"
        />
      </div>
    );
  }
  
  function VideoItem({ src, alt }) {
    return (
      <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className="grow shrink-0 mt-8 max-w-full aspect-[1.19] w-[173px] max-md:mt-10"
        />
      </div>
    );
  }
  
  function ProfileGallery({ photoData, videoData }) {
    return (
      <div className="flex flex-col max-w-[800px] mt-10">
        <section className="px-6 py-6 w-full bg-white rounded-md shadow-custom max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-2xl font-bold whitespace-nowrap text-neutral-800 max-md:mt-10">
                <h2>Photo</h2>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b964b38ab4577424894ab89afca98d210e5a3ab6ee6f4091065c1b0e53df2748?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
                  alt="Main Photo"
                  className="self-center mt-3.5 aspect-[1.19] w-[172px]"
                />
              </div>
            </div>
            {photoData.map((photo, index) => (
              <PhotoItem key={index} src={photo.src} alt={photo.alt} />
            ))}
          </div>
        </section>
        <section className="px-6 py-6 w-full bg-white rounded-md shadow-custom max-md:px-5 max-md:max-w-full mt-10">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-2xl font-bold whitespace-nowrap text-neutral-800 max-md:mt-10">
                <h2>Videos</h2>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbaca5c344dcb79e33b324a787c8c2119e2929aebc1bda0bf551ae62ef74fc?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
                  alt="Video 1"
                  className="self-center mt-3.5 aspect-[1.92] w-[172px]"
                />
              </div>
            </div>
            {videoData.map((video, index) => (
              <VideoItem key={index} src={video.src} alt={video.alt} />
            ))}
          </div>
        </section>
      </div>
    );
}


export default ProfileGallery;