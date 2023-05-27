import React from 'react';
import { Routes, Route } from 'react-router-dom' 
import AdminPanel from './Admin/AdminPanel';
import PostList from './Pages/PostList';
import PostDetails from './Pages/PostDetails';


function App() {
  return (
    <Routes>
      <Route path='/admin' element={<AdminPanel />} />
      <Route path='/' element={<PostList />} />
      <Route path='/postDetails/:postId' element={<PostDetails />} />
    </Routes>
  );
}

export default App;
