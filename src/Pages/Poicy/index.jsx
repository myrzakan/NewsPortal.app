import React from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

import cls from './Policy.module.scss'

const Policy = () => {

    React.useEffect(() => {
        window.scrollTo(0, 0); 
      }, []);


      React.useEffect(() => {
        const animationData = [
          { selector: cls.title_one, delay: 0 },
          { selector: cls.title_two, delay: 0.1 },
          { selector: cls.title_three, delay: 0.2 },
          { selector: cls.title_four, delay: 0.3 },
          { selector: cls.title_five, delay: 0.4 },
          { selector: cls.title_six, delay: 0.5 },
          { selector: cls.title_seven, delay: 0.6 },
          { selector: cls.title_eight, delay: 0.7 },
          { selector: cls.title_nine, delay: 0.8 },
          { selector: cls.title_ten, delay: 0.9 }
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
        <div className={cls.policyContainer}>
            <h1 className={cls.title_one}>Политика конфиденциальности News Line:</h1>

            <br />

            <p className={cls.title_two}>
                Мы в <strong>News Line</strong> ценим вашу конфиденциальность и 
                стремимся обеспечить безопасность и защиту ваших личных данных. 
                Эта политика конфиденциальности объясняет, как мы собираем, используем, защищаем и раскрываем информацию, 
                которую вы предоставляете при использовании нашего сайта.
            </p>

            <br />

            <p className={cls.title_three}>
                <strong>Сбор информации:</strong> <br />
                Мы собираем только ту информацию, которую вы сознательно предоставляете нам, например, 
                при заполнении формы подписки на новости или оставлении комментария. Это может включать ваше имя, 
                адрес электронной почты или другую персональную информацию.
            </p>

            <br />

            <p className={cls.title_four}>
                <strong>Использование информации:</strong> <br />
                Мы используем предоставленную вами информацию для целей, 
                связанных с предоставлением новостной информации, общения с вами и улучшения 
                пользовательского опыта нашего сайта. Мы не продаем, не арендуем и не передаем вашу
                информацию третьим сторонам без вашего явного согласия, за исключением случаев, когда это требуется по закону.
            </p>

            <br />

            <p className={cls.title_five}>
                <strong>Защита информации:</strong> <br />
                Мы принимаем меры для защиты вашей личной информации от
                несанкционированного доступа, использования или разглашения.
                Мы применяем технические и организационные меры безопасности, чтобы обеспечить сохранность ваших данных.
            </p>

            <br />

            <p className={cls.title_six}>
                <strong>Использование файлов cookie:</strong> <br />
                Мы можем использовать файлы cookie, чтобы улучшить ваш опыт использования нашего сайта.
                Файлы cookie являются небольшими текстовыми файлами, которые сохраняются на вашем устройстве
                и позволяют нам анализировать ваше взаимодействие с сайтом, предоставлять персонализированный 
                контент и запоминать ваши предпочтения. Вы можете отключить файлы cookie в настройках своего браузера, 
                но это может повлиять на функциональность сайта.
            </p>
            
            <br />

            <p className={cls.title_seven}>
                <strong>Ссылки на сторонние ресурсы:</strong> <br />
                Наш сайт может содержать ссылки на сторонние веб-сайты, которые имеют 
                свои собственные политики конфиденциальности. Мы не несем ответственности за содержание и 
                действия этих внешних сайтов. Рекомендуется ознакомиться с их политикой конфиденциальности 
                перед предоставлением им своей информации.
            </p>

            <br />

            <p className={cls.title_eight}>
                <strong>Изменения в политике конфиденциальности:</strong> <br />
                Мы можем время от времени вносить изменения в нашу политику конфиденциальности. 
                Любые изменения будут опубликованы на этой странице, и вы будете уведомлены
                о важных изменениях, если это требуется по закону.
            </p>

            <br />

            <p className={cls.title_nine}>
                Если у вас возникнут вопросы или требуется дополнительная информация о нашей политике конфиденциальности,
                пожалуйста, свяжитесь с нами через контактные данные, указанные на странице 
                <Link to='/contact'><span>" Контакты",</span></Link>
            </p>

            <br />

            <p className={cls.title_ten}>
                Мы ценим ваше доверие и гарантируем, что ваша конфиденциальность является нашим приоритетом.
            </p>
            
        </div>
    )
}

export default Policy