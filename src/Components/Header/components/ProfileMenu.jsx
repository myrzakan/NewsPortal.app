import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { removeAdmin } from 'store/slices/useAdminSlice';
import { removeUser } from 'store/slices/userSlice';

export const ProfileSection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const google = useSelector((state) => state.google)
  const admin = useSelector((state) => state.admin)



  const onSignOut = () => {
    dispatch(removeUser())
    dispatch(removeAdmin())

  };

  return (
    <div className='flex items-center justify-end mr-16'>
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
      <div>
        <FiLogOut onClick={onSignOut} size="25px" className='cursor-pointer text-[var(--color-text-base)] ml-8'/>
      </div>
    </div>
  );
};


