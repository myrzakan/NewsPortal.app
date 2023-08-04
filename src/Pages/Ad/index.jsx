/* eslint-disable react/no-unescaped-entities */
import gsap from 'gsap'
import React from 'react'
import { Link } from 'react-router-dom'

const Ad = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // <============ Gsap Animations =========>
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
                Реклама на News Line:
      </h1>

      <p className="title1 text-xl max-x6:text-[15px]">
                Хотите достичь широкой аудитории и продвинуть
                свой бренд или продукт?
        <br />
                Реклама на
        <strong className="text-[var(--color-text-base)]"> News Line </strong>
                предоставляет вам возможность привлечь внимание
                миллионов читателей, заинтересованных в
                актуальных новостях и информации.
      </p>

      <br />

      <p className="title2 text-xl max-x6:text-[15px]">
                Мы предлагаем различные рекламные форматы и
                партнерские возможности,
                чтобы удовлетворить ваши потребности и цели.
                Вот некоторые из наших предложений:
      </p>

      <br />

      <p className="title3 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">
                    Баннерная реклама:
        </strong>
        <br />
                Разместите вашу рекламу в виде баннера на нашем сайте,
                чтобы привлечь внимание пользователей.
                Мы предлагаем разные размеры и позиции баннеров для
                оптимальной видимости и привлекательности.
      </p>

      <br />

      <p className="title4 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">
                    Спонсорские статьи:
        </strong>
        <br />
                Размещение спонсорской статьи позволит вам
                представить вашу компанию, продукт или
                услугу более подробно. Мы поможем вам создать
                уникальное контентное предложение, которое
                будет релевантно для нашей аудитории.
      </p>

      <br />

      <p className="title5 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">
                    Видеореклама:
        </strong> <br />
                Видеоролики имеют сильное воздействие на зрителей.
                Размещение видеорекламы на
        <strong className="text-[var(--color-text-base)]"> News Line </strong>
                позволит вам донести ваше сообщение с помощью
                визуального контента и звука,
                создавая более яркое впечатление и запоминаемость.
      </p>

      <br />

      <p className="title6 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">
                    Социальные медиа партнерства:
        </strong>
        <br />
                Расширьте свою рекламную кампанию через наши аккаунты в социальных сетях.
                Мы предлагаем сотрудничество для публикации спонсорского контента,
                конкурсов или рекламных сообщений на наших платформах.
      </p>

      <br />

      <p className="title7 text-xl max-x6:text-[15px]">
        <strong className="text-[var(--color-text-base)]">
                    Индивидуальные решения:
        </strong>
        <br />
                Мы готовы рассмотреть индивидуальные предложения и
                разработать специальные рекламные пакеты,
                отвечающие вашим уникальным потребностям и бюджету.
      </p>

      <br />

      <p className="title8 text-xl max-x6:text-[15px]">
                Позвольте вашей рекламе достичь максимального воздействия и
                привлечь внимание нашей активной аудитории.
                Обратитесь к нам сегодня, чтобы обсудить возможности
                сотрудничества и начать успешную рекламную кампанию на
        <strong className="text-[var(--color-text-base)]"> News Line</strong>.
      </p>

      <br />

      <p className="title9 text-xl max-x6:text-[15px]">
                Свяжитесь с нами через указанные контактные данные на странице
        <Link to="/contact"><span className="text-[var(--color-text-base)] cursor-pointer hover:underline"> "Контакты".
          <br /></span></Link>
                Мы будем рады помочь вам достичь ваших рекламных целей и успешно
                представить вашу компанию на
        <strong className="text-[--color-text-base]"> News Line</strong>.
      </p>
    </div>
  )
}

export default Ad