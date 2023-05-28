import React from 'react';
import { Routes, Route } from 'react-router-dom' 
import AdminPanel from './Admin/AdminPanel';
import PostList from './Pages/PostList';
import PostDetails from './Pages/PostDetails';
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
    <Routes>
      <Route path='/admin' element={<AdminPanel />} />
      <Route path='/' element={<PostList />} />
      <Route path='/postDetails/:postId' element={<PostDetails />} />
    </Routes>

    <ToastContainer />

    </div>

  );
}

export default App;
