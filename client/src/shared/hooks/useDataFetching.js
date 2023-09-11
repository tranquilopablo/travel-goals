import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
};

const useDataFetching = () => {
  return useQuery('data', fetchData);
};

export default useDataFetching;