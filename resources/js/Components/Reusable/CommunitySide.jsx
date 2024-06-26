import * as React from "react";

const CommunityItem = ({ name, category, followers, imgSrc, altText }) => (
  <article className="flex items-start gap-2 mt-2 px-4 py-1 w-full">

    <div className="flex flex-col items-center text-xs font-semibold uppercase mt-2 ">
      <img src={imgSrc} alt={altText} className="aspect-square w-[53px] rounded-full " />
      
    </div>

    <div className="flex flex-col mt-1.5 text-sm font-bold">
      <h2>{name}</h2>
      <p className="text-xs font-semibold">{category}</p>
      <p className="text-xs text-zinc-400">{followers} followers</p>
      
    </div>
    
  </article>
);

const communitiesData = [
  {
    name: "Malaysia’s spots",
    category: "Travel",
    followers: "12,543",
    imgSrc: "/assets/AnnounceIcon.svg",
    altText: "Malaysia’s spots community image",
  },
  {
    name: "Around KL",
    category: "Touristic",
    followers: "13,983",
    imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b5870980fe40c1334de2a5fe620d5645d21ea7641fa726fc6ab7066987fad07a?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&",
    altText: "Around KL community image",
  },
  {
    name: "Where to Go",
    category: "Travel",
    followers: "14,567",
    imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/32bbf52a3212f3a3283696aaed16cb497980020d521c69428df81f63f94334d1?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&",
    altText: "Where to Go community image",
  },
   {
    name: "Where to Go",
    category: "Travel",
    followers: "14,567",
    imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a453c12e2fe52e3ed7f8420272179bc3193a03f8fd59f6f17d4112338e3e383?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&",
    altText: "Where to Go community image",
  },
   {
    name: "Malaysia’s spots",
    category: "Travel",
    followers: "12,543",
    imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/805e7d8d820b405695d492e6dd637c7176323f0899ef6c542283701b469bf0cc?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&",
    altText: "Malaysia’s spots community image",
  },
  {
    name: "Malaysia’s spots",
    category: "Travel",
    followers: "12,543",
    imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/805e7d8d820b405695d492e6dd637c7176323f0899ef6c542283701b469bf0cc?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&",
    altText: "Malaysia’s spots community image",
  },

]

function MyComponent() {
  return (
    <div className="flex flex-col justify-center max-w-[290px] text-neutral-800 mb-20 ">
      <section className="flex flex-col items-start py-2   border-2 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold ml-4 ">Communities</h1>
        {communitiesData.map((community, index) => (
          <CommunityItem
            key={index}
            name={community.name}
            category={community.category}
            followers={community.followers}
            imgSrc={community.imgSrc}
            altText={community.altText}
          />
        ))}
        <div className="hover:bg-slate-200 w-full h-8">
        <a href="#view-all" className=" flex self-stretch mt-1.5 ml-4 font-bold items-center">
          VIEW ALL
        </a></div>
      </section>
    </div>
  );
}

export default MyComponent;