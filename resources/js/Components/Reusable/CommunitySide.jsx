import React, { useState, useEffect } from 'react';

const CommunityItem = ({ name, category, imgSrc, altText }) => (
  <article className="flex items-start w-full gap-2 px-4 py-1 mt-2">
    <div className="flex flex-col items-center mt-2 text-xs font-semibold uppercase ">
      <img src={imgSrc} alt={altText} className="aspect-square w-[53px] rounded-full " />
    </div>
    <div className="flex flex-col mt-1.5 text-sm font-bold">
      <h2>{name}</h2>
      <p className="text-xs font-semibold">{category}</p>
    </div>
  </article>
);

function MyComponent() {
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCommunities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/communities/communities', {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const communityData = data.data.data.map((community) => ({
        id: community.id,
        name: community.name,
        category: community.public ? 'Public' : 'Private',
        imgSrc: 'assets/departmentsDefault.jpg',
        altText: `${community.name} community image`,
        createdAt: new Date(community.created_at),
      }));
      setCommunities(
        communityData
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 6)
      );
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <div className="flex flex-col justify-center max-w-[290px] text-neutral-800 mb-20">
      <section className="flex flex-col items-start py-2 bg-white border-2 rounded-2xl shadow-custom">
        <h1 className="ml-4 text-2xl font-bold">Communities</h1>
        {isLoading ? (
          <div className="mt-20 ml-32 loading-spinner"></div>
        ) : (
          communities.map((community, index) => (
            <CommunityItem
              key={index}
              name={community.name}
              category={community.category}
              imgSrc={community.imgSrc}
              altText={community.altText}
            />
          ))
        )}
        <div className="w-full h-8 hover:bg-slate-200">
          <a href="/community" className="flex self-stretch mt-1.5 ml-4 font-bold items-center">
            VIEW ALL
          </a>
        </div>
      </section>
    </div>
  );
}

export default MyComponent;
