import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./components/Redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={Store}>
    <App />
    </Provider>

);
