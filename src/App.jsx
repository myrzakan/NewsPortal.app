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
              {isLoading ? null : <Header />}
              {isLoading ? null : <PostList />}
              {isLoading ? null : <Footer />}
            </>
          }
        /> {/* <=== PostDetals ===> */}
        <Route path="/postDetails/:postId"
          element={
            <>
              {isLoading ? null : <Header />}
              {isLoading ? null : <PostDetails />}
              {isLoading ? null : <Footer />}
            </>
          }
        /> {/* <=== end ===> */}

         {/* <=== About ===> */}
         <Route path="/about"
          element={
            <>
              {isLoading ? null : <Header />}
              {isLoading ? null : <About />}
              {isLoading ? null : <Footer />}
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Contact ===> */}
         <Route path="/contact"
          element={
            <>
              {isLoading ? null : <Header />}
              {isLoading ? null : <Contact />}
              {isLoading ? null : <Footer />}
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Terms of Use ===> */}
         <Route path="/termsOfUse"
          element={
            <>
              {isLoading ? null : <Header />}
              {isLoading ? null : <TermsOfUse />}
              {isLoading ? null : <Footer />}
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Advertising ===> */}
         <Route path="/advertising"
          element={
            <>
              {isLoading ? null : <Header />}
              {isLoading ? null : <Ad />}
              {isLoading ? null : <Footer />}
            </>
          }
        /> {/* <=== end ===> */}


         {/* <=== Policy ===> */}
         <Route path="/policy"
          element={
            <>
              {isLoading ? null : <Header />}
              {isLoading ? null : <Policy />}
              {isLoading ? null : <Footer />}
            </>
          }
        /> {/* <=== end ===> */}

      </Routes>


      <ToastContainer />
    </div>
  );
}

export default App;
