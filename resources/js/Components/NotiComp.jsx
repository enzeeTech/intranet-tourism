import React from 'react';

class NotiComp extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        activeTab: 'all', // Default active tab is 'all'
        notifications: [
            // ... Your notifications array
            {
                id: 1,
                imageSrc: "/assets/smile.jpg",
                miniIcon: "",
                users: "Jonathan and sarep",
                orangeball: "/assets/orangeball.png",
                message: "also commented on your post hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee. ",
                timeAgo: "10 mins ago",
                notiView: 0,
                status: 3,
                read: true
            },
            {
                id: 2,
                imageSrc: "/assets/smile.jpg",
                miniIcon: "",
                users: "Nicky, Zucky & others",
                orangeball: "/assets/orangeball.png",
                message: "also wish your birthday on wall posting",
                timeAgo: "10 mins ago",
                notiView: 0,
                status: 1,
                read: false
            },
            {
                id: 3,
                imageSrc: "/assets/smile.jpg",
                miniIcon: "",
                users: "Ahmad & Emir ",
                orangeball: "/assets/orangeball.png",
                message: "also wish your birthday on wall posting",
                timeAgo: "10 mins ago",
                notiView: 0,
                status: 1,
                read: true
            },
            {
                id: 4,
                imageSrc: "/assets/smile.jpg",
                miniIcon: "",
                orangeball: "/assets/orangeball.png",
                users: "Yahya",
                message: "Your request to change the Organisational chart picture was 4 ",
                timeAgo: "10 mins ago",
                notiView: 0,
                status: 6,
                read: false
            },
            {
                id: 5,
                imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
                orangeball: "/assets/orangeball.png",
                users: "Nyet",
                message: "Your request to change the Organisational chart picture was 5 ",
                timeAgo: "10 mins ago",
                notiView: 0,
                status: 6,
                read: true
            },
            {
                id: 6,
                imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
                miniIcon: "",
                orangeball: "/assets/orangeball.png",
                users: "Baihaqi",
                message: "request to change the Organisational chart picture was 6 ",
                timeAgo: "10 mins ago",
                notiView: 0,
                status: 7,
                read: false
            },
            {
                id: 7,
                imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
                users: "Ahmad",
                message: "request to change the Organisational chart picture was 7 ",
                orangeball: "/assets/orangeball.png",
                timeAgo: "10 mins ago",
                notiView: 0,
                status: 8,
                read: false
            },
        ]
    };
}

    render() {
        const { activeTab, notifications } = this.state;

        // Filter notifications based on the active tab
        const filteredNotifications =
            activeTab === 'all'
                ? notifications.slice(0, 4) // Only display the first 4 notifications for 'all' tab
                : notifications.filter(notification => !notification.read);


        return (
            <div className="notification-list px-2 ">
                <ul>
                    {filteredNotifications.map(notification => (
                        <div className="flex flex-row h-[104px] mb-2 hover:bg-primary-100 items-center rounded-xl" key={notification.id}>
                            <div className="flex items-center bg-gray h-16">
                                <img className="h-14 w-14 ml-2" src={notification.imageSrc} alt=""
                                    style={{
                                        height: "80px",
                                        width: "80px",
                                        borderRadius: "100%"
                                    }}
                                />
                                {notification.status === 1 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14" src="/assets/noti-icon-react/birthday_I.png" alt="" />
                                )}
                                {notification.status === 2 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/calendar_I.svg" alt="" />
                                )}
                                {notification.status === 3 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/comment_I.svg" alt="" />
                                )}
                                {notification.status === 4 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/community_I.svg" alt="" />
                                )}
                                {notification.status === 6 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/filemanagement_I.svg" alt="" />
                                )}
                                {notification.status === 7 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/home_I.png" alt="" />
                                )}
                                {notification.status === 8 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/like.png" alt="" />
                                )}
                                {notification.status === 9 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/link_I.svg" alt="" />
                                )}
                                {notification.status === 10 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/media_I.svg" alt="" />
                                )}
                                {notification.status === 11 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/noti_I.svg" alt="" />
                                )}
                                {notification.status === 12 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/setting_I.svg" alt="" />
                                )}
                                {notification.status === 13 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/share_I.svg" alt="" />
                                )}
                                {notification.status === 14 && (
                                    <img className="absolute h-5 w-5 left-20 mt-14 bg-blue" src="/assets/noti-icon-react/staffdirectory_I.svg" alt="" />
                                )}
                            </div>
                            <div className="flex flex-col w-48 h-50 ml-2">
                                <div className="block px-2 py-1 text-sm notification-message">
                                    <span className="font-bold">{notification.users}</span>
                                    <span>{notification.message}</span>
                                </div>
                                <div className="block px-2 py-1 text-sm font-medium text-neutral-800 text-opacity-50">{notification.timeAgo}</div>
                            </div>
                            <div>
                                {!notification.read && (
                                    <img
                                        src="/assets/orangeball.png"
                                        alt="Unread"
                                        style={{ width: '10px', height: '10px', marginLeft: '10px' }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}

export default NotiComp;
