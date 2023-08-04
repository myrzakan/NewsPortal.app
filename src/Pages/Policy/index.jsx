import { gsap } from 'gsap'
import React from 'react'
import { Link } from 'react-router-dom'

const Policy = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // <============== Gsap Animations ===========>
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
    ]

    animationData.forEach(({ selector, delay }) => {
      gsap.from('.' + selector, {
        opacity: 0,
        duration: 0.2,
        delay,
        x: 30,
      })
    })
  }, [])

  return (
    <div className="mx-[545px] mb-[80px] mt-[110px] pt-[20px] relative right-[25px] 
      max-x1:mx-[20rem] max-x3:mx-[14rem] max-x4:mx-[10rem] max-x5:mx-[3rem]">
      <h1 className="mb-4 font-bold text-[30px] Title max-x6:text-[22px]"> 
        Политика конфиденциальности News Line:
      </h1>

      <p className="title1 text-xl max-x6:text-[15px]">
        Мы в <strong className="text-[var(--color-text-base)]">News Line </strong>
        ценим вашу конфиденциальность и
        стремимся обеспечить безопасность и защиту ваших личных данных. Эта
        политика конфиденциальности объясняет, как мы собираем, используем,
        защищаем и раскрываем информацию, которую вы предоставляете при
        использовании нашего сайта.
      </p>

      <br />

      <p className="title2 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">Сбор информации:</strong>
        <br />
        Мы собираем только ту информацию, которую вы сознательно предоставляете
        нам, например, при заполнении формы подписки на новости или оставлении
        комментария. Это может включать ваше имя, адрес электронной почты или
        другую персональную информацию.
      </p>

      <br />

      <p className="title3 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">Использование информации:</strong>
        <br />
        Мы используем предоставленную вами информацию для целей, связанных с
        предоставлением новостной информации, общения с вами и улучшения
        пользовательского опыта нашего сайта. Мы не продаем, не арендуем и не
        передаем вашу информацию третьим сторонам без вашего явного согласия, за
        исключением случаев, когда это требуется по закону.
      </p>

      <br />

      <p className="title4 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">Защита информации:</strong>
        <br />
        Мы принимаем меры для защиты вашей личной информации от
        несанкционированного доступа, использования или разглашения. Мы
        применяем технические и организационные меры безопасности, чтобы
        обеспечить сохранность ваших данных.
      </p>

      <br />

      <p className="title5 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">Использование файлов cookie:</strong>
        <br />
        Мы можем использовать файлы cookie, чтобы улучшить ваш опыт
        использования нашего сайта. Файлы cookie являются небольшими текстовыми
        файлами, которые сохраняются на вашем устройстве и позволяют нам
        анализировать ваше взаимодействие с сайтом, предоставлять
        персонализированный контент и запоминать ваши предпочтения. Вы можете
        отключить файлы cookie в настройках своего браузера, но это может
        повлиять на функциональность сайта.
      </p>

      <br />

      <p className="title6 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">Ссылки на сторонние ресурсы:</strong>
        <br />
        Наш сайт может содержать ссылки на сторонние веб-сайты, которые имеют
        свои собственные политики конфиденциальности. Мы не несем
        ответственности за содержание и действия этих внешних сайтов.
        Рекомендуется ознакомиться с их политикой конфиденциальности перед
        предоставлением им своей информации.
      </p>

      <br />

      <p className="title7 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">Изменения в политике конфиденциальности:</strong>
        <br />
        Мы можем время от времени вносить изменения в нашу политику
        конфиденциальности. Любые изменения будут опубликованы на этой странице,
        и вы будете уведомлены о важных изменениях, если это требуется по
        закону.
      </p>

      <br />

      <p className="title8 text-xl max-x6:text-[15px]">
        Если у вас возникнут вопросы или требуется дополнительная информация о
        нашей политике конфиденциальности, пожалуйста, свяжитесь с нами через
        контактные данные, указанные на странице
        <Link to="/contact">
          <span className="text-[var(--color-text-base)] cursor-pointer hover:underline"> "Контакты"</span>,
        </Link>
      </p>

      <br />

      <p className="title8 text-xl max-x6:text-[15px]">
        Мы ценим ваше доверие и гарантируем, что ваша конфиденциальность
        является нашим приоритетом.
      </p>
    </div>
  )
}

export default Policy
