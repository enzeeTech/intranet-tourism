import * as React from "react";

const CommunityItem = ({ name, category, followers, imgSrc, altText }) => (
  <article className="flex items-start gap-1.5 mt-9">
    <div className="flex flex-col items-center text-xs font-semibold uppercase">
      <img src={imgSrc} alt={altText} className="aspect-square w-[53px]" />
    </div>
    <div className="flex flex-col mt-1.5 text-sm font-bold">
      <h2>{name}</h2>
      <p className="mt-1.5 text-xs font-semibold">{category}</p>
      <p className="mt-2.5 text-xs text-zinc-400">{followers} followers</p>
    </div>
  </article>
);

const communitiesData = [
  {
    name: "Malaysia’s spots",
    category: "Travel",
    followers: "12,543",
    imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ed491271d9b51768acec477e22fa65dc6cfef3bdc9c23ece52460fa7ca8c445?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&",
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
    name: "Around KL",
    category: "Touristic",
    followers: "13,983",
    imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/84be1e27ac464fee91ceb5e1017af84b57784de546d3ab2173351385461ffd45?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&",
    altText: "Around KL community image",
  },
]

function MyComponent() {
  return (
    <div className="flex flex-col justify-center max-w-[290px] text-neutral-800">
      <section className="flex flex-col items-start py-5 pr-20 pl-3 w-full bg-white rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold">Communities</h1>
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
        <a href="#view-all" className="self-stretch mt-36">
          view all
        </a>
      </section>
    </div>
  );
}

export default MyComponent;