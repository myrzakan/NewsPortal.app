import { auth } from 'FirebaseConfig';
import 'boxicons';
import { getDatabase, onValue, ref } from 'firebase/database';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { clearGoogleUserData } from 'store/slices/useGoogleSlice';
import { removeUser } from 'store/slices/userSlice';
import styles from '../Menu.module.css';

export const Profile = ({ closeMenu }) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const user = useSelector(state => state.user);
  const google = useSelector(state => state.google);

  // console.log(user);
  // console.log(google);

  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const database = getDatabase();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      onValue(userRef, snapshot => {
        const data = snapshot.val();
        setUserData(data);
      });
    }
  }, []);

  const onSignOut = () => {
    dispatch(removeUser());
    dispatch(clearGoogleUserData());
    auth.signOut();
    addToast(
      `Вы вышли из аккаунта ${
        google.displayName || user.name || userData?.username
      }`,
      {
        appearance: 'warning',
        autoDismiss: true,
      },
    );

    closeMenu();

    localStorage.removeItem('user');
    localStorage.removeItem('google');
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileText_auth}>
        <p>{google.displayName || user.name || userData?.username}</p>
        <p>{google.email || user.email}</p>
      </div>
      <button onClick={onSignOut} className={styles.button_out}>
        <box-icon
          name="exit"
          size="30px"
          type="solid"
          animation="tada"
          color="var(--color-text-base)"
        ></box-icon>
      </button>
    </div>
  );
};
