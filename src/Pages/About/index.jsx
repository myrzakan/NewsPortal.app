/* eslint-disable react/no-unescaped-entities */
import gsap from 'gsap'
import React from 'react'

const About = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // <========== Gsap Animations ===========>
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
    ]

    animationData.forEach(({ selector, duration, delay }) => {
      gsap.from('.' + selector, {
        opacity: 0,
        duration: 0.2,
        delay,
        x: 30,
      })
    })
  }, [])



  return (
    <div className="mx-[32rem] mb-[80px] mt-[110px] pt-[20px] 
      max-x1:mx-[20rem] max-x3:mx-[14rem] max-x4:mx-[10rem] max-x5:mx-[3rem]">
      <h1 className="mb-4 font-bold text-[30px] Title max-x6:text-[22px]">О проекте</h1>

      <p className="title1 text-xl max-x6:text-[15px]">
        <span className="text-[var(--color-text-base)]"> 'News Line' </span>
            - это инновационный проект, созданный с целью
            предоставления пользователю полного и всестороннего
            информационного опыта. Мы стремимся стать вашим
            надежным проводником в мире новостей, предлагая
            разнообразные тематические материалы и актуальные статьи.
      </p>

      <br />

      <p className="title2 text-xl max-x6:text-[15px]">
            Наша команда состоит из опытных журналистов и редакторов,
            которые тщательно отбирают и анализируют новости со
            всего мира. Мы следим за глобальными событиями, региональными
            разработками, политическими изменениями,
            научными открытиями, технологическими новинками, развитием бизнеса,
            культурными трендами и спортивными
            достижениями.
      </p>

      <br />

      <p className="title3 text-xl max-x6:text-[15px]">
        <span className="text-[var(--color-text-base)]">"News Line" </span>
            предлагает множество категорий новостей, чтобы каждый читатель
            мог найти информацию по своим интересам. Вы
            сможете узнавать о последних политических событиях,
            экономическом развитии, научных исследованиях,
            инновациях в сфере технологий, культурных мероприятиях,
            спортивных соревнованиях и многом другом.
      </p>

      <br />

      <p className="title4 text-xl max-x6:text-[15px]">
            Мы понимаем, что ваше время ценно, поэтому
        <span className="text-[var(--color-text-base)]"> "News Line" </span>
            предоставляет легкий и удобный интерфейс, который
            позволяет вам быстро найти нужную информацию. Вы сможете
            осуществлять поиск по ключевым словам, фильтровать новости
            по категориям, а также настраивать
            персонализированные уведомления о самых важных событиях.
      </p>

      <br />

      <p className="title5 text-xl max-x6:text-[15px]">
            Мы гордимся своей независимостью и объективностью в
            отображении новостей. Мы представляем разные точки
            зрения, анализируем факты и предоставляем достоверную
            информацию, чтобы вы могли самостоятельно сформировать
            свое мнение.
      </p>

      <br />

      <p className="title6 text-xl max-x6:text-[15px]">
        <span className="text-[var(--color-text-base)]">"News Line" </span>
            также предоставляет возможность взаимодействия с
            нашей командой. Вы можете оставлять комментарии, делиться
            своими мыслями и обсуждать новостные материалы с
            другими пользователями. Мы ценим ваше мнение и стремимся
            создать пространство для обмена информацией и идеями.
      </p>

      <br />

      <p className="title7 text-xl max-x6:text-[15px]">
            Присоединяйтесь к
        <span className="text-[var(--color-text-base)]"> "News Line" </span>
            уже сегодня и будьте в курсе самых актуальных новостей
            и событий со всего мира. Мы работаем для вас, чтобы
            вы всегда оставались информированными и вдохновленными.
      </p>
    </div>
  )
}

export default About
