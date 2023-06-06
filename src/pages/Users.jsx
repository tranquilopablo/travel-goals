import { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';
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
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState(false);

  useEffect(() => {
    // here later adding function that fetches data
    const fetchUsers = () => {
      return setLoadedUsers(USERS);
    };

    fetchUsers();
  }, []);

  // create later here error modal in case error
  // update later UserList component

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />

      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && !error && loadedUsers && (
        <UsersList onClick={setError} items={loadedUsers} />
      )}
    </>
  );
};

export default Users;
