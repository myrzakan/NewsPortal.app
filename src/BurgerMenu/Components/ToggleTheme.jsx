import React from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/useThemeSlice.js';
import styles from '../Menu.module.css';

export const ToggleThemeBurgerMenu = ({ setShowMenu }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.theme.currentTheme);

  React.useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const toggleThemeHandle = () => {
    dispatch(toggleTheme());
    setShowMenu(false);
  };
  return (
    <div onClick={toggleThemeHandle} className={styles.toggleTheme}>
      {currentTheme === 'light' ? <BsMoon /> : <BsSun />}
    </div>
  );
};
