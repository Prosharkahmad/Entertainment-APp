import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Store from "./Store/Store.js";
import { GenreIds } from "./Components/movies";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
  {
    path: "/GenreIds",
    element: <GenreIds />,
  },
]);
let persistor = persistStore(Store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <React.StrictMode>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </React.StrictMode>
  </Provider>
);
