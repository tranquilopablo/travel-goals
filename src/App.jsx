import { useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Settings from './components/Settings';
import UserPlaces from './components/UserPlaces';
import NewPlace from './components/NewPlace';
import UpdatePlace from './components/UpdatePlace';
import Login from './components/Login';

function App() {
  const [logged, setLogged] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ustawienia" element={<Settings />} />
        <Route path="/:userId/miejsca" element={<UserPlaces />} />
        <Route path="/miejsca/nowe" element={<NewPlace />} />
        <Route path="/miejsca/:placeId" element={<UpdatePlace />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
