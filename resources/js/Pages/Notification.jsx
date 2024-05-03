import React from 'react';
import Layout from '../Layouts/DashboardLayout';
import icon_noti_orange from '../../../public/assets/icon/notification/Ellipse-orange.png';

const NotificationItem = ({
  imageSrc,
  message,
  linkText,
  timeAgo,
  notiView,
}) => {
  return (
    <div className='grid grid-rows-3 grid-flow-col'>
      <div className='row-span-2'>
        <div className="flex gap-3 py-5">
          <img src={imageSrc} alt="" className="shrink-0 aspect-square w-[68px]" />
          <div className="flex flex-col grow shrink-0 my-auto basis-0 w-fit">
            <p className="text-sm font-bold text-neutral-800">
              {message}
              <span className="font-extrabold">Approved</span>!
            </p>
            <a href="#" className="mt-2 text-xs text-blue-500 underline">
              {linkText}
            </a>
            <time className="mt-4 text-xs font-medium text-neutral-800 text-opacity-50">
              {timeAgo}
            </time>
          </div>
        </div>
      </div>
    
      <div className='row-span-2 col-span-2 place-self-center px-2'>
        {notiView === 1 && (
          <img src={icon_noti_orange} alt="" className=" " />
        )}
      </div>
    </div>
  );
};
//notiView = 1 = read | notiView = 0 = unread
const notificationData = [
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
    message: "Your request to change the Organisational chart picture was 1 ",
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
      <section className="flex gap-5 justify-between self-end pt-7 pr-2 pl-7 mt-4 max-w-full bg-white rounded-xl shadow-2xl w-[735px] max-md:flex-wrap max-md:pl-5">
        <div className="flex flex-col pb-5">
          <h2 className="text-2xl font-extrabold text-neutral-800">
            Notifications
          </h2>
          <nav className="flex gap-5 justify-between self-start pb-5 mt-6 text-lg font-semibold whitespace-nowrap text-neutral-800 max-sm:self-center">
            <a href="#" className="underline">All</a>
            <a href="http://localhost:8000/notification-unread">Unread</a>
          </nav>
          {notificationData.map((notification, index) => (
            <NotificationItem key={index} {...notification} />
          ))}
        </div>
      </section>
    </div>
    // </Layout>
  );
}

export default Notification;