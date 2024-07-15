import React, { useState, useEffect, useRef } from 'react';
import Popup from './CreateStoryPopup';
import CreateImageStory from './CreateImageStory';
import { usePage } from '@inertiajs/react';
import StoryViewer from './StoryViewer';
import './styles.css';

const StoryNew = ({ userId }) => {
    const [showStoryViewer, setShowStoryViewer] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [avatars, setAvatars] = useState([
        {
            src: "assets/user4.jpeg",
            alt: "Avatar of Thomas",
            name: "Musa",
            stories: []
        },
        {
            src: "assets/women.avif",
            alt: "Avatar of Aisha",
            name: "Aisha",
            stories: [
                {
                    url: 'assets/car2.mp4',
                    type: 'video',
                    duration: 10000
                },
                {
                    url: 'assets/lambo2.jpeg',
                    caption: 'Story 2'
                },
            ]
        },
    ]);

    const { props } = usePage();
    const { id } = props; // Access the user ID from props
    const [userData, setUserData] = useState({});

    const containerRef = useRef(null);

    useEffect(() => {
        console.log("Fetching user data...");
        fetchUserData(id);
    }, [id]);

    const fetchUserData = (id) => {
        fetch(`/api/crud/users/${id}?with[]=profile&with[]=employmentPost.department&with[]=employmentPost.businessPost`, {
            method: "GET",
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(({ data }) => {
            setUserData({
                ...data,
                profileImage: data.profile && data.profile.image ? data.profile.image : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${data.name}&rounded=true`
            });
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    };

    useEffect(() => {
        // Add a "viewed" flag to each user
        setAvatars(avatars.map(avatar => ({
            ...avatar,
            viewed: false
        })));
    }, []);

    useEffect(() => {
        fetch(`/api/posts/posts`, {
            method: "GET",
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(({ data }) => {
            console.log("Fetched stories data:", data.data);
            // Assuming data is an array of stories
            const formattedStories = data.data.map(story => ({
                url: story.attachments.length > 0 ? `${story.attachments[0].path}` : '', 
                type: story.attachments.length > 0 ? (story.attachments[0].mime_type.startsWith('image') ? 'image' : 'video') : 'image',
                duration: story.attachments.length > 0 && story.attachments[0].duration ? story.attachments[0].duration : null,
                timestamp: Date.now() // Add timestamp for filtering later
            }));
            setAvatars(prevAvatars => {
                const updatedAvatars = [...prevAvatars];
                updatedAvatars[0].stories = formattedStories.filter(story => story.url !== ''); // Filter out empty URLs
                return updatedAvatars;
            });
        })
        .catch((error) => {
            console.error("Error fetching stories:", error);
        });
    }, []);

    const handleAvatarClick = (avatar) => {
        if (avatar === loggedInUserAvatar) {
            if (avatar.stories.length === 0) {
                fileInputRef.current.click();
            } else {
                setSelectedStory(avatar.stories);
                setSelectedUser(avatar);
                setShowStoryViewer(true);
            }
        } else {
            setSelectedStory(avatar.stories);
            setSelectedUser(avatar);
            setShowStoryViewer(true);
        }
    };

    const handlePlusButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setIsPopupOpen(true);
        }
    };

    const handleCloseViewer = () => {
        setShowStoryViewer(false);
        setSelectedStory(null);
        setSelectedUser(null);
    };

    const handlePostStory = (newStory) => {
        setAvatars(prevAvatars => {
            const updatedAvatars = [...prevAvatars];
            updatedAvatars[0].stories.push(newStory);
            return updatedAvatars;
        });
        setIsPopupOpen(false);
    };

    const markUserAsViewed = (user) => {
        setAvatars(prevAvatars => {
            const updatedAvatars = prevAvatars.map(avatar => {
                if (avatar === user) {
                    return { ...avatar, viewed: true };
                }
                return avatar;
            });
            return updatedAvatars;
        });
    };

    const sortedAvatars = [
        avatars[0],
        ...avatars.slice(1).sort((a, b) => a.viewed - b.viewed) // Sort other avatars excluding the first one
    ];

    const loggedInUserAvatar = {
        src: userData.profileImage || `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${userData.name}&rounded=true`,
        alt: "Avatar of logged in user",
        name: userData.name || "User Name",
        stories: avatars[0].stories
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-30px', marginLeft: '-20px', width: '610px', }}>
            <div style={{ display: 'inline-block', margin: '10px', position: 'relative', marginRight: '30px', flexShrink: 0 }}>
                <button style={{ border: 'none', background: 'none', padding: '0', position: 'relative' }} onClick={() => handleAvatarClick(loggedInUserAvatar)} >
                    <div style={{
                        borderRadius: '50%',
                        width: '104px',
                        height: '104px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: loggedInUserAvatar.stories.length > 0 ? 'linear-gradient(45deg, #FCAF45, #FF3559, #FF9C33, #FF3559)' : 'transparent',
                        padding: '2px'
                    }}>
                        <img
                            src={loggedInUserAvatar.src}
                            alt={loggedInUserAvatar.alt}
                            style={{
                                borderRadius: '50%',
                                width: '100px',
                                height: '100px',
                                border: '3px solid white'
                            }}
                        />
                    </div>
                </button>
                <button style={{ border: 'none', background: 'none', padding: '0', position: 'relative' }} onClick={handlePlusButtonClick}>
                    <span style={{
                        position: 'absolute',
                        bottom: '0px',
                        right: '5px',
                        width: '22px',
                        height: '22px',
                        background: 'blue',
                        color: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        border: '2px solid white',
                    }}>+</span>
                </button>
                <input
                    type="file"
                    accept="image/*, video/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
                 <div style={{ textAlign: 'center', marginTop: '-5px', fontSize: '12px', color: '#888' }}>
                     {loggedInUserAvatar.stories.length} {loggedInUserAvatar.stories.length === 1 ? 'story' : 'stories'}
                 </div>
                 <div style={{ textAlign: 'center', marginTop: '-5px' }}>Your Story</div>
            </div>
             <div ref={containerRef} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                 {sortedAvatars.slice(1).map((avatar, index) => (
                    <div key={index} style={{ display: 'inline-block', margin: '10px', position: 'relative', marginRight: '10px' }}>
                        <button style={{ border: 'none', background: 'none', padding: '0', position: 'relative' }}>
                            <div style={{
                                borderRadius: '50%',
                                background: avatar.stories.length > 0 ? 'linear-gradient(45deg, #FCAF45, #FF3559, #FF9C33, #FF3559)' : 'transparent',
                                padding: '2px',
                                filter: avatar.viewed ? 'grayscale(100%)' : 'none' // Apply grayscale filter if the stories have been viewed
                            }}>
                                <img
                                    src={avatar.src}
                                    alt={avatar.alt}
                                    style={{
                                        borderRadius: '50%',
                                        width: '80px',
                                        height: '80px',
                                        border: '3px solid white',
                                        objectFit: 'cover',
                                    }}
                                    onClick={() => handleAvatarClick(avatar)}
                                />
                            </div>
                        </button>
                        <div style={{ textAlign: 'center', marginTop: '-5px', fontSize: '12px', color: '#888' }}>
                            {avatar.stories.length} {avatar.stories.length === 1 ? 'story' : 'stories'}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '-5px' }}>{avatar.name}</div>
                    </div>
                ))}
            </div>
            {showStoryViewer && selectedStory && (
                <StoryViewer stories={selectedStory} onClose={handleCloseViewer} user={selectedUser} onViewed={markUserAsViewed} />
            )}
            {isPopupOpen && (
                <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                    <CreateImageStory userId={userId} onPostStory={handlePostStory} file={selectedFile} />
                </Popup>
            )}
        </div>
    );
};

export default StoryNew;