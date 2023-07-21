import React, { useEffect } from 'react';
import { BsMoonFill, BsMoon } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import cls from './Header.module.scss';
import Green from '../../Logo/Logo_green.png';
import Blue from '../../Logo/Logo_blue.png';
import ProfileMenu from './components/ProfileMenu';
import AutchButton from './components/AuthButton'

const Header = () => {
  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const pb = localStorage.getItem('pocketbase_auth')

  return (
    <div className={cls.headerContainer}>
      <div onClick={toggleTheme} className={cls.theme}>
        {theme === 'light' ? <BsMoonFill size="20px" /> : <BsMoon size="20px" />}
      </div>
      <Link to="/">
        <img src={theme === 'light' ? Blue : Green} alt="logo" />
      </Link>
    
    {!pb ? <AutchButton/> : <ProfileMenu/>}

      <div className={cls.one}></div>
    </div>
  );
};

export default Header;
