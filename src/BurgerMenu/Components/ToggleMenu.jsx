import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import styles from '../Menu.module.css';

export const ToggleMenu = ({ showMenu, toggleMenu }) => {
  return (
    <div
      onClick={toggleMenu}
      className="cursor-pointer z-10 fixed top-[3rem] left-[1rem]"
    >
      {showMenu ? (
        <AiOutlineClose className={styles.outlineClose} />
      ) : (
        <AiOutlineMenu className={styles.outlineMenu} />
      )}
    </div>
  );
};
