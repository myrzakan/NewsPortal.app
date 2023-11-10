import { useSelector } from 'react-redux';
import styles from '../Menu.module.css';
import AuthButton from './AuthButton';
import { Profile } from './Profile';

export const AuthenticationBurgerMenu = ({ closeMenu }) => {
  const Google = useSelector(state => state.google);
  const User = useSelector(state => state.user);

  return (
    <div className={styles.auth}>
      {User.isAuthenticated || Google.isAuthenticated ? (
        <Profile />
      ) : (
        <AuthButton closeMenu={closeMenu} />
      )}
    </div>
  );
};
