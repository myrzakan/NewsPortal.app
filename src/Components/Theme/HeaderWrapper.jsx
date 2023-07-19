import React from 'react';
import Header from '../Header';
import ThemeToggle from './ThemeToggle';

const HeaderWrapper = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div>
      <Header theme={theme} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default HeaderWrapper;
