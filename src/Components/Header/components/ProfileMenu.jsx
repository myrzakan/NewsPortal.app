import { getDatabase, ref, onValue } from 'firebase/database'
import { auth } from 'FirebaseConfig'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { clearGoogleUserData, setGoogleUserData } from 'store/slices/useGoogleSlice'
import { removeUser } from 'store/slices/userSlice'
import './Profile.css'

export const ProfileSection = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const google = useSelector((state) => state.google)
  const { addToast } = useToasts()

  const [userData, setUserData] = React.useState(null)

  React.useEffect(() => {
    const database = getDatabase()
    const currentUser = auth.currentUser

    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`)
      onValue(userRef, (snapshot) => {
        const data = snapshot.val()
        setUserData(data)
      })
    }
  }, [])

  const onSignOut = () => {
    dispatch(removeUser())
    dispatch(clearGoogleUserData())
    auth.signOut()
    addToast(`Вы вышли из аккаунта ${google.displayName || user.name || userData?.username}`, {
      appearance: 'warning',
      autoDismiss: true,
    })

    localStorage.removeItem('user')
    localStorage.removeItem('google')
  }


  return (
    <div className="">
      <div>
        <p>{google.displayName || user.name || userData?.username}</p>
        <p>{google.email || user.email}</p>
      </div>
      <div>
        <FiLogOut onClick={onSignOut} size="25"/>
      </div>
    </div>
  )
}
