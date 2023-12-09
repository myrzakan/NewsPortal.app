import 'boxicons';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { AuthenticationBurgerMenu } from './Components/AuthenticationSection';
import { BurgerItem } from './Components/BurgerItem';
import { ToggleMenu } from './Components/ToggleMenu';
import { ToggleThemeBurgerMenu } from './Components/ToggleTheme';
import styles from './Menu.module.css';

const BurgerMenu = () => {
  const [showMenu, setShowMenu] = React.useState(false);

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
      {/* <-- Toggle Menu --> */}
      <ToggleMenu showMenu={showMenu} toggleMenu={toggleMenu} />

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
          <ToggleThemeBurgerMenu closeMenu={closeMenu} />

          <div className={styles.content}>
            {/* <-- Link --> */}
            <BurgerItem closeMenu={closeMenu} />

            {/* <-- Profile and AuthButton --> */}
            <AuthenticationBurgerMenu closeMenu={closeMenu} />
          </div>
        </div>
      </CSSTransition>
    </nav>
  );
};

export default BurgerMenu;
