import { createContext, useState } from "react";
import { themesColor } from "../../utils/themes/themes";

export const Themes = createContext();

export default function ThemesProvider({ children }) {
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(
    storedTheme == "dark" ? themesColor.dark : themesColor.light
  );

  return (
    <Themes.Provider value={{ theme, setTheme }}>{children}</Themes.Provider>
  );
}
