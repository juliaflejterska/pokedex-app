import { createContext, useEffect, useState } from "react";

const themes = {
  lightTheme: {
    backgroundColor: "white",
    color: "black",
  },
  darkTheme: {
    backgroundColor: "black",
    color: "white",
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = isDarkTheme ? themes.darkTheme : themes.lightTheme;

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);

    localStorage.setItem("isDarkTheme", JSON.stringify(!isDarkTheme));
  };

  useEffect(() => {
    const isDarkTheme = localStorage.getItem("isDarkTheme") === "true";
    setIsDarkTheme(isDarkTheme);
  }, []);

  return (
    <ThemeContext.Provider value={[{ theme, isDarkTheme }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
