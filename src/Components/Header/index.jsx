import React, { useEffect } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import { MdOutlineAdminPanelSettings, MdAdminPanelSettings } from 'react-icons/md';
import { Link } from 'react-router-dom'; 

import Green from '../../Logo/Logo_green.png';
import Blue from '../../Logo/Logo_blue.png';

import { ProfileSection } from './components/ProfileMenu';
import { AuthButton } from './components/AuthButton';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { loadUserFromLocalStorage, loadGoogleUserDataFromLocalStorage } from '../../utils/LocalStorage'; // Импортируем функцию для загрузки данных из localStorage
import { setUser } from 'store/slices/userSlice';
import { setGoogleUserData } from 'store/slices/useGoogleSlice';


const Header = () => {
  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });

  const dispatch = useDispatch()
  const { addToast } = useToasts();

   // Загрузим данные о пользователе из localStorage при загрузке компонента
   useEffect(() => {
    const localUser = loadUserFromLocalStorage();
    const localGoogleUserData = loadGoogleUserDataFromLocalStorage();
    if (localUser) {
      dispatch(setUser(localUser));
    }
    if (localGoogleUserData) {
      dispatch(setGoogleUserData(localGoogleUserData));
    }
  }, [dispatch]);

  const Google = useSelector((state) => state.google);
  const User = useSelector((state) => state.user);
  console.log(User);
  console.log(Google);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className='w-[100%] h-[110px] bg-[var(--color-bg)] fixed top-0 z-[3] transition-all duration-3000'>
      
      <div onClick={toggleTheme} className='relative left-[94rem] top-[35px] cursor-pointer w-1'>
        {theme === 'light' ? <BsMoon size="22px" /> : <BsSun size="22px" />}
      </div>
      
      <div className='relative left-[90rem] top-[9px] cursor-pointer h-0 w-0'>
        <Link to='../../Auth/admin'>
          {theme === 'light' ? <MdAdminPanelSettings size='30px'/> 
            : <MdOutlineAdminPanelSettings size='30px'  className='object-cover'/>}
        </Link>
      </div>
      
      <Link to="/">
        <img 
          className='absolute left-[50rem] top-[-25px] 
          w-[250px] h-[120px] pt-[10px] z-0 object-cover'
          src={theme === 'light' ? Blue : Green} 
          alt="logo" />
      </Link>

      {User.isAuthenticated ||  Google.isAuthenticated ? (
        <ProfileSection addToast={addToast}/>
      ) : (
        <AuthButton theme={theme}/>
      )}

      

      <div className='bg-[var(--color-text-base)] w-[100%] h-[15px] relative top-[40px]'></div>
    </div>
  );
};  

export default Header;
