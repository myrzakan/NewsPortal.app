// <-- Contact -->
import { gsap } from 'gsap';
import React from 'react';
import '../Pages.css';

const Contact = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // <== Gsap Animations ==>
  React.useEffect(() => {
    const animationData = [
      { selector: 'Title', delay: 0 },
      { selector: 'title1', delay: 0.1 },
      { selector: 'title2', delay: 0.2 },
      { selector: 'title3', delay: 0.3 },
      { selector: 'title4', delay: 0.4 },
      { selector: 'title5', delay: 0.5 },
      { selector: 'title6', delay: 0.6 },
      { selector: 'title7', delay: 0.7 },
      { selector: 'title8', delay: 0.8 },
      { selector: 'title9', delay: 0.9 },
    ];

    animationData.forEach(({ selector, delay }) => {
      gsap.from('.' + selector, {
        opacity: 0,
        duration: 0.2,
        delay,
        x: 30,
      });
    });
  }, []);

  return (
    <div className="container">
      <div className="content">
        <h1 className="Title">Контакты:</h1>

        <p className="title1">
          Мы ценим ваши вопросы, отзывы и предложения. Наша команда всегда
          готова общаться с вами и помочь вам в любых вопросах, связанных с
          проектом
          <strong className="text-[var(--color-text-base)]">"News Line"</strong>
          . Мы стремимся предоставлять вам актуальные новости и интересную
          информацию из разных сфер жизни.
        </p>

        <br />

        <p className="title2">
          Если у вас возникли вопросы о нашем контенте, функциональности сайта,
          рекламных возможностях или сотрудничестве, пожалуйста, не стесняйтесь
          связаться с нами. Мы готовы ответить на ваши вопросы и предоставить
          вам необходимую поддержку.
        </p>

        <br />

        <p className="title3">
          Вы можете связаться с нами по следующим контактным данным:
        </p>

        <br />

        <p className="title4" onClick={handlePhoneClick}>
          <span className="font-bold">Телефон: </span>
          <strong className="text-[var(--color-text-base)] cursor-pointer hover:underline">
            +996 (500) 002 007
          </strong>
        </p>

        <br />

        <p className="title5" onClick={handleEmailClick}>
          <span className="font-bold">Emali: </span>
          <strong className="text-[var(--color-text-base)] cursor-pointer hover:underline">
            news@line.kg
          </strong>
        </p>

        <br />

        <p className="title6" onClick={handleAddressClick}>
          <span className="font-bold">Адрес: </span>
          <strong className="text-[var(--color-text-base)] cursor-pointer hover:underline">
            г. Бишкек
          </strong>
        </p>

        <br />

        <p className="title7">
          Наша команда службы поддержки пользователей работает для вас и готова
          помочь вам в любое время. Мы стремимся обеспечить высокий уровень
          обслуживания и оперативно реагировать на ваши запросы.
        </p>

        <br />

        <p className="title8">
          Если у вас есть интересные новости, статьи или медиаматериалы, которые
          вы бы хотели предложить для публикации на
          <strong className="text-[var(--color-text-base)]">
            {' '}
            "News Line"
          </strong>
          , мы будем рады рассмотреть ваше предложение. Присылайте свои
          материалы на указанный выше email, и наша редакционная команда
          рассмотрит их с интересом.
        </p>

        <br />

        <p className="title9">
          Мы ценим ваше внимание к
          <strong className="text-[var(--color-text-base)]">
            {' '}
            "News Line"{' '}
          </strong>
          и стремимся создать долгосрочные отношения с нашими пользователями. Не
          стесняйтесь обращаться к нам - мы всегда открыты для общения и готовы
          помочь вам!
        </p>
      </div>
    </div>
  );
};

export default Contact;
