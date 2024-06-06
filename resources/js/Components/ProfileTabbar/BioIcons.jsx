import React, { useState, useEffect } from 'react';

function ProfileIcons({ icon1, icon2, onEdit, onFormDataChange, onPhotoChange, onSave, onCancel }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleIcon2Click = (e) => {
        e.stopPropagation();
        setIsPopupOpen(true);
    };

    const handleIcon1Click = (e) => {
      e.stopPropagation();
      onEdit();
  };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".popup")) {
                closePopup();
            }
        };

        if (isPopupOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isPopupOpen]);

    const handleDownload = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const qrImage = 'assets/hehe.png';
        const link = document.createElement('a');
        link.href = qrImage;
        link.download = 'qr-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCopyLink = () => {
        const qrCodeLink = "https://shattereddisk.github.io/rickroll/rickroll.mp4";
        navigator.clipboard.writeText(qrCodeLink)
            .then(() => {
                console.log("QR code link copied to clipboard:", qrCodeLink);
                window.alert("QR code link copied to clipboard!");
            })
            .catch((error) => {
                console.error("Failed to copy QR code link:", error);
            });
    };

    return (
        <div className="flex flex-col">
            <button onClick={handleIcon1Click}>
                <img src={icon1} alt="" className="aspect-square w-[30px]" />
            </button>
            <img
                src={icon2}
                alt=""
                className="self-center mt-auto aspect-square w-[30px] max-md:mt-10 cursor-pointer"
                onClick={handleIcon2Click}
            />
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={closePopup}>
                    <div className="bg-white p-2 rounded-3xl shadow-custom max-w-md popup" onClick={(e) => e.stopPropagation()}>
                        <img
                            src="assets/qrAcap.jpg"
                            alt="QR Code"
                            className="mx-auto mt-4"
                        />
                        <div className="flex justify-between -mt-1 relative">
                            <hr className="absolute -top-3 w-full border-t border-gray-300" />
                            <button onClick={handleDownload} className="text-white px-24 py-2 rounded-md">
                                <img src="assets/DownloadIcon.png" alt="Download Icon" className="" />
                            </button>
                            <hr className="absolute top-0 right-52 h-full border-l border-gray-300" />
                            <button onClick={handleCopyLink} className="text-white px-24 py-2 rounded-md">
                                <img src="assets/CopyLinkIcon.png" alt="Copy Link Icon" className="" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileIcons;
