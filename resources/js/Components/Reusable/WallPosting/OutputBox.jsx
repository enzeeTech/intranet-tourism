import * as React from "react";
import { useState, useEffect } from "react";

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

function OutputData() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/crud/posts?with[]=attachments", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Posts data:", data.data.data);
        const posts = data.data.data.map((post) => {
          post.attachments = Array.isArray(post.attachments) ? post.attachments : [post.attachments];
          return post;
        });
        setPostData(posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const icons = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/594907e3c69b98b6d0101683915b195ce42280c8ba80773ecd95b387436ea664?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&", alt: "Icon 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/202b9f1277b73cbc2e1879918537061084b7287ef0a87b496a5b16d68837ff74?apiKey=0fc34b149732461ab0a1b5ebd38a1a4f&", alt: "Icon 2" },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {postData && postData.map((post) => (
        <div key={post.id} className="input-box-container" style={{ height: "auto", marginTop: "-10px" }}>
          <article className="flex flex-col px-5 pb-2.5 bg-white rounded-2xl shadow-sm max-w-[610px]">
            <header className="flex gap-5 justify-between items-start px-px w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 mt-2">
                {/* <Avatar src={post.user.avatar} alt={`${post.user.name}'s avatar`} /> */}
                {/* <UserInfo name={post.user.name} timestamp={post.timestamp} /> */}
              </div>
              <div className="flex gap-5 justify-between">
                {icons.map((icon, index) => (
                  <IconButton key={index} src={icon.src} alt={icon.alt} />
                ))}
              </div>
            </header>
            <p className="mt-2.5 text-base leading-6 text-neutral-800 max-md:max-w-full">
              {post.content}
            </p>
            <p className="mt-3.5 text-xs font-semibold leading-6 text-blue-500 underline max-md:max-w-full">
              {post.tag}
            </p>
            {/* Render attachments */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {post.attachments.map((attachment, index) => (
                <div key={index} className="attachment">
                  {attachment.mime_type.startsWith("image/") ? (
                    <img src={`/storage/${attachment.path}`} alt="Attachment" className="w-full h-32 object-cover" />
                  ) : (
                    <a href={`/storage/${attachment.path}`} target="_blank" rel="noopener noreferrer">
                      {attachment.path.split("/").pop()}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </article>
        </div>
      ))}
    </>
  );
}

export default OutputData;
