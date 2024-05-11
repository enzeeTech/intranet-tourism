import React from 'react';


class NotificationPopup extends React.Component {
  

  
  constructor(props) {

  
    super(props);
    this.state = {
        
      activeTab: 'all', // Default active tab is 'all'
      notifications: [
        {id: 1,
          imageSrc: "/assets/smile.jpg",
          miniIcon: "/assets/birthday.svg",
          users: "ACAPAN",
          orangeball: "/assets/orangeball.png",
          message: "Your request to change the Organisational chart picture was 1 ",

          // linkText: "Check it out!",
          timeAgo: "10 mins ago",
          notiView: 0, read: true },
        {id: 2,
          imageSrc: "/assets/smile.jpg",
          miniIcon: "/assets/comment.svg",
          users: "ACAPAN",

          orangeball: "/assets/orangeball.png",
          message: "Your request to change the Organisational chart picture was 2 ",
          // linkText: "Check it out!",
          timeAgo: "10 mins ago",
          notiView: 0, read: false },
        {id: 3,
          imageSrc: "/assets/smile.jpg",
          miniIcon: "/assets/birthday.svg",
          users: "ACAPAN",

          orangeball: "/assets/orangeball.png",
          message: "Your request to change the Organisational chart picture was 3 ",
          // linkText: "Check it out!",
          timeAgo: "10 mins ago",
          notiView: 0, read: true },
        {id: 4,
          imageSrc: "/assets/smile.jpg",
          miniIcon: "/assets/comment.svg",
          orangeball: "/assets/orangeball.png",
          users: "Nyet",

          message: "Your request to change the Organisational chart picture was 4 ",
          // linkText: "Check it out!",
          timeAgo: "10 mins ago",
          notiView: 0, read: false },
        {id: 5,
          imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
          miniIcon: "/assets/birthday.svg",
          orangeball: "/assets/orangeball.png",
          users: "Nyet",

          message: "Your request to change the Organisational chart picture was 5 ",
          // linkText: "Check it out!",
          timeAgo: "10 mins ago",
          notiView: 0, read: true },
        {id: 6,
          imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
          miniIcon: "/assets/comment.svg",
          orangeball: "/assets/orangeball.png",
          users: "Nyet",

          message: "Your request to change the Organisational chart picture was 6 ",
          // linkText: "Check it out!",
          timeAgo: "10 mins ago",
          notiView: 0, read: false },
        {id: 7,
          imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b6f6bf1eeb125463a1c05e53bf549eaa33b1ed997272606c9c73c94482930ce?apiKey=89326418e2a6429c92d097cb006bb6c8&",
          miniIcon: "http://127.0.0.1:5173/public/assets/birthday.svg",
          users: "Nyet",
          message: "Your request to change the Organisational chart picture was 7 ",
          orangeball: "http://127.0.0.1:5173/public/assets/orangeball.png",

          // linkText: "Check it out!",
          timeAgo: "10 mins ago",
          notiView: 0, read: false },
      ]
    };
  }
  
  
  
  render() {
    const { activeTab, notifications } = this.state;

    // Filter notifications based on the active tab
    const filteredNotifications =
      activeTab === 'all'
        ? notifications.slice(0, 4) // Only display the first 5 notifications for 'all' tab
        : notifications.filter(notification => !notification.read);

        
        return (
          <div className="notification-navbar ">

<h2  style={{marginLeft:"10px", marginTop:"10px", color:"#222222", fontSize:"24px"}}>
  
{activeTab === 'all' ? <strong>All Notifications</strong> : <strong>Unread Notifications</strong>}
  </h2>

            <ul className ="flex flex-row gap-2">
              
          <li className={activeTab === 'all' ? 'active' : ''}>
            <button
                onClick={() => this.handleTabChange('all')}
                style={{
                    marginLeft: "10px",
                    borderBottom: activeTab === 'all' ? '2px solid black' : '2px solid transparent', // Change color based on activeTab
                    color: activeTab === 'all' ? 'black' : 'gray', // Change text color based on activeTab
                    background: 'none', // Remove background color
                    border: 'none', // Remove border
                    cursor: 'pointer', // Add cursor pointer
                    padding: '0', // Remove padding
                    textDecoration: 'none' // Remove underline
                }}
            >
                All
            </button>
        </li>
        {/* <a href="#" className="underline relative">Unread
            <span className="absolute h-2 w-2 bg-blue-500 rounded-full top-1/2 transform -translate-y-1/2 ml-2"></span>
            </a> */}
        <li className = {activeTab === 'unread' ? 'active' : ''}>
            <button className="relative"
                onClick={() => this.handleTabChange('unread')}
                style={{
                    marginLeft: "10px",
                    borderBottom: activeTab === 'unread' ? '2px solid black' : '2px solid transparent', // Change color based on activeTab
                    color: activeTab === 'unread' ? 'black' : 'gray', // Change text color based on activeTab
                    background: 'none', // Remove background color
                    border: 'none', // Remove border
                    cursor: 'pointer', // Add cursor pointer
                    padding: '0', // Remove padding
                    textDecoration: 'none' // Remove underline
                }}
            >
                Unread 
            </button>
        </li>

        {/* <button onClick={() => this.handleTabChange('unread')} className={activeTab === 'unread' ? 'text-red' : 'text-black'}>
        Unread
    </button> */}

            </ul>
            <br></br>
            <div className="notification-list mb-4"  >
              <ul>
                {filteredNotifications.map(notification => (
                <div className="flex flex-row gap-2 mb-4 hover:bg-blue-100 items-center"  key={notification.id}>

                  <div className="flex items-center bg-gray h-16">
                    <img className="h-14 w-14  ml-2 " src={notification.imageSrc} alt="" 
                    style={{
                    
                      height:"80px",
                      width:"120px",
                      borderRadius:"100%"	
                    }} />
                    <img className="absolute h-5 w-5 left-16 mt-14 " src={notification.miniIcon} alt="" /> 
                  </div>

                  <div className='flex flex-col w-100 h-50 ml-4'>
                    <div className="block px-2 py-1 text-sm font-bold">{notification.users}</div>
                    <div className="block px-2 py-1 text-sm">{notification.message}</div>
                    <div className="block px-2 py-1 text-sm">{notification.timeAgo}</div>
                </div>


                    <div>
                        {!notification.read && (
                            <img
                                src="http://127.0.0.1:5173/public/assets/orangeball.png"
                                alt="Unread"
                                style={{ width: '10px', height: '10px', marginRight: '30px' }}
                            />
                        )}
                    </div>


                  </div>
                ))}
              </ul>
            </div>
          </div>
        );  }

  handleTabChange = tab => {
    this.setState({ activeTab: tab });
  };
}

export default NotificationPopup;