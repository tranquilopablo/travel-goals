import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  Link,
} from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
          <Link to="about">About Us</Link>
        </div>
      ),
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);

 

  return (
    <>
      <main>
      <RouterProvider router={router}/>
      </main>
    </>
  );
}

export default App;
