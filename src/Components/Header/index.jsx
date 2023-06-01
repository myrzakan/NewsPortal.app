
import React from 'react'
import { Link } from 'react-router-dom'

import cls from './Header.module.scss'

import Logo from '../../Logo/press.png'



const Header = () => {


    return (
        <div className={cls.headerContainer}>
            <Link to='/'><img src={Logo} alt="logo" /></Link>
            <nav>
                <Link to='/'></Link>
                <Link to='/about' >О проекте</Link>
                <Link to='/contact'>Контакт</Link>
                <Link to='/termsOfUse'>Правило и использование</Link>
                <Link to='/advertising'>Реклама</Link>
                <Link to='/policy'>Политика конфиденциальности</Link>
            </nav>
            <div className={cls.one}></div>
        </div>
    )
}

export default Header