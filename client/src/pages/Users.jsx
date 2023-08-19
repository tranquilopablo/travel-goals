import { useCallback, useEffect, useState } from 'react';
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

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setLoadedUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  console.log('gggg');

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   // here later adding function that fetches data
  //   const fetchUsers = async() => {
  //       const dataUsers = await ()=>

  //     return setLoadedUsers(USERS);
  //   };

  //   fetchUsers();
  // }, []);

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
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
