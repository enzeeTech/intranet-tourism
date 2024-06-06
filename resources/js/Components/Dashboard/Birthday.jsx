import * as React from "react";

function Birthday() {
  const celebrationData = [
    {
      name: "Musa",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5db08b82e1c8aff2c462df9e709d80b53ddaa4da65e30695e157aa6ee7d14fb1?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      celebrationImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/96c54d7d1146194708b330f98787b2a78f0c2eeccd95379ae3182737f364e004?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
    },
  ];

  return (
    <div className="flex flex-col justify-center max-w-[290px] text-neutral-800">
      {celebrationData.map((celebration, index) => (
        <article key={index} className="flex gap-3.5 py-5 pr-12 pl-2.5 bg-white rounded-2xl shadow-sm">
          <img
            loading="lazy"
            src={celebration.image}
            alt={`${celebration.name}'s profile picture`}
            className="shrink-0 aspect-square w-[51px]"
          />
          <div className="flex flex-col self-start mt-2.5">
            <h2 className="text-sm font-semibold">
              <span className="text-neutral-800">It's </span>
              <span className="font-extrabold text-neutral-800">{celebration.name}'s</span>
              <span className="text-neutral-800"> Birthday today!</span>
            </h2>
            <div className="flex gap-2 mt-2 text-xs">
              <img
                loading="lazy"
                src={celebration.celebrationImage}
                alt="Celebration icon"
                className="shrink-0 aspect-square w-[22px]"
              />
              <a href="#" className="flex-auto my-auto underline">
                Let's Celebrate!
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Birthday;