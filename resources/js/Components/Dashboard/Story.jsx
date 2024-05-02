import * as React from "react";

function Avatar({ src, alt, name }) {
  return (
    <div className="flex flex-col grow items-center text-sm text-center whitespace-nowrap text-neutral-800 max-md:mt-6">
      <img src={src} alt={alt} className="aspect-square w-[98px]" />
      <div className="mt-3">{name}</div>
    </div>
  );
}

function Stories() {
  const avatars = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f112564488aa36e3249859d0a7978ae87e135589f7a2546f20452573f4289865?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Thomas",
      name: "Thomas",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/26e9c323e2b3e2d4cb3ba7c439300d489fcd7efc28471a423d6df3137de94320?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Aisha",
      name: "Aisha",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f9f2a26cfd4c2c4cfd165c8a11e72547b5817ce689fd1780656a7eef5b65f656?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Dan",
      name: "Dan",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/39895574049d881fb475ea138e7d0fa865baaad0626f61c876f3d7b93f879f0b?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      alt: "Avatar of Musa",
      name: "Musa",
    },
  ];

  return (
    <div className="max-w-[624px]">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/280ef7ce147f9f42b56cb41ee01415ebfd13f8bce140ac3d10a470fac23918dc?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
            alt="Decorative border"
            className="grow shrink-0 aspect-[0.76] w-[97px] max-md:mt-10"
          />
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