import React from 'react';

function AdvertisementDashboard() {
  return (
    <div className="mt-96 max-w-[320px] rounded-2xl" style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px', textAlign: 'center'}}>
      {/* <h2>Sponsored Ad</h2>
      <p>Buy the best products at unbeatable prices!</p> */}
      <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
        <img src="assets/tm-50.png" alt="Advertisement" style={{ maxWidth: '100%', height: 'auto' }} />
      </a>
      <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
        <img className="mt-5" src="assets/mta-small-jomla.png" alt="Advertisement" style={{ maxWidth: '100%', height: 'auto' }} />
      </a>
    </div>
  );
}

export default AdvertisementDashboard;
