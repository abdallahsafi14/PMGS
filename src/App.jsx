import AppProvider from "./components/app-provider";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import { useContext } from "react";
import { Themes } from "./context/themes/themes";
import "../src/assets/styles/global.css";
import "../src/assets/styles/index.css";

function App() {
  const { theme } = useContext(Themes);
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
