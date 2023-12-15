import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./main.css";
import { Provider } from "react-redux";
import store, { persist } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<>Loading...</>} persistor={persist}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>

  , document.getElementById("root")
);
