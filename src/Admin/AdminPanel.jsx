import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import CreatePostForm from './CreatePosts';
import CreateCategory from './CreateCategory';
import DeletePosts from './DeletePosts';
import DeleteCategory from './DeleteCategory';

const firebaseConfig = {
  // Настройки конфигурации Firebase
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
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const database = firebase.database();
    const categoriesRef = database.ref('categories');
    const postsRef = database.ref('posts');

    // Получение списка категорий из базы данных при загрузке компонента
    categoriesRef.on('value', (snapshot) => {
      const categoriesData = snapshot.val();
      if (categoriesData) {
        const categoriesList = Object.keys(categoriesData).map((key) => ({
          id: key,
          ...categoriesData[key],
        }));
        setCategories(categoriesList);
      }
    });

    // Получение списка постов из базы данных при загрузке компонента
    postsRef.on('value', (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postsList = Object.keys(postsData).map((key) => ({
          id: key,
          ...postsData[key],
        }));

        postsList.sort((a, b) => b.timestamp - a.timestamp);

        setPosts(postsList);
      }
    });

    // Отписка от обновлений базы данных при размонтировании компонента
    return () => {
      categoriesRef.off();
      postsRef.off();
    };
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <CreatePostForm categories={categories} />
      <CreateCategory />
      <DeletePosts posts={posts} />
      <DeleteCategory categories={categories} />
    </div>
  );
};

export default AdminPanel;
