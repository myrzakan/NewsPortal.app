import React from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';

import cls from '../Header.module.scss';

export const ToggleTheme = () => {
  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <div onClick={toggleTheme} className={cls.toggleTheme}>
      {theme === 'light' ? <BsMoon size="25px" /> : <BsSun size="25px" />}
    </div>
  );
};
