import * as React from "react";

function Avatar({ src, alt }) {
  return <img loading="lazy" src={src} alt={alt} className="shrink-0 aspect-square w-[53px]" />;
}

function UserInfo({ name, timestamp }) {
  return (
    <div className="flex flex-col my-auto">
      <div className="text-base font-bold text-neutral-800">{name}</div>
      <div className="mt-3 text-xs text-neutral-800 text-opacity-50">{timestamp}</div>
    </div>
  );
}

function IconButton({ src, alt }) {
  return <img loading="lazy" src={src} alt={alt} className="shrink-0 w-7 aspect-square" />;
}

function MyComponent() {
  const user = {
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/918fe2ab1e2f4ab02e1d7f05e0e47f6b1a4dcd481beb92e66bb3866ea6da1ed7?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&",
    name: "Musa (xxx Department)",
    timestamp: "15 mins ago",
  };

  const icons = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/594907e3c69b98b6d0101683915b195ce42280c8ba80773ecd95b387436ea664?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&", alt: "Icon 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/202b9f1277b73cbc2e1879918537061084b7287ef0a87b496a5b16d68837ff74?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&", alt: "Icon 2" },
  ];

  return (
    <article className="flex flex-col px-5 pb-2.5 bg-white rounded-2xl shadow-sm max-w-[610px]">
      <header className="flex gap-5 justify-between items-start px-px w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-1 mt-2">
          <Avatar src={user.avatar} alt={`${user.name}'s avatar`} />
          <UserInfo name={user.name} timestamp={user.timestamp} />
        </div>
        <div className="flex gap-5 justify-between">
          {icons.map((icon, index) => (
            <IconButton key={index} src={icon.src} alt={icon.alt} />
          ))}
        </div>
      </header>
      <p className="mt-2.5 text-base leading-6 text-neutral-800 max-md:max-w-full">
        Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
        odio <span className="font-semibold">@Ben</span> mattis.
      </p>
      <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 underline max-md:max-w-full">@Ben is tagged</p>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/43a67f09e9b89eea063b1d9366edb8440d017120e345e0655e5821a7ff627b95?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&" alt="" className="mt-2.5 aspect-[3.85] w-[66px]" />
    </article>
  );
}

export default MyComponent;