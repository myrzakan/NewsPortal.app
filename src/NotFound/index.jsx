import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <p className={styles.notFoundText}>404</p>
      <p className={styles.notFoundMessage}>Страница не найдена, вернитесь</p>
      <Link to="/" className={styles.notFoundLink}>
        Главное меню
      </Link>
    </div>
  );
};

export default NotFound;
