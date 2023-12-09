import { Link } from 'react-router-dom';
import styles from '../Menu.module.css';

export const BurgerItem = ({ closeMenu }) => {
  return (
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
  );
};
