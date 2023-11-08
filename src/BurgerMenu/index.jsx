import 'boxicons';
import React from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import AuthButton from './Components/AuthButton';
import { Profile } from './Components/Profile';
import styles from './Menu.module.css';

const BurgerMenu = () => {
  const [showMenu, setShowMenu] = React.useState(false);

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

  return (
    <nav className="md:hidden">
      <div
        onClick={toggleMenu}
        className="cursor-pointer z-10 absolute top-[2.4rem] left-[1rem] w-3"
      >
        {showMenu ? (
          <AiOutlineClose size={30} />
        ) : (
          <AiOutlineMenu
            size={30}
            className="max-xs:text-[20px] max-sd:text-[26px]"
          />
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
          <div className={styles.content}>
            <ul className="ml-[4rem]">
              <li className={styles.burger_item}>
                <Link to={'/'} onClick={closeMenu}>
                  Главная
                </Link>
              </li>
              <li className={styles.burger_item}>
                <Link to={'/about'} onClick={closeMenu}>
                  О проекте
                </Link>
              </li>
              <li className={styles.burger_item}>
                <Link to={'/contact'} onClick={closeMenu}>
                  Контакты
                </Link>
              </li>
              <li className={styles.burger_item}>
                <Link to={'/termsOfUse'} onClick={closeMenu}>
                  Правил использования
                </Link>
              </li>
              <li className={styles.burger_item}>
                <Link to={'/advertising'} onClick={closeMenu}>
                  Реклама
                </Link>
              </li>
              <li className={styles.burger_item}>
                <Link to={'/policy'} onClick={closeMenu}>
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>

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
