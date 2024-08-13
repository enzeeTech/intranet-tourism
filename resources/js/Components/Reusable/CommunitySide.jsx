import React, { useState, useEffect } from 'react';

// const CommunityItem = ({ name, category, imgSrc, altText }) => (
//   <article className="flex items-start w-full gap-3 px-4 py-1 mt-0">
//     <div className="flex flex-col items-center mt-2 text-xs font-semibold uppercase ">
//       <img src={imgSrc} alt={altText} className="aspect-square w-[75px] rounded-md " />
//     </div>
//     <div className="flex flex-col mt-1.5 text-md font-bold">
//       <h2>{name}</h2>
//       <p className="text-xs font-semibold text-neutral-600">{category}</p>
//     </div>
//   </article>
// );

const CommunityItem = ({ name, category, imgSrc, altText }) => (
  <article className="flex items-start w-full gap-3 px-4 py-1 mt-1">
    <div className="flex flex-col items-center mt-2 text-xs font-semibold uppercase">
      <img
        src={imgSrc}
        alt={altText}
        className="w-[140px] rounded-md object-cover"
      />
    </div>
    <div className="w-full flex flex-col mt-2 text-md font-bold text-ellipsis overflow-hidden whitespace-nowrap">
      <h2 className="text-ellipsis overflow-hidden whitespace-nowrap">{name}</h2>
      <p className="text-xs font-semibold text-neutral-600">{category}</p>
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
        <h1 className="ml-4 mt-2 text-2xl font-bold">Communities</h1>
        <hr className="border border-gray-200 w-[235px] mx-4 -mt-4"></hr>
        {isLoading ? (
          <div className="mt-20 ml-20 loading-spinner"></div>
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
        <hr className="border border-gray-200 w-[235px] mx-4 mt-2"></hr>
        <a href='../community'>
          <button className="ml-4 my-2 font-bold text-sm flex items-center">
            VIEW ALL
            <img src="assets/viewAllArrow.png" alt="Arrow right" className="ml-2 h-3 w-4" />
          </button>
        </a>
      </section>
    </div>
  );
}

export default MyComponent;
