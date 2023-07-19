import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminPanel from './Admin/AdminPanel';
import PostList from './Pages/PostList';
import PostDetails from './Pages/PostDetails';
import About from './Pages/About';
import Policy from './Pages/Policy';
import Contact from './Pages/Contact';
import Ad from './Pages/Ad';
import TermsOfUse from './Pages/TermsOfUse';
import { Layout } from './Auth/Layout';
import Footer from './Components/Footer/Index';
import Header from './Components/Header';
import BurgerMenu from './BurgerMenu';

function App() {
  const location = useLocation();
  const showHeaderFooter = !location.pathname.startsWith('/auth');

  return (
    <div>
      {showHeaderFooter && (
        <>
          <Header />
          <BurgerMenu />
        </>
      )}

      <Routes>
        <Route path="/auth/*" element={<Layout />} />
        {showHeaderFooter && (
          <>
            <Route path="/AdminPanel" element={<AdminPanel />} />
            <Route path="/" element={<PostList />} />
            <Route path="/postDetails/:postId" element={<PostDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/termsOfUse" element={<TermsOfUse />} />
            <Route path="/advertising" element={<Ad />} />
            <Route path="/policy" element={<Policy />} />
          </>
        )}
      </Routes>

      {showHeaderFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default App;
