import * as React from "react";

function IconWithText({ icon, text }) {
  return (
    <div className="flex gap-3.5 px-5">
      <img src={icon} alt="" className="shrink-0 self-start aspect-square w-[15px]" />
      <div> {text} </div>
    </div>
  );
}

function MyComponent() {
  const items = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d5c7d5874a923f367dec03dbafedc442e9f5c147e56d96b241d2dd7a5d200e9b?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&",
      text: "Change profile from gallery",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c6818832707f1421dfadfb47c9478d606022af552d03bf1e16dd65497feae569?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&",
      text: "Pick an Avatar",
    },
    {
        text: "Edit Profile Photo",
    },

  ];

  return (
    <div className="flex flex-col py-5 text-base font-semibold bg-white rounded-2xl shadow-sm max-w-[271px] text-neutral-800">
      <div className="flex flex-col gap-3.5 self-center">
        {items.map((item, index) => (
          <IconWithText key={index} icon={item.icon} text={item.text} />
        ))}
      </div>
    </div>
  );
}

