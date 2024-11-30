import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateUser from './Components/CreateUser/CreateUser';
import AllUsers from './Components/AllUsers/AllUsers';


const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>error</div>,
    children: [
      {
        path: "/",
        element: <CreateUser />
      },
      {
        path: "/users",
        element: <AllUsers />
      },


    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>,
)
