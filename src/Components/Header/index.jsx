import React from 'react';
import { BsMoonFill, BsMoon } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

import cls from './Header.module.scss';

import Green from '../../Logo/Logo_green.png';
import Blue from '../../Logo/Logo_blue.png';

const Header = ({ theme, toggleTheme }) => {
  const location = useLocation();

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div className={cls.headerContainer}>
      <div onClick={handleThemeToggle} className={cls.theme}>
        {theme === 'light' ? (
          <>
            <BsMoonFill size="14px" />
            <span style={{ marginLeft: '0.75rem' }}>Dark Theme</span>
          </>
        ) : (
          <>
            <BsMoon size="14px" />
            <span style={{ marginLeft: '0.75rem' }}>Light Theme</span>
          </>
        )}
      </div>
      <Link to="/">
        <img src={theme === 'light' ? Blue : Green} alt="logo" />
      </Link>
      {/* <nav>
        <Link to="/"></Link>
        <Link to="/about">О проекте</Link>
        <Link to="/contact">Контакт</Link>
        <Link to="/termsOfUse">Правило и использование</Link>
        <Link to="/advertising">Реклама</Link>
        <Link to="/policy">Политика конфиденциальности</Link>
      </nav> */}
      <div className={cls.one}></div>
    </div>
  );
};

const HeaderWrapper = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return <Header theme={theme} toggleTheme={toggleTheme} />;
};

export default HeaderWrapper;
