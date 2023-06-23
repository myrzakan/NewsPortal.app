import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// <============== Admin Panel =============>
import Authentication from './Admin/Authentication';
import AdminPanel from './Admin/AdminPanel';
// <============ Pages ================>
import PostList from './Pages/PostList';
import PostDetails from './Pages/PostDetails';
import About from './Pages/About';
import Policy from './Pages/Policy';
import Contact from './Pages/Contact';
import Ad from './Pages/Ad';
import TermsOfUse from './Pages/TermsOfUse';
// <============= Components ==================>
import Footer from './Components/Footer/Index';
import Header from './Components/Header';
import BurgerMenu from './BurgerMenu';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/AdminPanel');
  const showHeaderFooter = !isAdminRoute;

  return (
    <div>
      {showHeaderFooter && (
        <>
          <Header />
          <BurgerMenu />
        </>
      )}

      <Routes>
        <Route path="/admin" element={<Authentication />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        {!isAdminRoute && (
          <>
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
