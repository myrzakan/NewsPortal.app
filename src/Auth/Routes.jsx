import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import { AdminLogin } from './SinginAdmin'
// import NotFound from 'components/NotFound'


export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path='/admin' element={<AdminLogin/>}/>
      {/* <Route path="*" element={<NotFound/>}/> */}
    </Routes>
  )
} 