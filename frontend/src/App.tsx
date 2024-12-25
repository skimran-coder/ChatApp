import { useEffect, useState } from "react";
import ThemeContext from "./config/ThemeContext";
import Header from "./components/ui/Header";
import ChatPage from "./Pages/ChatPage";
import LandingPage from "./Pages/LandingPage";
import { Routes, Route } from "react-router";

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (!localStorage.getItem("darkMode")) {
      return true;
    } else {
      return localStorage.getItem("darkMode") === "true";
    }
  });

  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", isDark ? "false" : "true");
    setIsDark(!isDark);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={[isDark, toggleDarkMode]}>
      <div className="bg-background h-screen max-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat/:roomId" element={<ChatPage />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
