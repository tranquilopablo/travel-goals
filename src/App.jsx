import { useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './components/Layout';
import Settings from './components/Settings';
import UserPlaces from './components/UserPlaces';
import NewPlace from './components/NewPlace';
import UpdatePlace from './components/UpdatePlace';
import Login from './components/Login';
import Users from './pages/Users';

function App() {
  const [logged, setLogged] = useState(false);




   let router
   
   if(logged) {
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Layout />}>
          <Route index element={<Users />} />
          <Route path="/ustawienia" element={<Settings />} />
          <Route path="/:userId/miejsca" element={<UserPlaces />} />
          <Route path="/miejsca/nowe" element={<NewPlace />} />
          <Route path="/miejsca/:placeId" element={<UpdatePlace />} />
          <Route path="/login" element={<Login />} />
        </Route>
      )
    );
   } else {
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Layout />}>
          <Route index element={<Users />} />
          <Route path="/:userId/miejsca" element={<UserPlaces />} />
          <Route path="/login" element={<Login />} />
        </Route>
      )
    )
   }
   



  return <RouterProvider router={router} />;
}

export default App;
