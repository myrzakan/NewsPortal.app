import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ToastProvider } from 'react-toast-notifications'
import AdminPanel from './Admin/AdminPanel';
import PostList from './Pages/PostList';
import PostDetails from './Pages/PostDetails';
import About from './Pages/About';
import Policy from './Pages/Policy';
import Contact from './Pages/Contact';
import Ad from './Pages/Ad';
import TermsOfUse from './Pages/TermsOfUse';
import { AuthRoutes } from './Auth/Routes';
import Footer from './Components/Footer/Index';
import Header from './Components/Header';
import './styledToast/index.css'

// import BurgerMenu from './BurgerMenu';

function App() {
  return (
    <div>
      <Header />
      {/* <BurgerMenu /> */}

      <ToastProvider placement="top-center">
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
          <Route path="/" element={<PostList />} />
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
  );
}

export default App;
