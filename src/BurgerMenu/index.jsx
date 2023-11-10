import 'boxicons';
import React from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import AuthButton from './Components/AuthButton';
import { Profile } from './Components/Profile';
import styles from './Menu.module.css';

const BurgerMenu = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });

  const Google = useSelector(state => state.google);
  const User = useSelector(state => state.user);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  React.useEffect(() => {
    // Управление прокруткой страницы
    const handleScrollLock = () => {
      if (showMenu) {
        document.body.style.overflow = 'hidden'; // Запрет прокрутки, когда меню открыто
      } else {
        document.body.style.overflow = 'auto'; // Разрешение прокрутки, когда меню закрыто
      }
    };

    handleScrollLock();

    // Очистка прокрутки при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMenu]);

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="md:hidden">
      <div
        onClick={toggleMenu}
        className="cursor-pointer z-10 absolute top-[3rem] left-[1rem]"
      >
        {showMenu ? (
          <AiOutlineClose className={styles.outlineClose} />
        ) : (
          <AiOutlineMenu className={styles.outlineMenu} />
        )}
      </div>
      <CSSTransition
        in={showMenu}
        timeout={400}
        classNames={{
          enter: styles['menu-list-enter'],
          enterActive: styles['menu-list-enter-active'],
          exit: styles['menu-list-exit'],
          exitActive: styles['menu-list-exit-active'],
        }}
        unmountOnExit
      >
        <div className={styles['menu-background']}>
          {/* <-- ToggleTheme --> */}
          <div onClick={toggleTheme} className={styles.toggleTheme}>
            {theme === 'light' ? <BsMoon /> : <BsSun />}
          </div>

          <div className={styles.content}>
            {/* <-- Link --> */}
            <ul className={styles.burger_item}>
              <li>
                <Link to={'/'} onClick={closeMenu}>
                  Главная
                </Link>
              </li>
              <li>
                <Link to={'/about'} onClick={closeMenu}>
                  О проекте
                </Link>
              </li>
              <li>
                <Link to={'/contact'} onClick={closeMenu}>
                  Контакты
                </Link>
              </li>
              <li>
                <Link to={'/termsOfUse'} onClick={closeMenu}>
                  Правил использования
                </Link>
              </li>
              <li>
                <Link to={'/advertising'} onClick={closeMenu}>
                  Реклама
                </Link>
              </li>
              <li>
                <Link to={'/policy'} onClick={closeMenu}>
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>

            {/* <-- Profile and AuthButton --> */}
            <div className={styles.auth}>
              {User.isAuthenticated || Google.isAuthenticated ? (
                <Profile />
              ) : (
                <AuthButton closeMenu={closeMenu} />
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </nav>
  );
};

export default BurgerMenu;
