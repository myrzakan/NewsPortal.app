import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
// import NotFound from 'components/NotFound'


export const Layout = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      {/* <Route path="*" element={<NotFound/>}/> */}
    </Routes>
  )
}