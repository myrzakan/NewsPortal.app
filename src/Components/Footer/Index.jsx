import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  // <== Phone ==>
  const handlePhoneClick = () => {
    window.location.href = 'tel:+996500002007';
  };

  // <== Email ==>
  const handleEmailClick = () => {
    window.location.href = 'mailto:news@line.kg';
  };

  // <== Address ==>
  const handleAddressClick = () => {
    window.location.href =
      'https://www.google.com/maps/search/?api=1&query=г.+Бишкек';
  };

  return (
    <div className={styles.footer}>
      <div className={styles.content_footer}>
        <div className={`${styles.content_item} ${styles.contact}`}>
          <h1>Свяжитесь с нами</h1>
          <ul>
            <li onClick={handlePhoneClick}>
              Телефон: <span>+996 700 001 007</span>
            </li>
            <li onClick={handleEmailClick}>
              Почта: <span>newsline@gmail.com</span>
            </li>
            <li onClick={handleAddressClick}>
              Адресс: <span>г. Бишкек</span>
            </li>
          </ul>
        </div>

        <div className={`${styles.content_item} ${styles.link}`}>
          <h1>Ссылка</h1>
          <ul>
            <li>
              <Link to="/about">О нас</Link>
            </li>
            <li>
              <Link to="/contact">Контакты</Link>
            </li>
            <li>
              <Link to="/termsOfUse">Правила использования</Link>
            </li>
            <li>
              <Link to="/advertising">Реклама</Link>
            </li>
            <li>
              <Link to="/policy">Политика конфиденциальности</Link>
            </li>
          </ul>
        </div>

        <div className={`${styles.content_item} ${styles.social}`}>
          <h1>Подписывайтесь на нас</h1>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
          </ul>
        </div>

        <div className={`${styles.content_item} ${styles.about}`}>
          <h1>О нас</h1>
          <p>
            Наша цель - держать вас в курсе всех событий и происшествий,
            происходящих в мире.
          </p>
        </div>
      </div>

      <div className={styles.anchor}>18+</div>

      <div className={styles.copyright}>
        <h1>
          © 2023 Все права защищены. <br />
          Использование материалов разрешено только с письменного разрешения
          компании. <br />
          Любое копирование, воспроизведение или распространение контента без
          разрешения запрещено.
        </h1>
      </div>
    </div>
  );
};

export default Footer;
