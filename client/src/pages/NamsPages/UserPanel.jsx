import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

function UserPanel() {
  const [avatar, setAvatar] = useState(
    'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
  );

  const handleAvatarChange = (event) => {
    const newAvatar = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(newAvatar);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div>You have logged out. Please refresh the page to log in again.</div>
    );
  }
  return (
    <div className="user-panel">
      <div className="user-info">
        <label htmlFor="avatar-input">
          <img src={avatar} alt="User Avatar" className="user-avatar" />
        </label>
        <input
          id="avatar-input"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />

        <div className="user-name">
          <h3>Afia Khan </h3>
          <p>@afia921</p>
          <FiLogOut onClick={handleLogout} className="logout-icon" />
        </div>
      </div>
      <div className="new-members">
        <h2>New Members</h2>
        <div className="member-item">
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="Anne Couture"
          />
          <p>Anne Couture</p>
        </div>
        <div className="member-item">
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="Miriam Soleil"
          />
          <p>Miriam Soleil</p>
        </div>
        <div className="member-item">
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="Marie Laval"
          />
          <p>Marie Laval</p>
        </div>
        <div className="member-item">
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="Mark Morain"
          />
          <p>Mark Morain</p>
        </div>
      </div>
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-item">
          <p>Hola Spine invited you to a channel</p>
        </div>
        <div className="activity-item">
          <p>Eva Solain invited you to a chat</p>
        </div>
        <div className="activity-item">
          <p>Pierre Ford started video</p>
        </div>
      </div>
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-item">
          <p>Hola Spine invited you to a channel</p>
        </div>
        <div className="activity-item">
          <p>Eva Solain invited you to a chat</p>
        </div>
        <div className="activity-item">
          <p>Pierre Ford started video</p>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
