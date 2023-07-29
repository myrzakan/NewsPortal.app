import React, { useEffect } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import { MdOutlineAdminPanelSettings, MdAdminPanelSettings } from 'react-icons/md'
import { Link } from 'react-router-dom' 

import Green from '../../Logo/Logo_green.png';
import Blue from '../../Logo/Logo_blue.png';

import { ProfileSection } from './components/ProfileMenu';
import AuthButton from './components/AuthButton'; // Исправлено: опечатка в имени импорта
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hook/use-auth';
import { setUser } from 'store/slices/userSlice';

const Header = () => {
  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const dispatch = useDispatch();

  const { isAuth, userData } = useAuth(); 
  // console.log(useAuth);

  useEffect(() => {
    setIsAuthenticated(isAuth);
    
    // Проверка наличия данных о пользователе после успешной регистрации
    if (isAuth && userData) {
      const { name, email, token, id, password } = userData;
      console.log(userData);
      dispatch(setUser({ name, email, token, id }));
      console.log('userData:', userData);
      
      // Проверяем, является ли пользователь администратором
      const adminEmail = 'admin@admin.com'; 
      const adminPass = 'adminadmin'
      // Укажите здесь email администратора, как в Firebase Auth
      if (email === adminEmail && password === adminPass) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [isAuth, userData, dispatch]);

  return (
    <div className='w-[100%] h-[110px] bg-[var(--color-bg)] fixed top-0 z-[3] transition-all duration-3000'>
      <div onClick={toggleTheme} className='relative left-[94rem] top-[35px] cursor-pointer w-1'>
        {theme === 'light' ? <BsMoon size="22px" /> : <BsSun size="22px" />}
      </div>
      {isAdmin && (
        <div className='relative left-[90rem] top-[9px] cursor-pointer h-0 w-0'>
          <Link to='../../Auth/admin'>
            {theme === 'light' ? <MdAdminPanelSettings size='30px'/> 
              : <MdOutlineAdminPanelSettings size='30px'  className='object-cover'/>}
          </Link>
        </div>
      )}
      <Link to="/">
        <img 
          className='absolute left-[50rem] top-[-25px] w-[250px] h-[120px] pt-[10px] z-0 object-cover'
          src={theme === 'light' ? Blue : Green} 
          alt="logo" />
      </Link>

      {!isAuthenticated  ? <AuthButton /> : <ProfileSection />}

      <div className='bg-[var(--color-text-base)] w-[100%] h-[15px] relative top-[32px]'></div>
    </div>
  );
};  

export default Header;
