import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPanel from './Admin/AdminPanel';
import PostList from './Pages/PostList';
import PostDetails from './Pages/PostDetails';
import { ToastContainer } from 'react-toastify';
import Header from './Components/Header';
import Footer from './Components/Footer/Index';

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
        <Route
          path="/admin"
          element={
            <>
              {isLoading ? null : <AdminPanel />}
            </>
          }
        />  
        <Route path="/"
          element={
            <>
              <Header />
              {isLoading ? null : <PostList />}
              {isLoading ? null : <Footer />} 
            </>
          }
        />
        <Route path="/postDetails/:postId"
          element={
            <>
              <Header />
              {isLoading ? null : <PostDetails />}
              {isLoading ? null : <Footer />} 
            </>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
