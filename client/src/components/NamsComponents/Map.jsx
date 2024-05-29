import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import NavBar from './Navbar';
import axios from 'axios';
import { apiUrl } from '../../utils/api';
import { Link } from 'react-router-dom';

// Custom Icon
const userIcon = new L.Icon({
  iconUrl:
    'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png',
  iconSize: [25, 25],
});

const Map = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/mapUsers/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <NavBar />
      <MapContainer
        center={[51.505, -0.09]}
        zoom={3}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        {users.map(
          (user) =>
            user.location && (
              <Marker
                key={user._id}
                position={user.location.coordinates}
                icon={userIcon}
              >
                <Popup>
                  <div>
                    <img
                      src={user.profilePic}
                      alt={user.firstName}
                      style={{ width: '50px', borderRadius: '50%' }}
                    />
                    <p>{user.firstName + user.lastName}</p>
                    <h6>
                      <Link to={'/chat'}>Chat</Link>
                    </h6>
                  </div>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
