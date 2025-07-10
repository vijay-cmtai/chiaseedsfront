// src/index.js (FINAL AND CORRECT CODE)

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./main-component/App/App";
import reportWebVitals from "./reportWebVitals";

// --- CSS Imports ---
import "./css/font-awesome.min.css";
import "./css/themify-icons.css";
import "./css/flaticon.css";
import "./sass/style.scss";

// --- Redux Imports ---
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// === BADLAV YAHAN HAI: Naye store se import karein ===
import { store, persistor } from "./app/store"; // <-- Path badal diya gaya hai

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
