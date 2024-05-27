import '../App.css';

function Test() {
  return (
    <div className="app">
      <div className="header">
        <div className="header-left">Explore</div>
        <div className="header-right">Explore</div>
      </div>
      <div className="content">
        <div className="sidebar">
          <div className="sidebar-item">Home</div>
          <div className="sidebar-item">Messages</div>
          <div className="sidebar-item">Student Hub</div>
        </div>
        <div className="main">
          <div className="profile">
            <div className="profile-image">{/* Profile image here */}</div>
            <div className="profile-info">
              <div className="profile-name">Afia Khan</div>
              <div className="profile-handle">@afia921</div>
            </div>
          </div>
          <div className="feed">
            <div className="feed-section">
              <div className="feed-section-header">Education</div>
              <div className="feed-section-content">Featured Community</div>
              <div className="feed-section-link">See all</div>
            </div>
            <div className="feed-section">
              <div className="feed-section-header">Music</div>
              <div className="feed-section-content">
                <div className="user-name">DS</div>
                <div className="user-info">Anne Couture</div>
              </div>
              <div className="user-name">Minam Sole</div>
              <div className="user-info">20 mag</div>
            </div>
            <div className="feed-section">
              <div className="feed-section-header">Virtual Reality</div>
              <div className="feed-section-content">
                <div className="feed-section-text">
                  A community for VR and novices alike, regular and friendly
                  chat
                </div>
                <div className="feed-section-text">
                  Always a new challenge, great place to make new friends
                </div>
                <div className="user-name">Marie Laval</div>
              </div>
              <div className="feed-section-stats">
                <div className="feed-section-stat">5,678 Online</div>
                <div className="feed-section-stat">345,678 Members</div>
              </div>
            </div>
            <div className="feed-section">
              <div className="feed-section-header">Popular Right Now</div>
              <div className="feed-section-link">See all</div>
            </div>
            <div className="feed-section">
              <div className="feed-section-header">Recent Activity</div>
              <div className="feed-section-link">See all</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
