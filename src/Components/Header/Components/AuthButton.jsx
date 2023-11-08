import { RiUserHeartFill, RiUserHeartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import './ProfileMenu';

export const AuthButton = theme => {
  return (
    <div className="authButton">
      <Link to="../../../Auth/SignUp">
        {theme === 'light' ? (
          <RiUserHeartLine size="24px" />
        ) : (
          <RiUserHeartFill size="24px" className="object-cover" />
        )}
      </Link>
    </div>
  );
};
