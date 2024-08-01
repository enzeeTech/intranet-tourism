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
        <div className="flex flex-row gap-2 items-center">
            <button onClick={handleIcon1Click}>
                <img src={icon1} alt="Edit Icon" className="aspect-square w-[30px]" />
            </button>
            {icon2 && (
                <img
                    src={icon2}
                    alt="QR Code Icon"
                    className="aspect-square w-[30px] h-[30px] cursor-pointer"
                    onClick={handleIcon2Click}
                />
            )}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={closePopup}>
                    <div className="bg-white p-2 rounded-3xl shadow-custom max-w-md popup" onClick={(e) => e.stopPropagation()}>
                        <img
                            src="assets/qrAcap.jpg"
                            alt="QR Code"
                            className="mx-auto mx-4"
                        />
                        <hr className="mb-4 w-full border-gray-300" />
                        <div className="flex justify-between -mt-1 mx-20 max-md:mx-12 relative">
                            <button onClick={handleDownload} className="text-white py-2">
                                <img src="assets/DownloadIcon.png" alt="Download Icon" className="w-6 h-6 shrink-0" />
                            </button>
                            {/* <hr className="absolute top-0 right-52 h-full border-l border-red-300" /> */}
                            <button onClick={handleCopyLink} className="text-white py-2">
                                <img src="assets/CopyLinkIcon.png" alt="Copy Link Icon" className="w-6 h-6 shrink-0" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileIcons
