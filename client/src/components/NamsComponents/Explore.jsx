// src/components/Explore.js
import { useState } from 'react';

const Explore = () => {
  const [media, setMedia] = useState(null);

  const handleUpload = (event) => {
    setMedia(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <h2>Explore</h2>
      <input type="file" accept="image/*,video/*" onChange={handleUpload} />
      {media && (
        <div className="explore-card">
          <img src={media} alt="Uploaded media" style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default Explore;
