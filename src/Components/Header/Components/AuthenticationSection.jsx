import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { setGoogleUserData } from 'store/slices/useGoogleSlice';
import { setUser } from 'store/slices/userSlice';

import {
  loadGoogleUserDataFromLocalStorage,
  loadUserFromLocalStorage,
} from '../../../utils/LocalStorage.jsx';

import { AuthButton } from './AuthButton';
import { ProfileSection } from './ProfileMenu';

export const AuthenticationSection = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  React.useEffect(() => {
    const localUser = loadUserFromLocalStorage();
    const localGoogleUserData = loadGoogleUserDataFromLocalStorage();
    if (localUser) {
      dispatch(setUser(localUser));
    }
    if (localGoogleUserData) {
      dispatch(setGoogleUserData(localGoogleUserData));
    }
  }, [dispatch]);

  const Google = useSelector(state => state.google);
  const User = useSelector(state => state.user);
  // console.log(User)
  // console.log(Google)

  return (
    <div>
      {User.isAuthenticated || Google.isAuthenticated ? (
        <ProfileSection addToast={addToast} />
      ) : (
        <AuthButton theme={theme} />
      )}
    </div>
  );
};
