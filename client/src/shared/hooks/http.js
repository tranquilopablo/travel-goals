import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();


export const useHttpClient   = async ({ signal, term }) => {

  const sendRequest  = async (url, method = 'GET', body = null, headers = {}) => {


    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal,
      });
      const responseData = await response.json();
    
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      return responseData;
    } catch (err) {
      throw new Error(err.message);

    }
  };
  
  return { isLoading, error, sendRequest, clearError };


}
     

  // try {
  //   const response = await fetch(url, {
  //     method,
  //     body,
  //     headers,
  //     signal: signal,
  //   });
  //   const responseData = await response.json();

  //   if (!response.ok) {
  //     throw new Error(responseData.message);
  //   }
  //   return responseData;
  // } catch (err) {
  //   setError(err.message);
  //   setIsLoading(false);
  //   throw err;
  // }






export const loginRequest = async (values) => {
  try {
    console.log(values);

    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    console.log('powinnismy isc dalej2');
  } catch (err) {
    throw new Error(err.message);

  }
};

export const registerRequest = async (formData) => {
  console.log(formData);
  try {
    const response = await fetch('http://localhost:5000/api/users/signup', {
      method: 'POST',
   
      body: formData,
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
  } catch (err) {

    console.log('Error sending data:', error);
  }
};
