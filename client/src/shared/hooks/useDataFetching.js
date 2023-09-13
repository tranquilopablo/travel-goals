import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const API_URL = 'your_api_endpoint_here';

export function useDataApi() {
  const queryClient = useQueryClient();

  // Fetch data
  const { data, isLoading, isError, error } = useQuery('data', async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network error');
    }
    return response.json();
  });

  // Create a new data item
  const createData = useMutation(async (newData) => {
    const formData = new FormData();
    formData.append('picture', newData.picture); // Assuming 'picture' is the key for the picture data
    // Append other form fields as needed
    formData.append('field1', newData.field1);
    formData.append('field2', newData.field2);

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network error');
    }

    // Invalidate the cache to refresh the data
    queryClient.invalidateQueries('data');
  });

  // Update an existing data item
  const updateData = useMutation(async (updatedData) => {
    const formData = new FormData();
    formData.append('picture', updatedData.picture); // Assuming 'picture' is the key for the picture data
    // Append other form fields as needed
    formData.append('field1', updatedData.field1);
    formData.append('field2', updatedData.field2);

    const response = await fetch(`${API_URL}/${updatedData.id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network error');
    }

    // Invalidate the cache to refresh the data
    queryClient.invalidateQueries('data');
  });

  // Delete a data item
  const deleteData = useMutation(async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network error');
    }

    // Invalidate the cache to refresh the data
    queryClient.invalidateQueries('data');
  });

  return {
    data,
    isLoading,
    isError,
    error,
    createData,
    updateData,
    deleteData,
  };
}


////////////////////////////////////////////////////////////
// import { useCallback, useEffect, useRef, useState } from 'react';

// export const useHttpClient = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();
//   const activeHttpRequests = useRef([]);

//   const sendRequest = useCallback(
//     async (url, method = 'GET', body = null, headers = {}) => {
//       setIsLoading(true);
//       const httpAbortCtrl = new AbortController();
//       activeHttpRequests.current.push(httpAbortCtrl);
//       try {
//         const response = await fetch(url, {
//           method,
//           body,
//           headers,
//           signal: httpAbortCtrl.signal,
//         });
//         const responseData = await response.json();
//         activeHttpRequests.current = activeHttpRequests.current.filter(
//           (reqCtrl) => reqCtrl !== httpAbortCtrl
//         );
//         if (!response.ok) {
//           throw new Error(responseData.message);
//         }
//         setIsLoading(false);
//         return responseData;
//       } catch (err) {
//         setError(err.message);
//         setIsLoading(false);
//         throw err;
//       }
//     },
//     []
//   );
//   const clearError = () => {
//     setError(null);
//   };

//   useEffect(() => {
//     return () => {
//       activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
//     };
//   }, []);

//   return { isLoading, error, sendRequest, clearError };
// };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpClient = () => {
  const queryClient = useQueryClient();


  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  // const activeHttpRequests = useRef([]);


  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
}