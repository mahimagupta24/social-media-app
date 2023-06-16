import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { makeServer } from "./server";
import AuthProvider from "./contexts/AuthContext";
import FeatureProvider from "./contexts/FeatureContext";
import UserProvider from "./contexts/UserContext";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <FeatureProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </FeatureProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
