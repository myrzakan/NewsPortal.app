import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

import logo from '../../Logo/free-icon-18-3564251.png'
import cls from './Footer.module.scss'

const Footer = () => {

    const handlePhoneClick = () => {
        window.location.href = 'tel:+996500002007';
      };
    
    const handleEmailClick = () => {
        window.location.href = 'mailto:news@line.kg';
    };

    const handleAddressClick = () => {
        window.location.href = 'https://www.google.com/maps/search/?api=1&query=г.+Бишкек, проспект Эркиндик 46';
    };



    return (
        <div className={cls.footerContainer}>
            <div className={cls.one}></div>
            <div className={cls.container}>
                <div className={cls.f_about}>
                    <h3>О нас</h3>
                    <p>
                        Мы предлагаем самые свежие новости и актуальную информацию нашим читателям.
                        Наша цель - держать вас в курсе всех событий и происшествий, происходящих в мире.
                    </p>
                </div>

                <div className={cls.f_links}>
                    <h3>Ссылки</h3>
                    <ul>
                        {/* <li>
                            <AiOutlineArrowRight/>
                            <Link to='/'>Главная</Link>
                        </li> */}
                        <li>
                            <AiOutlineArrowRight/>
                            <Link to='/about'>О проекте</Link>
                        </li>
                        <li>
                            <AiOutlineArrowRight/>
                            <Link to='/contact'>Контакты</Link>
                        </li>
                        <li>
                            <AiOutlineArrowRight/>
                            <Link to='/termsOfUse'>Правила использования</Link>
                        </li>
                        <li>
                            <AiOutlineArrowRight/>
                            <Link to='/advertising'>Реклама</Link>
                        </li>
                        <li>
                            <AiOutlineArrowRight/>
                            <Link to='/policy'>Политика конфиденциальности</Link>
                        </li>
                    </ul>
                </div>

                <div className={cls.contact}>
                    <h3>Свяжитесь с нами</h3>
                    <p>
                        Телефон: 
                        <span 
                            onClick={handlePhoneClick} 
                            className={cls.clickableText}> +996 (500) 002 007
                        </span>
                    </p>

                    <p>
                        Email: 
                        <span 
                            onClick={handleEmailClick} 
                            className={cls.clickableText}> news@line.kg
                        </span>
                    </p>

                    <p>
                        Адрес: 
                        <span 
                            onClick={handleAddressClick} 
                            className={cls.clickableText}> г. Бишкек, проспект Эркиндик 46
                        </span>
                    </p>
                </div>

                <div className={cls.social}>
                    <h3>Мы в социальных сетях</h3>
                    <ul>
                        <li>
                            <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">
                                <FaFacebook />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.twitter.com/example" target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cls.copyRight}>
                {/* <img src={logo} alt="logo" /> */}
                <h1>18+</h1>
                <div>
                    <p>© {new Date().getFullYear()} Все права защищены.</p>
                    <p>Использование материалов разрешено только с письменного разрешения компании.</p>
                    <p>Любое копирование, воспроизведение или распространение контента без разрешения запрещено.</p>
                </div>
            </div>

        </div>
    )
}

export default Footer
