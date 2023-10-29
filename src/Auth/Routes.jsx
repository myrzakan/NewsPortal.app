import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};
