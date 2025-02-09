import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
    setMounted(true); 
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!mounted) return null;

  return { theme, toggleTheme };
}