// src/components/Profile.js

const Profile = () => {
  const user = {
    username: 'User1',
    age: 25,
    location: 'Location1',
    gender: 'Female',
    ethnicity: 'Ethnicity1',
    meetupLocation: 'Location1',
    hourlyRate: '$100/hr',
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Age: {user.age}</p>
      <p>Location: {user.location}</p>
      <p>Gender: {user.gender}</p>
      <p>Ethnicity: {user.ethnicity}</p>
      <p>Meetup Location: {user.meetupLocation}</p>
      <p>Hourly Rate: {user.hourlyRate}</p>
    </div>
  );
};

export default Profile;
