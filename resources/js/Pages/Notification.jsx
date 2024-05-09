import React from 'react';
import Layout from '../Layouts/DashboardLayout';
import icon_noti_orange from '../../../public/assets/icon/notification/Ellipse-orange.png';

const NotificationItem = ({
  imageSrc,
  message,
  // linkText,
  timeAgo,
  notiView,
}) => {
  return (
    <div className="w-full">
      <a href="#" className="block mt-2 text-xs text-blue-500">
        <div className="flex items-center gap-3 p-6 hover:bg-gray-200 w-full">
          <img src={imageSrc} alt="" className="shrink-0 aspect-square w-[68px]" />
          <div className="flex flex-col grow my-auto">
            <p className="text-sm font-bold text-neutral-800">
              {message}
              <span className="font-extrabold">Approved</span>!
            </p>
            <time className="mt-4 text-xs font-medium text-neutral-800 text-opacity-50">
              {timeAgo}
            </time>
          </div>
          {notiView === 1 && (
            <div className="flex items-center justify-end ml-auto">
              <img src={icon_noti_orange} alt="icon notification orange" />
            </div>
          )}
        </div>
      </a>
    </div>
 
);
};
//notiView = 1 = read | notiView = 0 = unread
const notificationData = [
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
    message: "Your request to change the Organisational chart picture was 1",
    linkText: "Check it out!",
    timeAgo: "10 mins ago",
    notiView: 0,
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
    message: "Your request to change the Organisational chart picture was 2 ",
    linkText: "Check it out!",
    timeAgo: "10 mins ago",
    notiView: 0,
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
    message: "Your request to change the Organisational chart picture was 3 ",
    linkText: "Check it out!",
    timeAgo: "10 mins ago",
    notiView: 0,
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
    message: "Your request to change the Organisational chart picture was 4 ",
    linkText: "Check it out!",
    timeAgo: "10 mins ago",
    notiView: 1,
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
    message: "Your request to change the Organisational chart picture was 5 ",
    linkText: "Check it out!",
    timeAgo: "10 mins ago",
    notiView: 1,
  },
];

const Notification = () => {
  return (
    // <Layout>
    <div className="flex flex-col px-5 mx-auto max-w-[940px]">
      <h1 className="w-full text-3xl font-bold text-neutral-800 max-md:max-w-full mt-6 mb-2">
        My Notifications
      </h1>
      <div className='w-1/3 border-b-2'></div>
      <section className="flex flex-col gap-5 pt-7 mt-4 w-full bg-white rounded-xl shadow-2xl">
        <div className="flex flex-col pb-5">
          <h2 className="text-2xl font-extrabold text-neutral-800 pl-6 pr-6">
            Notifications
          </h2>
          <nav className="flex gap-5 justify-between self-start pl-6 pr-6 pb-5 mt-6 text-lg font-semibold whitespace-nowrap text-neutral-800 max-sm:self-center">
            <a href="#" className="underline">All</a>
            <a href="http://localhost:8000/notification-unread" >Unread</a>
          </nav>
          <div>
            {notificationData.map((notification, index) => (
              <NotificationItem key={index} {...notification} />
            ))}
          </div>
        </div>
      </section>
    </div>
    // </Layout>
  );
}

export default Notification;