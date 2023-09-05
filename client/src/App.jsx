import { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import Layout from './shared/sharedComponents/uiElements/Layout';
import Settings from './pages/Settings';
import UserPlaces from './pages/UserPlaces';
import NewPlace from './pages/NewPlace';
import UpdatePlace from './pages/UpdatePlace';
import Login from './pages/Login';
import Users from './pages/Users';

function App() {
  const logged = useSelector((state) => state.appStore.isLoggedIn);
  // const [logged, setLogged] = useState(true);

  const queryClient = new QueryClient();

  let router;

  if (logged) {
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Layout />}>
          <Route index element={<Users />} />
          <Route path="ustawienia" element={<Settings />} />
          <Route path=":userId/miejsca" element={<UserPlaces />} />
          <Route path="miejsca">
            <Route path="nowe" element={<NewPlace />} />
            <Route path=":placeId" element={<UpdatePlace />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Route>
      )
    );
  } else {
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Layout />}>
          <Route index element={<Users />} />
          <Route path=":userId/miejsca" element={<UserPlaces />} />
          <Route path="login" element={<Login />} />
        </Route>
      )
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
