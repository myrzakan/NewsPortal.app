import React, { useEffect } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import { Link } from 'react-router-dom';
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
    <div className='w-[100%] h-[110px] bg-[var(--color-bg)] fixed top-0 z-[3] transition-all duration-400'>
      <div onClick={toggleTheme} className='relative left-[94rem] top-[35px] cursor-pointer'>
        {theme === 'light' ? <BsMoon size="22px" /> : <BsSun size="22px" />}
      </div>
      <Link to="/">
        <img 
          className='absolute left-[50rem] top-[-25px] w-[250px] h-[120px] pt-[10px] z-0 object-cover'
          src={theme === 'light' ? Blue : Green} 
          alt="logo" /
          >
      </Link>

      {!isAuthenticated ? <AuthButton /> : <ProfileSection/>} {/* Исправлено: AuthButton */}

      <div className='bg-[var(--color-text-base)] w-[100%] h-[15px] relative top-[30px]'></div>
    </div>
  );
};  

export default Header;
