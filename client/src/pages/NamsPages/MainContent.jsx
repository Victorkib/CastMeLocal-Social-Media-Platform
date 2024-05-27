function MainContent() {
  return (
    <div className="main-content">
      <header className="App-header">
        <h2>Castmelocal</h2>
      </header>
      <div className="search-bar">
        <input type="text" placeholder="Explore" />
      </div>
      <div className="featured-community">
        <h2>Featured Community</h2>
        <div className="community-card">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*U8ax8xruWVzCULQ1_15mOA.jpeg"
            alt="Virtual Reality"
          />
          <div className="community-info">
            <h3>Virtual Reality</h3>
            <p>
              A community for VR and novices alike, regular and friendly chat
            </p>
          </div>
        </div>
        <div className="community-card">
          <img
            src="https://cryptovalleyjournal.com/wp-content/uploads/2022/01/CVJ.CH-Play-to-Earn-P2E-Gaming.jpg"
            alt="Game Play"
          />
          <div className="community-info">
            <h3>Game Play</h3>
            <p>Always a new challenge, great place to make new friends</p>
          </div>
        </div>
      </div>
      <div className="popular-right-now">
        <h2>Popular Right Now</h2>
        <div className="popular-card">
          <img
            src="https://t4.ftcdn.net/jpg/05/78/85/01/360_F_578850184_cpckwjxJRSc1NwJzY7suowU1Urt5A8qm.jpg"
            alt="3D Art"
          />
          <div className="popular-info">
            <h3>3D Art</h3>
            <p>A great place to discuss art</p>
          </div>
        </div>
        <div className="popular-card">
          <img
            src="https://nftclub.com/wp-content/uploads/2021/11/can-jpegs-be-nfts.jpg"
            alt="NFT"
          />
          <div className="popular-info">
            <h3>NFT</h3>
            <p>An NFT community so that everyone can share their NFTs</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
