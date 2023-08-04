import React, { useEffect } from 'react'
import { BsSun, BsMoon } from 'react-icons/bs'
import { MdOutlineAdminPanelSettings, MdAdminPanelSettings } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { setGoogleUserData } from 'store/slices/useGoogleSlice'
import { setUser } from 'store/slices/userSlice'

import { AuthButton } from './components/AuthButton'
import { ProfileSection } from './components/ProfileMenu'
import Blue from '../../Logo/Logo_blue.png'
import Green from '../../Logo/Logo_green.png'
import { loadUserFromLocalStorage, loadGoogleUserDataFromLocalStorage } from '../../utils/LocalStorage'



const Header = () => {
  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme || 'light'
  })

  const dispatch = useDispatch()
  const { addToast } = useToasts()

  useEffect(() => {
    const localUser = loadUserFromLocalStorage()
    const localGoogleUserData = loadGoogleUserDataFromLocalStorage()
    if (localUser) {
      dispatch(setUser(localUser))
    }
    if (localGoogleUserData) {
      dispatch(setGoogleUserData(localGoogleUserData))
    }
  }, [dispatch])

  const Google = useSelector((state) => state.google)
  const User = useSelector((state) => state.user)
  // console.log(User)
  // console.log(Google)

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="w-[100%] h-[110px] bg-[var(--color-bg)] fixed top-0 z-[3] transition-all duration-3000">

      <div onClick={toggleTheme} className="relative left-[76%] top-[39px] transform -translate-x-[-50%]  cursor-pointer w-1">
        {theme === 'light' ? <BsMoon size="22px" /> : <BsSun size="22px" />}
      </div>

      <Link to="/">
        <div className="absolute left-[0%] top-[-25px] w-[250px] h-[120px]
          pt-[10px] z-0 object-cover transform -translate-x-[-50%] 2xl:left-[35%] xl:left-[32%]
          lg:left-[30%] md:left-[24%] max-md:left-[15%] max-sm:left-[10%] max-sd:left-[5%] max-md:top-[-20px] max-xs:left-[-18%]">
          <img
            className="w-full h-full object-cover max-sd:w-[180px] max-xs:w-[160px] relative left-[30px]"
            src={theme === 'light' ? Blue : Green}
            alt="logo"
          />
        </div>
      </Link>

      {User.isAuthenticated || Google.isAuthenticated ? (
        <ProfileSection addToast={addToast} />
      ) : (
        <AuthButton theme={theme} />
      )}

      <div className="bg-[var(--color-text-base)] w-[100%] h-[15px] relative top-[40px]"></div>
    </div>
  )
}

export default Header
