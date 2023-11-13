import { Link, useNavigate } from 'react-router-dom';
import { AuthenticationSection } from './Components/AuthenticationSection';
import { ToggleTheme } from './Components/ToggleTheme';
import cls from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate('/');
  };

  return (
    <div className={cls.headerContent}>
      <ToggleTheme />

      <div className={cls.header_text}>
        <Link to="/" onClick={scrollToTop}>
          News Line
        </Link>
      </div>

      <AuthenticationSection />
    </div>
  );
};

export default Header;
