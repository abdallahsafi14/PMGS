import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/index.js";
import "./assets/styles/index.css";
import { ContextProvider } from "./context/permissions/permissions.jsx";
import { ThemeProvider } from "styled-components";
import ThemesProvider, { Themes } from "./context/themes/themes.jsx";
import { useContext } from "react";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const MainApp = () => {
  return (
    <ThemesProvider>
      {/* Use the theme in styled-components */}
      <Provider store={store}>
        <ContextProvider>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </ContextProvider>
      </Provider>
    </ThemesProvider>
  );
};

createRoot(document.getElementById("root")).render(<MainApp />);
