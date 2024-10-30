import { StrictMode, useContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import CreateUser from './Components/CreateUser/CreateUser.tsx';
import UserScreen from './Components/UserScreen/UserScreen.tsx';
import { CurrentUserContext } from './GlobalStates/GlobalUserState.tsx';
import { UserInterface } from './DatabaseLogic/User.tsx';

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
  const [currentUser, setCurrentUser] = useState<UserInterface>({ username: "", password: "" });

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <RouterProvider router={router} />
    </CurrentUserContext.Provider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebsiteRoot />
  </StrictMode>,
)
