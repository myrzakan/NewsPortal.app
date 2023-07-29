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
        <div className='h-[590px]'>
            <div className='bg-[var(--color-text-base)] w-[100%] h-4'></div>
            <div className='flex relative left-[50px] my-[100px] mx-[200px]'>
                <div className='w-[400px] text-center mx-[50px]'>
                    <h3 className='mt-[20px] font-bold text-[var(--color-text)] mb-2'>
                        О нас
                    </h3>
                    <p className='text-[var(--color-text-base)] font-bold'>
                        Мы предлагаем самые свежие новости и актуальную информацию нашим читателям.
                        Наша цель - держать вас в курсе всех событий и происшествий, происходящих в мире.
                    </p>
                </div>

                <div className='mx-[50px]'>
                    <h3 className='mt-[20px] font-bold text-[var(--color-text)] mb-2'>
                        Ссылки
                    </h3>
                    <ul>
                        <li className='flex text-[var(--color-text-base)]'>
                            <AiOutlineArrowRight/>
                            <Link 
                                to='/about'
                                className='text-[var(--color-text)] text-[15px] font-bold ml-[5px] 
                                        hover:text-[var(--color-text-base)]'
                            >
                                О проекте
                            </Link>
                        </li>

                        <li className='flex text-[var(--color-text-base)]'>
                            <AiOutlineArrowRight/>
                            <Link 
                                to='/contact'
                                className='text-[var(--color-text)] text-[15px] font-bold ml-[5px] 
                                        hover:text-[var(--color-text-base)]'
                            >
                                Контакты
                            </Link>
                        </li>

                        <li className='flex text-[var(--color-text-base)]'>
                            <AiOutlineArrowRight/>
                            <Link 
                                to='/termsOfUse'
                                className='text-[var(--color-text)] text-[15px] font-bold ml-[5px] 
                                        hover:text-[var(--color-text-base)]'
                            >
                                Правила использования
                            </Link>
                        </li>

                        <li className='flex text-[var(--color-text-base)]'>
                            <AiOutlineArrowRight/>
                            <Link 
                                to='/advertising'
                                className='text-[var(--color-text)] text-[15px] font-bold ml-[5px] 
                                        hover:text-[var(--color-text-base)]'
                            >
                                Реклама
                            </Link>
                        </li>

                        <li className='flex text-[var(--color-text-base)]'>
                            <AiOutlineArrowRight/>
                            <Link 
                                to='/policy'
                                className='text-[var(--color-text)] text-[15px] font-bold ml-[5px] 
                                        hover:text-[var(--color-text-base)]'
                            >
                                Политика конфиденциальности
                            </Link>
                        </li>

                    </ul>
                </div>

                <div className='mx-[50px]'>
                    <h3 className='mt-[20px] font-bold text-[var(--color-text)] mb-2'>
                        Свяжитесь с нами
                    </h3>
                    <p className='text-[var(--color-text-base)] font-bold'>
                        Телефон: 
                        <span 
                            onClick={handlePhoneClick} 
                            className='text-[var(--color-text)] cursor-pointer hover:underline'
                        > 
                        +996 (500) 002 007
                        </span>
                    </p>

                    <p className='text-[var(--color-text-base)] font-bold'>
                        Email: 
                        <span 
                            onClick={handleEmailClick} 
                            className='text-[var(--color-text)] cursor-pointer hover:underline'
                        >
                            news@line.kg
                        </span>
                    </p>

                    <p className='text-[var(--color-text-base)] font-bold'>
                        Адрес: 
                        <span 
                            onClick={handleAddressClick} 
                            className='text-[var(--color-text)] cursor-pointer hover:underline'
                        >
                            г. Бишкек, проспект Эркиндик 46
                        </span>
                    </p>
                </div>

                <div className='mx-[50px]'>
                    <h3 className='mt-[20px] font-bold text-[var(--color-text)] mb-2'>
                        Мы в социальных сетях
                    </h3>
                    <ul className='flex text-[var(--color-text-base)]'>
                        <li className='mx-2 mt-2'>
                            <a 
                                href="https://www.facebook.com/example" 
                                target="_blank" rel="noopener noreferrer"
                                // className=''
                            >
                                <FaFacebook size='30px'/>
                            </a>
                        </li>
                        <li className='mx-2 mt-2'>
                            <a 
                                href="https://www.twitter.com/example" 
                                target="_blank" rel="noopener noreferrer"
                                // className=''
                            >
                                <FaTwitter size='30px'/>
                            </a>
                        </li>
                        <li className='mx-2 mt-2'>
                            <a 
                                href="https://www.instagram.com/example" 
                                target="_blank" rel="noopener noreferrer"
                            >
                                <FaInstagram size='30px'/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='text-center'>
                <h1 className='text-[var(--color-text-base)] text-[25px] font-bold'>18+</h1>
                <div className='mt-[20px] mb-[50px]'>
                    <p className='m-1 text-[var(--color-text)] font-bold'>
                        © {new Date().getFullYear()} Все права защищены.
                    </p>
                    <p className='m-1 text-[var(--color-text)] font-bold' >
                        Использование материалов разрешено только с письменного разрешения компании.
                    </p>
                    <p className='text-[var(--color-text)] font-bold' >
                        Любое копирование, воспроизведение или распространение контента без разрешения запрещено.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Footer
