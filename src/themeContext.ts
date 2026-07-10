import { createContext } from "react";


const themeContext = createContext<{theme: string, setTheme: (theme: string) => void}>({
    theme: 'light',
    setTheme: () => {}
});

export default themeContext;