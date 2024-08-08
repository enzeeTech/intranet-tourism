import React, { useState, useEffect } from 'react';
import Stories from 'react-insta-stories';
import DeleteIcon from '../../../../public/assets/DeleteRedButton.svg';
import { useCsrf } from "@/composables";

const StoryViewer = ({ stories, onClose, user, onViewed }) => {

    console.log("USER", user);

    const csrfToken = useCsrf();

    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        setIsPaused(showDeletePopup);
    }, [showDeletePopup]);

    const handleStoryEnd = () => {
        if (currentStoryIndex === stories.length - 1) {
            onViewed(user);
            onClose();
        } else {
            setCurrentStoryIndex(currentStoryIndex + 1);
        }
    };

    const handlePrevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
        }
    };

    const handleNextStory = () => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
        }
    };

    const handleAllStoriesEnd = () => {
        onViewed(user);
        onClose();
    };


    const API_URL = "/api/posts/posts";

    const handleDelete = async () => {
        const { postId } = stories[currentStoryIndex];
        try {
            const response = await fetch(`${API_URL}/${postId}`, {
                method: 'DELETE',
                headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
            });

            if (response.ok) {
                console.log(`Post with ID ${postId} deleted successfully.`);
                window.location.reload();
            } else {
                console.error(`Failed to delete post with ID ${postId}.`);
            }
        } catch (error) {
            console.error(`Error deleting post with ID ${postId}:`, error);
        }
        setShowDeletePopup(false);
    };

    const handleClosePopup = () => {
        setShowDeletePopup(false);
    };

    
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9998,
                }}
            ></div>
            <div
                style={{
                    position: 'relative',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
                onClick={(e) => {
                    if (!showDeletePopup) {
                        if (e.clientX < window.innerWidth / 2) {
                            handlePrevStory();
                        } else {
                            handleNextStory();
                        }
                    }
                }}
            >
                <div style={{
                    position: 'relative',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '12px',
                    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)',
                    maxWidth: '400px',
                    maxHeight: '700px',
                    overflow: 'hidden',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flex: '1', marginBottom: '5px' }}>
                            <img
                                // src={`/storage/${user.src}`}
                                src={user.src ? `${user.src}` : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.name}`}
                                alt={user.alt}
                                style={{ width: '36px', height: '36px', borderRadius: '50%', marginRight: '8px', objectFit: 'cover' }}
                            />
                            <div style={{ fontSize: '14px', marginTop: '5px', marginLeft: '5px' }}>{user.fullName ? user.fullName : "Your Story"}</div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowDeletePopup(true)}
                            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                        >
                            <img
                                src={DeleteIcon}
                                alt="Delete icon"
                                style={{ width: '30px', height: '30px', marginTop: '-10px' }}
                            />
                        </button>
                        {/* <button
                            style={{
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={onClose}
                        >
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff?apiKey=285d536833cc4168a8fbec258311d77b&"
                                alt="Close icon"
                                style={{ width: '28px', height: '28px', marginTop: '-10px', marginLeft: '10px' }}
                            />
                        </button> */}
                        <button onClick={onClose} className="modal-close-button pt-3 px-2">
                            <img src="/assets/cancel.svg" alt="Close icon" className="w-6 h-6" />
                        </button>
                    </div>
                    <Stories
                        stories={stories.map(story => ({
                            ...story,
                            url: `/storage/${story.url}`,
                            text: story.text
                        }))}
                        defaultInterval={7 * 1000}
                        width={360}
                        height={596}
                        onStoryEnd={handleStoryEnd}
                        currentIndex={currentStoryIndex}
                        onAllStoriesEnd={handleAllStoriesEnd}
                        isPaused={isPaused}
                    />
                    {stories[currentStoryIndex]?.text && (
                        <div style={{
                            position: 'absolute',
                            bottom: '2%',
                            right: '3.3%',
                            width: '93.3%',
                            padding: '10px',
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            textAlign: 'center',
                            zIndex: 10000
                        }}>
                            <p>{stories[currentStoryIndex].text}</p>
                        </div>
                    )}
                </div>
            </div>
            {showDeletePopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)',
                        zIndex: 10000,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '400px',
                    }}
                >
                    <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: 'larger' }}>
                        <h2>Delete Story?</h2>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <button
                            onClick={handleDelete}
                            style={{
                                backgroundColor: 'white',
                                color: '#333',
                                border: '1px solid #ccc',
                                borderRadius: '25px',
                                width: '80px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                marginRight: '16px',
                            }}
                        >
                            Yes
                        </button>
                        <button
                            onClick={handleClosePopup}
                            style={{
                                backgroundColor: '#E53935',
                                color: 'white',
                                border: 'none',
                                borderRadius: '25px',
                                width: '80px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                marginRight: '10px',
                            }}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoryViewer;
