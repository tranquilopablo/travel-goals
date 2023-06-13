import { useState } from 'react';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';

export default function UserPlaces() {
  const [error, setError] = useState(false);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <div>UserPlacesss</div>
    </>
  );
}
