import React, { useState } from 'react';
import Stories from 'react-insta-stories';

const StoryViewer = ({ stories, onClose, user, onViewed }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    const handleStoryEnd = () => {
        if (currentStoryIndex === stories.length - 1) {
            onViewed(user); // Notify parent component that stories have been viewed
            onClose(); // Close the story viewer only when all stories are played
        } else {
            setCurrentStoryIndex(currentStoryIndex + 1); // Play the next story
        }
    };

    const handlePrevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
        }
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
            pointerEvents: 'none',
        }}>
            {/* Overlay */}
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
            {/* Story viewer */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 9999,
                    pointerEvents: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
                onClick={(e) => {
                    if (e.clientX < window.innerWidth / 2) {
                        handlePrevStory();
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
                    {/* Close button */}
                    <button
                        style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0',
                        }}
                        onClick={onClose}
                    >
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff?apiKey=285d536833cc4168a8fbec258311d77b&"
                            alt="Close icon"
                            style={{ width: '24px', height: '24px' }}
                        />
                    </button>
                    {/* User info */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <img src={user.src} alt={user.alt} style={{ width: '36px', height: '36px', borderRadius: '50%', marginRight: '8px', objectFit: 'cover' }} />
                        <div style={{ fontSize: '14px' }}>{user.name}</div>
                    </div>
                    {/* Stories */}
                    <Stories
                        stories={stories.map(story => ({
                            ...story,
                            // url: `${story.url}` // View dummy stories
                            url: `/storage/${story.url}` // View real stories
                        }))}
                        defaultInterval={1500}
                        width={360}
                        height={596}
                        onStoryEnd={handleStoryEnd}
                        currentIndex={currentStoryIndex}
                    />
                </div>
            </div>
        </div>
    );
};

export default StoryViewer;
