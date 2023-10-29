import gsap from 'gsap';
import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfUse = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // <============= Gsap Animations ============>
  React.useEffect(() => {
    const animationData = [
      { selector: 'Title', delay: 0.1 },
      { selector: 'title1', delay: 0.2 },
      { selector: 'title2', delay: 0.3 },
      { selector: 'title3', delay: 0.4 },
      { selector: 'title4', delay: 0.5 },
      { selector: 'title5', delay: 0.6 },
      { selector: 'title6', delay: 0.7 },
      { selector: 'title7', delay: 0.8 },
      { selector: 'title8', delay: 0.9 },
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
    <div
      className="mx-[545px] mb-[80px] mt-[110px] pt-[20px] relative right-[25px] 
      max-x1:mx-[20rem] max-x3:mx-[14rem] max-x4:mx-[10rem] max-x5:mx-[3rem]"
    >
      <h1 className="mb-4 font-bold text-[30px] Title max-x6:text-[22px]">
        Правила и использование News Line:
      </h1>

      <p className="title1 text-xl max-x6:text-[15px]">
        Добро пожаловать на
        <strong className="text-[var(--color-text-base)]"> News Line! </strong>
        Мы рады предоставить вам доступ к нашему информационному порталу и
        обеспечить вас актуальными новостями и интересными материалами. Чтобы
        гарантировать комфортное и безопасное взаимодействие с нашим сайтом,
        пожалуйста, ознакомьтесь с нижеследующими правилами и условиями
        использования:
      </p>

      <br />

      <p className="title2 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">
          Авторские права:
        </strong>
        <br />
        Все материалы, опубликованные на
        <strong className="text-[var(--color-text-base)]"> News Line</strong>,
        являются интеллектуальной собственностью и защищены авторскими правами.
        Копирование, воспроизведение или распространение контента без явного
        разрешения правообладателя запрещено. Просим вас уважать права наших
        авторов и не нарушать их интеллектуальную собственность.
      </p>

      <br />

      <p className="title3 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">
          Правила публикации комментариев:
        </strong>
        <br />
        Мы приветствуем ваше активное участие в дискуссиях на нашем сайте через
        комментарии. Однако, просим вас соблюдать этические нормы и общепринятые
        правила коммуникации. Запрещено размещение оскорбительных, унизительных
        или ненормативной лексики комментариев. Мы оставляем за собой право
        удалить любой комментарий, который не соответствует нашим правилам.
      </p>

      <br />

      <p className="title4 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">
          Информационная ответственность:
        </strong>{' '}
        <br />
        Мы стремимся предоставлять актуальную и достоверную информацию, однако
        не можем гарантировать полную точность материалов. Пользователи несут
        ответственность за собственное использование предоставленной информации
        и принимают на себя риск, связанный с действиями, основанными на этой
        информации. Мы рекомендуем проверять информацию у различных источников и
        обращаться к экспертам в случае необходимости.
      </p>

      <br />

      <p className="title5 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">
          Безопасность и конфиденциальность:
        </strong>
        <br />
        Мы прилагаем все усилия для обеспечения безопасности вашей личной
        информации при использовании нашего сайта. Однако, мы не несем
        ответственности за возможные утечки данных, вызванные внешними факторами
        или действиями третьих лиц. Рекомендуется принимать меры
        предосторожности при обмене личными данными и оставлять только
        необходимую информацию.
      </p>

      <br />

      <p className="title6 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">
          Внешние ссылки:
        </strong>{' '}
        <br />
        На{' '}
        <strong className="text-[var(--color-text-base)]"> News Line </strong>
        могут быть размещены ссылки на внешние ресурсы и сторонние веб-сайты. Мы
        не контролируем содержание и политику конфиденциальности этих сайтов,
        поэтому не несем ответственности за их действия или информацию,
        предоставляемую на них. Переходя по внешним ссылкам, пользователи делают
        это на свой собственный риск.
      </p>

      <br />

      <p className="title7 text-xl max-x6:text-[15px]">
        Мы призываем всех пользователей
        <strong className="text-[var(--color-text-base)]"> News Line </strong>
        соблюдать эти правила и условия использования, чтобы обеспечить
        качественное и безопасное взаимодействие на нашем сайте. Если у вас
        возникли вопросы, замечания или жалобы, пожалуйста, свяжитесь с нами
        через наши контактные данные, указанные на странице
        <br />
        <Link to="/contact">
          <span className="text-[var(--color-text-base)] cursor-pointer hover:underline">
            "Контакты"
          </span>
        </Link>
      </p>

      <br />

      <p className="title8 text-xl max-x6:text-[15px]">
        Благодарим вас за использование
        <strong className="text-[var(--color-text-base)]"> News Line! </strong>
        Мы надеемся, что наш сайт станет вашим надежным источником информации и
        вдохновения.
      </p>
    </div>
  );
};

export default TermsOfUse;
