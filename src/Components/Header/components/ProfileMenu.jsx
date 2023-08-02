import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { removeAdmin } from 'store/slices/useAdminSlice'
import { removeUser } from 'store/slices/userSlice'
import { clearGoogleUserData, setGoogleUserData } from 'store/slices/useGoogleSlice'
import { useToasts } from 'react-toast-notifications'
import { auth } from 'FirebaseConfig'
import { setUser } from 'store/slices/userSlice' // Импортируем ваш action creator для сохранения данных пользователя в redux
import { loadUserFromLocalStorage, loadGoogleUserDataFromLocalStorage } from '../../../utils/LocalStorage' // Импортируем функцию для загрузки данных из localStorage
import { getDatabase, ref, onValue } from 'firebase/database'

export const ProfileSection = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const google = useSelector((state) => state.google)
  const { addToast } = useToasts()

  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const database = getDatabase();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
    }
  }, []);

  const onSignOut = () => {
    dispatch(removeUser())
    dispatch(clearGoogleUserData())
    // dispatch(removeAdmin());
    auth.signOut()
    addToast(`Вы вышли из аккаунта ${google.displayName || user.name || userData?.username}`, {
      appearance: 'warning',
      autoDismiss: true,
    })

    localStorage.removeItem('user')
    localStorage.removeItem('google')
  }


  return (
    <div className="flex items-center justify-end mr-16 mb-[-9px]">
      <div>
        <p>{google.displayName || user.name || userData?.username}</p>
        <p>{google.email || user.email}</p>
      </div>
      <div>
        <FiLogOut onClick={onSignOut} size="25px" className="cursor-pointer text-[var(--color-text-base)] ml-8"/>
      </div>
    </div>
  )
}
