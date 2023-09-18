import { QueryClient } from '@tanstack/react-query';


export const queryClient = new QueryClient();


export const fetchRequest = async ({signal, term}) => {
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: signal,
        });
        const responseData = await response.json();
     
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
}