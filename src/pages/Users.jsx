import { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import LoadingSpinner from '../shared/sharedComponents/uiElements/LoadingSpinner';

const USERS = [
  {
    id: 'u1',
    name: 'Pawel Zguda',
    image: 'https://images.pexels.com/photos/4095246/pexels-photo-4095246.jpeg',
    places: 3,
  },
  {
    id: 'u2',
    name: 'Tomasz Rydel',
    image: 'https://images.pexels.com/photos/4095246/pexels-photo-4095246.jpeg',
    places: 2,
  },
];

const Users = () => {
  const [error, setError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState(true);

  useEffect(() => {
    // here later adding function that fetches data
    const fetchUsers = () => {
      return setLoadedUsers(USERS);
    };

    fetchUsers();
  }, []);

  // create later here error modal in case error
  // update later UserList component

  return (
    <>
      {error && <p>Coś poszło nie tak!</p>}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && !error && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
