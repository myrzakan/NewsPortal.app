import React, { useState, useEffect } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { CSSTransition } from 'react-transition-group'
import styles from './Menu.module.css' // Import Menu.module.css

const BurgerMenu = () => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    // Функция для блокировки или разблокировки скролла при открытом меню
    const handleScrollLock = () => {
      if (showMenu) {
        // Заблокировать скролл на заднем фоне
        document.body.style.overflow = 'hidden'
      } else {
        // Разблокировать скролл на заднем фоне
        document.body.style.overflow = 'auto'
      }
    }

    // Вызовем функцию при открытии/закрытии меню
    handleScrollLock()

    // Возвращаем функцию для очистки эффекта после размонтирования компонента
    return () => {
      // Восстанавливаем скролл после размонтирования
      document.body.style.overflow = 'auto'
    }
  }, [showMenu])

  return (
    <nav className="md:hidden z-20">
      <div
        onClick={toggleMenu}
        className="cursor-pointer z-10 fixed top-9 left-3"
      >
        {showMenu ? <AiOutlineClose size={30} /> : <AiOutlineMenu  className='text-[30px] max-xs:text-[20px] max-sd:text-[26px]'/>}
      </div>
      <CSSTransition
        in={showMenu}
        timeout={300}
        classNames={{
          enter: styles['menu-list-enter'],
          enterActive: styles['menu-list-enter-active'],
          exit: styles['menu-list-exit'],
          exitActive: styles['menu-list-exit-active'],
        }}
        unmountOnExit
      >
        <div className={styles['menu-background']}>
          <ul className="fixed top-[200px] w-full h-full z-10 pt-10 mt-[-83px]">
            <li>О проекте</li>
            <li>Контакты</li>
            <li>Правило использования</li>
            <li>Реклама</li>
            <li>Политика конфиденциальности</li>
          </ul>
        </div>
      </CSSTransition>
    </nav>
  )
}

export default BurgerMenu
