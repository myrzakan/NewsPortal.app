import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'; // Иконки бургер-меню и закрытия
import { Link } from 'react-router-dom'; // Для создания ссылок
import { CSSTransition } from 'react-transition-group'; // Для анимаций входа и выхода меню
import styles from './Menu.module.css'; // Стили, возможно, CSS-модули

const BurgerMenu = () => {
  const [showMenu, setShowMenu] = useState(false); // Состояние для отображения/скрытия меню

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Переключение состояния меню при клике
  };

  // Функция для закрытия меню при нажатии на ссылку
  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
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
          <AiOutlineClose size={30} /> // Иконка закрытия меню
        ) : (
          <AiOutlineMenu
            size={30}
            className="max-xs:text-[20px] max-sd:text-[26px]"
          /> // Иконка бургер-меню
        )}
      </div>
      <CSSTransition
        in={showMenu}
        timeout={400}
        classNames={{
          enter: styles['menu-list-enter'], // Классы анимации при входе
          enterActive: styles['menu-list-enter-active'], // Классы активной анимации при входе
          exit: styles['menu-list-exit'], // Классы анимации при выходе
          exitActive: styles['menu-list-exit-active'], // Классы активной анимации при выходе
        }}
        unmountOnExit
      >
        <div className={styles['menu-background']}>
          <ul className="text-center">
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
              <Link to={'/advertisig'} onClick={closeMenu}>
                Реклама
              </Link>
            </li>
            <li className={styles.burger_item}>
              <Link to={'/policy'} onClick={closeMenu}>
                Политика конфиденциальности
              </Link>
            </li>
          </ul>
        </div>
      </CSSTransition>
    </nav>
  );
};

export default BurgerMenu;
