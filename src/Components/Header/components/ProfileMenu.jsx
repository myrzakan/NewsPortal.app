import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { removeAdmin } from 'store/slices/useAdminSlice';
import { removeUser } from 'store/slices/userSlice';
import { clearGoogleUserData } from 'store/slices/useGoogleSlice';
import { useToasts } from 'react-toast-notifications';

export const ProfileSection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const google = useSelector((state) => state.google)
  const admin = useSelector((state) => state.admin)
  const { addToast } = useToasts();



  const onSignOut = () => {
    dispatch(removeUser())
    dispatch(clearGoogleUserData())
    // dispatch(removeAdmin())
    // auth.signOut()
    addToast(`Вы вышли из аккацнта ${google.displayName || user.name}`, {
      appearance: 'warning',
      autoDismiss: 'true'
    })

 
 

  };

  return (
    <div className='flex items-center justify-end mr-16 mb-[-9px]'>
      <div>
        <p>{google.displayName || user.name}</p>
        <p>{google.email || user.email}</p>
      </div>
      <div>
        <FiLogOut onClick={onSignOut} size="25px" className='cursor-pointer text-[var(--color-text-base)] ml-8'/>
      </div>  
    </div>
  );
};


