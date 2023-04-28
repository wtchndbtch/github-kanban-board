import "antd/dist/reset.css";
import "./index.css";

import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";

const customTheme = {
  token: {
    colorPrimary: "#b37feb",
    colorTextBase: "#030852",
    colorWarning: "#da3760",
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={customTheme}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
