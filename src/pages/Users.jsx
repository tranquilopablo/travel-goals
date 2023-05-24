import { useEffect, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    // here later adding function that fetches data
    const fetchUsers = () => {
      return setLoadedUsers(USERS);
    };

    fetchUsers();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="center">
          <p>ladowanie danych</p>
        </div>
      )}
      {!isLoading && loadedUsers && <p>zaladowano uzytkownikow</p>}
    </>
  );
};

export default Users;
