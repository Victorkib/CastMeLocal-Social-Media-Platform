import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../features/users/userSlice';

const Test = () => {
  const users = useSelector((store) => store.usersData.users);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:6500/castmelocal/api/users/getallusers'
        );
        console.log(response);
        const json = await response.json();
        console.log(json);
        console.log(...json);
        if (!response.ok) {
          setError(json.error);
        } else {
          dispatch(setUsers(json));
        }
      } catch (error) {
        console.log('An error occurred:', error);
        setError('An error occurred while fetching data.');
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="test">
      <p>Testing</p>
      {users &&
        users.map((user) => (
          <div className="users" key={user._id}>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        ))}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Test;
