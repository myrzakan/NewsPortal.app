import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// <============== Admin Panel =============>
import AdminPanel from './Admin/AdminPanel';


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
  const [isLoading, setIsLoading] = useState(true); // Добавлено состояние isLoading

  useEffect(() => {
    // Имитация задержки загрузки данных (может быть заменена на реальный код загрузки)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Routes>

        {/* <=== Admin Panel ===> */}
        <Route
          path="/admin"
          element={
            <>
              {isLoading ? null : <AdminPanel />}
            </>
          }
        />  {/* <=== end ===> */}

        {/* <=== Postlist ===> */}
        <Route path="/"
          element={
            <>
              <Header />
              {isLoading ? null : <PostList />}
              <Footer />
            </>
          }
        /> {/* <=== PostDetals ===> */}
        <Route path="/postDetails/:postId"
          element={
            <>
              <Header />
              {isLoading ? null : <PostDetails />}
              <Footer />
            </>
          }
        /> {/* <=== end ===> */}

         {/* <=== About ===> */}
         <Route path="/about"
          element={
            <>
              <Header />
              {isLoading ? null : <About />}
              <Footer />
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Contact ===> */}
         <Route path="/contact"
          element={
            <>
              <Header />
              {isLoading ? null : <Contact />}
              <Footer />
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Terms of Use ===> */}
         <Route path="/termsOfUse"
          element={
            <>
              <Header />
              {isLoading ? null : <TermsOfUse />}
              <Footer />
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Advertising ===> */}
         <Route path="/advertising"
          element={
            <>
              <Header />
              {isLoading ? null : <Ad />}
              <Footer />
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Policy ===> */}
         <Route path="/policy"
          element={
            <>
              <Header />
              {isLoading ? null : <Policy />}
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
