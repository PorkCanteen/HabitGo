import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/global.css";
import App from "./App.tsx";
import { ConfigProvider } from "react-vant";

const themeVars = {
  rateIconFullColor: "#d6af69",
  sliderActiveBackgroundColor: "#d6af69",
  buttonPrimaryBorderColor: "#d6af69",
  buttonPrimaryBackgroundColor: "#d6af69",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider themeVars={themeVars}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
