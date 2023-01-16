import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
console.log("store:", store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
