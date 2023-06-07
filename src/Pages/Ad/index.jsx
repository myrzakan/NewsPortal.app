import React from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

import cls from './Ad.module.scss'

const Ad = () => {

    React.useEffect(() => {
        window.scrollTo(0, 0); 
      }, []);

      React.useEffect(() => {
        const animationData = [
          { selector: cls.title_one, delay: 0 },
          { selector: cls.title, delay: 0.1 },
          { selector: cls.titleThree, delay: 0.2 },
          { selector: cls.title_four, delay: 0.3 },
          { selector: cls.title_five, delay: 0.4 },
          { selector: cls.title_six, delay: 0.5 },
          { selector: cls.title_seven, delay: 0.6 },
          { selector: cls.title_eight, delay: 0.7 },
          { selector: cls.title_nine, delay: 0.8 },
          { selector: cls.titleTen, delay: 0.9 }
        ];
      
        animationData.forEach(({ selector, duration, delay }) => {
          gsap.from('.' + selector, {
            opacity: 0,
            duration: 0.2,
            delay,
            x: 30
          });
          
        });
      }, []);
    


    return (
        <div className={cls.adContainer}>
            <h1 className={cls.title_one}>Реклама на News Line:</h1>

            <p className={cls.title}>
                Хотите достичь широкой аудитории и продвинуть свой бренд или продукт?
                 <br />
                Реклама на <strong> News Line </strong> предоставляет вам возможность привлечь внимание 
                миллионов читателей, заинтересованных в актуальных новостях и информации.
            </p>

            <br />

            <p className={cls.titleThree}>
                Мы предлагаем различные рекламные форматы и 
                партнерские возможности, 
                чтобы удовлетворить ваши потребности и цели.
                Вот некоторые из наших предложений:
            </p>

            <br />

            <p className={cls.title_four}>
                {/* <span>1. </span> */}
                <strong> Баннерная реклама: </strong> <br />
                Разместите вашу рекламу в виде баннера на нашем сайте, 
                чтобы привлечь внимание пользователей. 
                Мы предлагаем разные размеры и позиции баннеров для 
                оптимальной видимости и привлекательности.
            </p>

            <br />

            <p className={cls.title_five}>
                {/* <span>2. </span> */}
                <strong> Спонсорские статьи: </strong> <br />
                Размещение спонсорской статьи позволит вам 
                представить вашу компанию, продукт или 
                услугу более подробно. Мы поможем вам создать 
                уникальное контентное предложение, которое 
                будет релевантно для нашей аудитории.
            </p>

            <br />

            <p className={cls.title_six}>
                {/* <span>3. </span> */}
                <strong> Видеореклама: </strong> <br />
                Видеоролики имеют сильное воздействие на зрителей. 
                Размещение видеорекламы на <strong> News Line </strong> 
                позволит вам донести ваше сообщение с помощью визуального контента и звука,
                 создавая более яркое впечатление и запоминаемость.
            </p>
            
            <br />

            <p className={cls.title_seven}>
                {/* <span>4. </span> */}
                <strong> Социальные медиа партнерства: </strong> <br />
                Расширьте свою рекламную кампанию через наши аккаунты в социальных сетях. 
                Мы предлагаем сотрудничество для публикации спонсорского контента, 
                конкурсов или рекламных сообщений на наших платформах.
            </p>

            <br />

            <p className={cls.title_eight}>
                {/* <span>5. </span> */}
                <strong> Индивидуальные решения: </strong> <br />
                Мы готовы рассмотреть индивидуальные предложения и 
                разработать специальные рекламные пакеты, 
                отвечающие вашим уникальным потребностям и бюджету.
            </p>

            <br />

            <p className={cls.title_nine}>
                Позвольте вашей рекламе достичь максимального воздействия и 
                привлечь внимание нашей активной аудитории. 
                Обратитесь к нам сегодня, чтобы обсудить возможности 
                сотрудничества и начать успешную рекламную кампанию на 
                <strong> News Line</strong>.
            </p>

            <br />

            <p className={cls.titleTen}>
                Свяжитесь с нами через указанные контактные данные на странице
                <Link to='/contact'><span> "Котакты". <br /> </span></Link> 
                Мы будем рады помочь вам достичь ваших рекламных целей и успешно 
                представить вашу компанию на 
                <strong> News Line</strong>.
            </p>
        </div>
    )
}

export default Ad