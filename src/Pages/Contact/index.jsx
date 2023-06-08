import React from 'react'

import cls from './Contact.module.scss'

import { gsap } from 'gsap'

const Contact = () => {

    React.useEffect(() => {
        window.scrollTo(0, 0); // Прокручиваем страницу в начало при монтировании компонента
      }, []);

    // <========= Phone ============> 
    const handlePhoneClick = () => {
        window.location.href = 'tel:+996500002007';
      };
    // <========== Email ===========>
    const handleEmailClick = () => {
        window.location.href = 'mailto:news@line.kg';
    };

    // <=========== Address ===========>
    const handleAddressClick = () => {
        window.location.href = 'https://www.google.com/maps/search/?api=1&query=г.+Бишкек, проспект Эркиндик 46';
    };

    // <============= Gsap Animations ============>
    React.useEffect(() => {
      const animationData = [
        { selector: cls.title, delay: 0 },
        { selector: cls.title_two, delay: 0.1 },
        { selector: cls.title_three, delay: 0.2 },
        { selector: cls.title_four, delay: 0.3 },
        { selector: cls.title_five, delay: 0.4 },
        { selector: cls.title_six, delay: 0.5 },
        { selector: cls.title_seven, delay: 0.6 },
        { selector: cls.title_eight, delay: 0.7 },
        { selector: cls.title_9, delay: 0.8 },
        { selector: cls.title_ten, delay: 0.9 }
      ];
    
      animationData.forEach(({ selector, delay }) => {
        gsap.from('.' + selector, {
          opacity: 0,
          duration: 0.2,
          delay,
          x: 30
        });       
      });
    }, []);


    return (
        <div className={cls.contactContainer}>
            <h1 className={cls.title}>Контакты News Line:</h1>

            <br />

            <p className={cls.title_two}>
                Мы ценим ваши вопросы, отзывы и предложения. 
                Наша команда всегда готова 
                общаться с вами и помочь вам в любых вопросах, 
                связанных с проектом <strong>"News Line"</strong>. 
                Мы стремимся предоставлять вам актуальные новости и 
                интересную информацию из разных сфер жизни.
            </p>

            <br />

            <p className={cls.title_three}>
                Если у вас возникли вопросы о нашем контенте,
                 функциональности сайта, 
                рекламных возможностях или сотрудничестве, 
                пожалуйста, не стесняйтесь связаться с нами. 
                Мы готовы ответить на ваши вопросы и 
                предоставить вам необходимую поддержку.
            </p>

            <br />

            <p className={cls.title_four}>
                Вы можете связаться с нами по следующим контактным данным:
            </p>
            
            <br />

            <p 
                className={cls.title_five}
                onClick={handlePhoneClick}
            >
                <span>Телефон: </span>
                <strong className={cls.href}>+996 (500) 002 007</strong>
            </p>

            <br />

            <p 
                className={cls.title_six}
                onClick={handleEmailClick}
            >
                <span>Emali:</span>
                <strong className={cls.href}> news@line.kg</strong>
            </p> 

            <br />

            <p 
                className={cls.title_seven}
                onClick={handleAddressClick}
            >
                <span>Адрес:</span>
                <strong className={cls.href}> г. Бишкек, проспект Эркиндик 46</strong>
            </p>

            <br />

            <p className={cls.title_eight}>
                Наша команда службы поддержки пользователей работает
                для вас и готова помочь вам в любое время. 
                Мы стремимся обеспечить высокий уровень обслуживания
                и оперативно реагировать на ваши запросы.
            </p>

            <br />

            <p className={cls.title_9}>
                Если у вас есть интересные новости, статьи или 
                медиаматериалы, которые вы бы хотели предложить
                для публикации на <strong> "News Line"</strong>,  
                мы будем рады рассмотреть ваше предложение. 
                Присылайте свои материалы на указанный выше email,
                и наша редакционная команда рассмотрит их с интересом.
            </p>

            <br />

            <p className={cls.title_ten}>
                Мы ценим ваше внимание к <strong> "News Line" </strong>
                и стремимся создать долгосрочные отношения с 
                нашими пользователями. Не стесняйтесь обращаться 
                к нам - мы всегда открыты 
                для общения и готовы помочь вам!
            </p>

        </div>
    )
}

export default Contact