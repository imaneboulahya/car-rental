import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'midnight' | 'showroom';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem('luxe-theme') as Theme) || 'midnight'
  );

  useEffect(() => {
    // This is the magic line that updates the WHOLE website via the HTML tag
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('luxe-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'midnight' ? 'showroom' : 'midnight'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};