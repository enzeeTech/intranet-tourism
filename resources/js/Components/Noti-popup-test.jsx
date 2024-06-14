import React from 'react';

const handleClick = () => {
    window.location.href = '../notification';
};

class NotificationPopup extends React.Component {
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
                    users: "Shet",
                    message: "6 request to change the Organisational chart picture was 6 ",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 7,
                    read: false
                },
                {
                    id: 7,
                    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
                    users: "Shit",
                    message: "7 request to change the Organisational chart picture was 7 ",
                    orangeball: "/assets/orangeball.png",
                    timeAgo: "10 mins ago",
                    notiView: 0,
                    status: 8,
                    read: false
                },
            ]
        };
    }

    handleTabChange = tab => {
        this.setState({ activeTab: tab });
    };

    render() {
        const { activeTab, notifications } = this.state;

        // Filter notifications based on the active tab
        const filteredNotifications =
            activeTab === 'all'
                ? notifications.slice(0, 4) // Only display the first 4 notifications for 'all' tab
                : notifications.filter(notification => !notification.read);

        
        return (
            <div className="notification-box absolute right-0 mt-2 w-[360px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <style>{`
                    .notification-message {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-height: 2.4em; /* 2 lines * 1.2em line height */
                        line-height: 1.2em;
                    }
                    .tab-button {
                        margin-left: 10px;
                        border-bottom: 2px solid transparent;
                        color: gray;
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 0;
                        text-decoration: none;
                        position: relative;
                    }
                    .tab-button.active {
                        border-bottom: 2px solid black;
                        color: black;
                    }
                    .orange-circle {
                        position: absolute;
                        top: 0;
                        right: -10px;
                        width: 7px;
                        height: 7px;
                        background-color: #FF4500;
                        border-radius: 50%;
                        margin-top: 10px; /* Tailwind equivalent of mt-4 */
                    }
                `}</style>

                <h2 style={{ marginLeft: "10px", marginTop: "10px", color: "#222222", fontSize: "24px" }}>
                    {activeTab === 'all' ? <strong>All Notifications</strong> : <strong>Unread Notifications</strong>}
                </h2>
                <ul className="flex flex-row gap-2">
                    <li>
                        <button
                            onClick={() => this.handleTabChange('all')}
                            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                        >
                            All
                        </button>
                    </li>
                    <li className="relative">
                        <button
                            onClick={() => this.handleTabChange('unread')}
                            className={`tab-button ${activeTab === 'unread' ? 'active' : ''}`}
                        >
                            Unread
                            <span className={`orange-circle ${activeTab === 'unread' ? 'opacity-100' : 'opacity-50'}`} />
                        </button>
                    </li>
                </ul>
                <br />
                <div className="notification-list px-2 ">
                    <ul>
                        {filteredNotifications.map(notification => (
                            <div className="flex flex-row h-[104px] mb-2 hover:bg-blue-100 items-center rounded-xl" key={notification.id}>
                                <div className="flex items-center bg-gray h-16">
                                    <img className="h-14 w-14 ml-4" src={notification.imageSrc} alt="" 
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
                                        <span className="font-bold">{notification.users}</span> <nbsp></nbsp>
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
                <div onClick={handleClick} className="flex flex-row font-bold bg-slaute-400 h-10 px-2 w-full gap-2 cursor-pointer hover:bg-slate-200 rounded-lg items-center">
                    View All
                    <img className="h-6 w-6" src="/assets/viewall.svg" />
                </div>
            </div>
        );
    }
}

export default NotificationPopup;
