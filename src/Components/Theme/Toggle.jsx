import React from 'react';
import { BsMoonFill, BsMoon } from 'react-icons/bs';
import cls from '../Header/Header.module.scss';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div onClick={handleThemeToggle} className={cls.theme}>
      {theme === 'light' ? <BsMoonFill size="20px" /> : <BsMoon size="20px" />}
    </div>
  );
};

export default ThemeToggle;
