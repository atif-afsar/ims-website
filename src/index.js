import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Root() {
  React.useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return <App />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
