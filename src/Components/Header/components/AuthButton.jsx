import { Box, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RiUserHeartLine, RiUserHeartFill } from 'react-icons/ri'

import './ProfileMenu'

export const AuthButton = (theme) => {
  return (
    <div className="authButton">
      <Link to="../../../Auth/SignUp">
        {theme === 'light' ? <RiUserHeartLine size="24px"/>
          : <RiUserHeartFill size="24px"  className="object-cover"/>}
      </Link>
    </div>
  )
}
