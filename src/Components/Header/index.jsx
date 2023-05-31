
import React from 'react'
import { Link } from 'react-router-dom'

import cls from './Header.module.scss'

import Logo from '../../Logo/press.png'



const Header = () => {


    return (
        <div className={cls.headerContainer}>
            <Link to='/'><img src={Logo} alt="logo" /></Link>
            <nav>
                <Link to='/'>Главная</Link>
                

            </nav>
            <div className={cls.one}></div>
        </div>
    )
}

export default Header