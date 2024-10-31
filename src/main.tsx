import { StrictMode, useContext, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import CreateUser from './Components/CreateUser/CreateUser.tsx';
import UserScreen from './Components/UserScreen/UserScreen.tsx';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />
    },

    {
      path: "/CreateUser",
      element: <CreateUser />
    },

    {
      path: "/UserScreen",
      element: <UserScreen />,

    }
  ]
);

const WebsiteRoot = () => {

  return (
    <RouterProvider router={router} />
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebsiteRoot />
  </StrictMode>,
)
