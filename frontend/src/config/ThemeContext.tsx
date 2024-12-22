import { createContext } from "react";

type ThemeContextType = [boolean, () => void];

const ThemeContext = createContext<ThemeContextType | null>(null);

export default ThemeContext;
