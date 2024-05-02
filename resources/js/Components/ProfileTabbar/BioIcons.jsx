import React from 'react';

function ProfileIcons({ icon1, icon2 }) {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [qrCodeLink, setQrCodeLink] = React.useState('');
  
    const openPopup = () => {
      setIsPopupOpen(true);
      console.log("bukak");
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
      console.log("tutup");
    };
  
    React.useEffect(() => {
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
      e.preventDefault(); // Prevent the default behavior of the anchor element
      const qrImage = 'assets/hehe.png'; // Path to the QR image
      const link = document.createElement('a');
      link.href = qrImage;
      link.download = 'qr-image.png'; // Name of the downloaded file
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
    
  
    const handleIconClick = (e) => {
      e.stopPropagation();
      openPopup();
    };
    
    return (
      <div className="flex flex-col">
        <img src={icon1} alt="" className="aspect-square w-[30px]" />
        <img
          src={icon2}
          alt=""
          className="self-center mt-36 aspect-square w-[38px] max-md:mt-10 cursor-pointer"
          onClick={handleIconClick}
        />
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={closePopup}>
            <div className="bg-white p-2 rounded-3xl shadow-lg max-w-md" onClick={(e) => e.stopPropagation()}>
              <img
                src="assets/hehe.png"
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