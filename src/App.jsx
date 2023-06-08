import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// <============== Admin Panel =============>
import Authentication from './Admin/Authentication';

import AdminPanel from './Admin/AdminPanel'

// <============ Pages ================>
import PostList from './Pages/PostList';
import PostDetails from './Pages/PostDetails';
import About from './Pages/About';
import Policy from './Pages/Poicy';
import Contact from './Pages/Contact';
import Ad from './Pages/Ad';
import TermsOfUse from './Pages/TermsOfUse';

// <============= Components ==================>
import Footer from './Components/Footer/Index';
import Header from './Components/Header';

function App() {



  return (
    <div>
      <Routes>

        {/* <=== Admin Panel ===> */}
        <Route
          path="/admin"
          element={
            <>
              <Authentication />
            </>
          }
        />  {/* <=== end ===> */}

        {/* <=== Admin Panel ===> */}
        <Route
          path="/AdminPanel"
          element={
            <>
              <AdminPanel />
            </>
          }
        />  {/* <=== end ===> */}

        {/* <=== Postlist ===> */}
        <Route path="/"
          element={
            <>
              <Header />
              <PostList />
              <Footer />
            </>
          }
        /> {/* <=== PostDetals ===> */}
        <Route path="/postDetails/:postId"
          element={
            <>
              <Header />
              <PostDetails />
              <Footer />
            </>
          }
        /> {/* <=== end ===> */}

         {/* <=== About ===> */}
         <Route path="/about"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Contact ===> */}
         <Route path="/contact"
          element={
            <>
              <Header />
              <Contact />
              <Footer />
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Terms of Use ===> */}
         <Route path="/termsOfUse"
          element={
            <>
              <Header />
              <TermsOfUse />
              <Footer />
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Advertising ===> */}
         <Route path="/advertising"
          element={
            <>
              <Header />
              <Ad />
              <Footer />
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Policy ===> */}
         <Route path="/policy"
          element={
            <>
              <Header />
              <Policy />
              <Footer />
            </>
          }
        /> {/* <=== end ===> */}

      </Routes>


      <ToastContainer />
    </div>
  );
}

export default App;
