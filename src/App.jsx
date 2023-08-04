import BurgerMenu from 'BurgerMenu'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import { ToastContainer } from 'react-toastify'

import AdminPanel from './Admin/AdminPanel'
import { AuthRoutes } from './Auth/Routes'
import Footer from './Components/Footer/Index.jsx'
import Header from './Components/Header'
import NotFound from './NotFound'
import About from './Pages/About'
import Ad from './Pages/Ad'
import Contact from './Pages/Contact'
import PostDetails from './Pages/Main/PostDetails'
import PostList from './Pages/Main/PostList'
import Policy from './Pages/Policy'
import TermsOfUse from './Pages/TermsOfUse'

import  './styledToast/index.css'


function App() {
  return (
    <div>
      <ToastProvider placement="top-center">
        <Header />
        <BurgerMenu />

        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
          <Route path="/" element={<PostList />} />
          <Route path="*" element={<NotFound/>}/>
          <Route path="/postDetails/:postId" element={<PostDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/termsOfUse" element={<TermsOfUse />} />
          <Route path="/advertising" element={<Ad />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
      </ToastProvider>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
