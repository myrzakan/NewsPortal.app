import styles from '../Menu.module.css';

import { Link } from 'react-router-dom';

const AuthButton = ({ closeMenu }) => {
  const handleButtonClick = () => {
    closeMenu();
  };

  return (
    <div className={styles.authButton}>
      <button className={styles.signUp} onClick={handleButtonClick}>
        <Link to="/auth/signup">Sign Up</Link>
      </button>
      <button className={styles.signIn} onClick={handleButtonClick}>
        <Link to="/auth/signin">Sign in</Link>
      </button>
    </div>
  );
};

export default AuthButton;
