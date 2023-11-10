import { RiUserHeartFill, RiUserHeartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import './ProfileMenu';

export const AuthButton = () => {
  const currentTheme = useSelector(state => state.theme.currentTheme);

  return (
    <div className="authButton">
      <Link to="../../../Auth/SignUp">
        {currentTheme === 'light' ? (
          <RiUserHeartLine size="24px" />
        ) : (
          <RiUserHeartFill size="24px" />
        )}
      </Link>
    </div>
  );
};
