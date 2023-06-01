

import React from 'react'

import cls from './Footer.module.scss'

const Footer = () => {

    return (
        <div className={cls.footerContainer}>
            <div className={cls.one}></div>
            <div className={cls.container}>
                <div className={cls.f_about}>
                    <h3>about</h3>
                    <p>Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Текстов заманивший рыбными рот</p>
                </div>
                {/* <===== end =====> */}

                <div className={cls.f_links}>
                    <h3>Links</h3>
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>

            </div>

        </div>
    )


    
}

export default Footer