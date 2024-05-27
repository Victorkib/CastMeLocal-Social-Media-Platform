// src/components/NotFound.js

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <div className="not-found-animation">
        <div className="not-found-circle"></div>
        <div className="not-found-circle not-found-circle-secondary"></div>
      </div>
      <a href="/" className="home-link">
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
