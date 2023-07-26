import React, { useEffect } from 'react';
import { BsMoonFill, BsMoon } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import cls from './Header.module.scss';
import Green from '../../Logo/Logo_green.png';
import Blue from '../../Logo/Logo_blue.png';
import { ProfileSection } from './components/ProfileMenu';
import AuthButton from './components/AuthButton'; // Исправлено: опечатка в имени импорта
import { useDispatch } from 'react-redux';
import { useAuth } from 'hook/use-auth';
import { setUser } from 'store/slices/userSlice';

const Header = () => {
  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const dispatch = useDispatch();

  const { isAuth, userData } = useAuth(); // Изменил: добавил получение данных о пользователе

  useEffect(() => {
    setIsAuthenticated(isAuth);

    // Проверка наличия данных о пользователе после успешной регистрации
    if (isAuth && userData) {
      const { name, email, token, id } = userData;
      dispatch(setUser({ name, email, token, id }));
    }
  }, [isAuth, userData, dispatch]);

  return (
    <div className={cls.headerContainer}>
      <div onClick={toggleTheme} className={cls.theme}>
        {theme === 'light' ? <BsMoonFill size="20px" /> : <BsMoon size="20px" />}
      </div>
      <Link to="/">
        <img src={theme === 'light' ? Blue : Green} alt="logo" />
      </Link>

      {!isAuthenticated ? <AuthButton /> : <ProfileSection/>} {/* Исправлено: AuthButton */}

      <div className={cls.one}></div>
    </div>
  );
};  

export default Header;
