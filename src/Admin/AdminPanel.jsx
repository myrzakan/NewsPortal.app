import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

import cls from './Admin.module.scss';

const firebaseConfig = {
  // Ваши настройки конфигурации Firebase
  apiKey: "AIzaSyCxHT4bGzaKIl8DYK-qwWPuKJAPqlMgaOg",
  authDomain: "press-e5741.firebaseapp.com",
  databaseURL: "https://press-e5741-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "press-e5741",
  storageBucket: "press-e5741.appspot.com",
  messagingSenderId: "325042443581",
  appId: "1:325042443581:web:96832ff63420bda07a6154"
  // ...
};

firebase.initializeApp(firebaseConfig);

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child('images');

    if (image) {
      const imageRef = imagesRef.child(image.name);
      imageRef.put(image)
        .then(() => imageRef.getDownloadURL())
        .then((imageUrl) => {
          const database = firebase.database();
          const postsRef = database.ref('posts');

          const newPostRef = postsRef.push();
          const newPost = {
            title: title,
            content: content,
            imageUrl: imageUrl,
            category: category,
            timestamp: Date.now(),
          };

          newPostRef.set(newPost)
            .then(() => {
              setTitle('');
              setContent('');
              setImage(null);
              setCategory('');
              alert('Post created successfully')
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('Please select an image');
    }
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
          <div>
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" value={category} onChange={handleCategoryChange} />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" onChange={handleImageChange} />
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
