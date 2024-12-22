import { useContext } from "react";
import Moon from "../icons/Moon";
import ThemeContext from "../../config/ThemeContext";
import Sun from "../icons/Sun";

const Header = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("ThemeContext must be used within a ThemeContext.Provider");
  }

  const [isDark, toggleDarkMode] = theme;

  return (
    <div className="bg-background text-text h-[10%]">
      <div className="py-1 flex justify-between items-center w-2/3 mx-auto">
        <h1 className="text-3xl font-semibold">QuickChat</h1>
        <div onClick={toggleDarkMode} className="cursor-pointer transition-all">
          {isDark ? <Moon /> : <Sun />}
        </div>
      </div>
    </div>
  );
};

export default Header;
