import React from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../store/slices/useThemeSlice.js'; // импортируйте экшен для переключения темы
import cls from '../Header.module.scss';

export const ToggleTheme = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.theme.currentTheme);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(toggleTheme(savedTheme)); // Assuming you have a method to set the theme in your Redux store
    }
  }, [dispatch]);

  React.useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const toggleThemeHandle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div onClick={toggleThemeHandle} className={cls.toggleTheme}>
      {currentTheme === 'light' ? (
        <BsMoon size="25px" />
      ) : (
        <BsSun size="25px" />
      )}
    </div>
  );
};
