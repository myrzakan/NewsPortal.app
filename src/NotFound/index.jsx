import React from "react"
import { Link } from "react-router-dom"


const NotFound = () => {
  return(
    
    <div className='mb-[30rem] pt-[40rem] relative left-[40rem] bottom-[14rem] text-[30px] w-[800px]'>
      <p className="text-[70px] relative left-[16rem]">404</p>
      Страница не найдена вернитесь <Link to='/' className="text-[var(--color-text-base)] hover:underline">Главный меню</Link>
    </div>
  )

}

export default NotFound