import { Box, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RiUserHeartLine, RiUserHeartFill } from 'react-icons/ri'

export const AuthButton = (theme) => {
  return (
    <div className="relative left-[113rem] top-[15px] cursor-pointer h-0 w-0 mb-10">
      <Link to="../../../Auth/SignUp">
        {theme === 'light' ? <RiUserHeartLine size="24px"/>
          : <RiUserHeartFill size="24px"  className="object-cover"/>}
      </Link>
    </div>
  )
}
