import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './pages/root';
import ScheduleRoot from "./pages/schedules/root";
import CheckupRoot from "./pages/checkups/root";
import ChatRoot from "./pages/chats/root";
import ContactRoot, {
  loader as rootLoader,
  action as rootAction,
} from "./pages/contacts/root";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./pages/contacts/contact";
import EditContact, {
  action as editAction,
} from "./pages/contacts/edit";
import Index from "./pages/contacts/index";
import { action as destroyAction } from "./pages/contacts/destroy";

import ErrorPage from './error-page';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ErrorPage />
      },
      {
        path: "/contacts",
        element: <ContactRoot />,
        loader: rootLoader,
        action: rootAction,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>
          },
        ]
      },
      {
        path: "/schedules",
        element: <ScheduleRoot />
      },
      {
        path: "/checkups",
        element: <CheckupRoot />
      },
      {
        path: "/chats",
        element: <ChatRoot />
      },
    ]
  },
]);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
