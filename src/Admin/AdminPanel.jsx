import React, { useState } from 'react';
import firebase from 'firebase/compat/app';

import 'firebase/compat/database';

import cls from './Admin.module.scss'

// Инициализация Firebase
const firebaseConfig = {
  // Ваши настройки конфигурации Firebase
  apiKey: "AIzaSyCxHT4bGzaKIl8DYK-qwWPuKJAPqlMgaOg",
  authDomain: "press-e5741.firebaseapp.com",
  databaseURL: "https://press-e5741-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "press-e5741",
  storageBucket: "press-e5741.appspot.com",
  messagingSenderId: "325042443581",
  appId: "1:325042443581:web:96832ff63420bda07a6154"

};

firebase.initializeApp(firebaseConfig);

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const database = firebase.database();
    const postsRef = database.ref('posts');

    const newPostRef = postsRef.push();
    const newPost = {
      title: title,
      content: content,
    };

    newPostRef.set(newPost)
      .then(() => {
        setTitle('');
        setContent('');
        console.log('Post created successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cls.admin_container}>
      <h1>Admin Panel</h1>
      <div>
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea id="content" value={content} onChange={handleContentChange} />
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
