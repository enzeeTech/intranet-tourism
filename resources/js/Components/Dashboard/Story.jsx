import * as React from "react";
import { CreateStory } from '@/Components/Dashboard';

function Avatar({ src, alt, name, addbtn }) {
  return (
    <div className="flex flex-col grow items-center text-sm text-center whitespace-nowrap text-neutral-800 max-md:mt-6">

{/* <div className="w-100 h-100 border-2 border-gray-700 rounded-full shadow-lg relative"> */}


      <img src={src} alt={alt} className="aspect-square w-[98px]" />
            {/* <img className="absolute h-5 w-5 left-20 mt-14 " src={addbtn}/>  */}
            
      {/* </div> */}
                  
      <div className="mt-3">{name}</div>
    </div>
  );
}

function Popup({ visible, onClose, content }) {
  return (
    visible && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-5 rounded shadow-lg w-4/6 h-5/6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 text-center">
              <h3 className="text-2xl font-bold border-b border-gray-300 pb-4">Create a Story</h3>
            </div>
            <button onClick={onClose} className="text-gray-600 hover:text-black">
              <img src="/assets/icon-close.png" alt="" />
            </button>
          </div>
          <div><CreateStory/></div>
        </div>
      </div>
    )
  );
}

function Stories() {
  const [isPopupVisible, setPopupVisible] = React.useState(false);
  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);
  const avatars = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f112564488aa36e3249859d0a7978ae87e135589f7a2546f20452573f4289865?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Thomas",
      addbtn: "http://127.0.0.1:5173/public/assets/addStory.svg",
      name: "Thomas",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/26e9c323e2b3e2d4cb3ba7c439300d489fcd7efc28471a423d6df3137de94320?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Aisha",
      addbtn: "http://127.0.0.1:5173/public/assets/addStory.svg",
      name: "Aisha",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f9f2a26cfd4c2c4cfd165c8a11e72547b5817ce689fd1780656a7eef5b65f656?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Dan",
      addbtn: "http://127.0.0.1:5173/public/assets/addStory.svg",
      name: "Dan",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/39895574049d881fb475ea138e7d0fa865baaad0626f61c876f3d7b93f879f0b?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Musa",
      addbtn: "http://127.0.0.1:5173/public/assets/addStory.svg",
      name: "Musa",
    },
  ];

  return (
    <div className="max-w-[624px]">
      <Popup
        visible={isPopupVisible}
        onClose={closePopup}
        content={<div>Here is the popup content!</div>}
      />
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="relative">
          <button onClick={openPopup}>
          <div className="flex items-center bg-gray h-24 border-4 border-white-700 rounded-full p-px">
            <img className="flex items-center bg-white h-24 w-24  rounded-full "
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9f2a26cfd4c2c4cfd165c8a11e72547b5817ce689fd1780656a7eef5b65f656?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
              // alt="Decorative border"
            /><img className="absolute h-5 w-5 left-20 mt-14 " 
            src="/assets/story/iconAddStory.svg"/>
          </div>
          </button>
          </div>
        <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
          <div className="px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full"
                >
                  <Avatar
                    src={avatar.src}
                    alt={avatar.alt}
                    name={avatar.name}
                    addbtn={avatar.addbtn}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stories;