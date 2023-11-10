import { Link } from 'react-router-dom';
import { AuthenticationSection } from './Components/AuthenticationSection';
import { ToggleTheme } from './Components/ToggleTheme';
import cls from './Header.module.scss';

const Header = () => {
  return (
    <div className={cls.headerContent}>
      <ToggleTheme />

      <div className={cls.header_text}>
        <Link to="/">News Line</Link>
      </div>

      <AuthenticationSection />
    </div>
  );
};

export default Header;
