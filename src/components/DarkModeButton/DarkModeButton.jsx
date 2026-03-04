import { useState, useEffect } from 'react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(function() {
    return localStorage.getItem('theme') === "dark";
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-14 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border border-[rgba(5,39,39,0.8)] dark:border-primary/30 flex items-center justify-center hover:shadow-[0_0_20px_rgba(20,184,184,0.4)] transition-all duration-300 group overflow-hidden"
      aria-label="Toggle dark mode"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon container with rotation animation */}
      <div className="relative z-10 transition-transform duration-500 ease-in-out" style={{ transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)' }}>
        {isDark ? (
          <FontAwesomeIcon 
            icon={faMoon} 
            className="text-primary text-xl drop-shadow-[0_0_8px_rgba(20,184,184,0.6)]" 
          />
        ) : (
          <FontAwesomeIcon 
            icon={faSun} 
            className="text-yellow-500 text-xl drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" 
          />
        )}
      </div>
    </button>
  );
}