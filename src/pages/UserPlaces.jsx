import { useEffect, useState } from 'react';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';
import LoadingSpinner from '../shared/sharedComponents/uiElements/LoadingSpinner';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Kościół Mariacki',
    description: 'Jedna z najsłyniejszych polskich kaplic!',
    imageUrl:
      'https://t3.gstatic.com/images?q=tbn:ANd9GcTsYfPmGJlhdYYoimizj9KjzYltxPMxmA3fOq7VYtpCUFdwFR8W',
    address: 'plac Mariacki 5, 31-042 Kraków, Polska',
    location: {
      lat: 50.0616411,
      lng: 19.9368154,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Zamek w Malborku',
    description: 'XIV-wieczny zamek krzyżacki',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipPuhFVh2XVC7812NswdMu8pog2GLGSvfaQVtsM=s544-k-no',
    address: 'Starościńska 1, 82-200 Malbork',
    location: {
      lat: 54.0397274,
      lng: 19.0280127,
    },
    creator: 'u2',
  },
];

export default function UserPlaces() {
  const [error, setError] = useState(false);
  const [loadedPlaces, setLoadedPlaces] = useState();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setLoadedPlaces(DUMMY_PLACES);
  }, []);

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
      <div>UserPlacesss</div>
    </>
  );
}
