import React from 'react'

import cls from './Contact.module.scss'

const Contact = () => {

    React.useEffect(() => {
        window.scrollTo(0, 0); // Прокручиваем страницу в начало при монтировании компонента
      }, []);


    return (
        <div className={cls.contactContainer}>
            <h1>Контакты News Line:</h1>

            <br />

            <p>
                Мы ценим ваши вопросы, отзывы и предложения. Наша команда всегда готова 
                общаться с вами и помочь вам в любых вопросах, 
                связанных с проектом <strong>"News Line". </strong>
                Мы стремимся предоставлять вам актуальные новости и интересную информацию из разных сфер жизни.
            </p>

            <br />

            <p>
                Если у вас возникли вопросы о нашем контенте, функциональности сайта, 
                рекламных возможностях или сотрудничестве, пожалуйста, не стесняйтесь связаться с нами. 
                Мы готовы ответить на ваши вопросы и предоставить вам необходимую поддержку.
            </p>

            <br />

            <p>Вы можете связаться с нами по следующим контактным данным:</p>
            
            <br />

            <p><span>Телефон: </span>+996 (500) 002 007</p>

            <br />

            <p><span>Emali: <strong>news@line.kg</strong></span></p> 

            <br />

            <p><span>Адрес</span>г. Бишкек, проспект Эркиндик 46</p>

            <br />

            <p>
                Наша команда службы поддержки пользователей работает для вас и готова помочь вам в любое время. 
                Мы стремимся обеспечить высокий уровень обслуживания и оперативно реагировать на ваши запросы.
            </p>

            <br />

            <p>
                Если у вас есть интересные новости, статьи или медиаматериалы, которые вы бы хотели предложить
                для публикации на <strong> "News Line", </strong> 
                мы будем рады рассмотреть ваше предложение. 
                Присылайте свои материалы на указанный выше email, и наша редакционная команда рассмотрит их с интересом.
            </p>

            <br />

            <p>
                Мы ценим ваше внимание к <strong> "News Line" </strong>
                и стремимся создать долгосрочные отношения с 
                нашими пользователями. Не стесняйтесь обращаться к нам - мы всегда открыты 
                для общения и готовы помочь вам!
            </p>

         

        </div>
    )
}

export default Contact