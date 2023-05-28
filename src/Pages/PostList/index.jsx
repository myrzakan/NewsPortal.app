import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import cls from './PostList.module.scss';

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

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const database = firebase.database();
    const postsRef = database.ref('posts');
    const categoriesRef = database.ref('categories');

    // Получаем список постов
    postsRef.on('value', (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        let postsList = Object.keys(postsData).map((key) => ({
          id: key,
          ...postsData[key],
        }));

        if (selectedCategory) {
          postsList = postsList.filter((post) => post.category === selectedCategory);
        }

        setPosts(postsList);
      }
    });

    // Получаем список категорий

    categoriesRef.on('value', (snapshot) => {
      const categoriesData = snapshot.val();
      if (categoriesData) {
        const categoriesList = Object.entries(categoriesData).map(([categoryId, category]) => ({
          id: categoryId,
          name: category.name,
        }));
        setCategories(categoriesList);
      }
    });

    return () => {
      postsRef.off();
      categoriesRef.off();
    };
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className={cls.post_container}>
      <h1>Список постов</h1>
      <div className={cls.categoryButtons}>
        <button onClick={() => setSelectedCategory('')}>Все</button>
        {categories.map((category) => (
          <button key={category.id} onClick={() => handleCategoryClick(category.id)}>
            {category.name}
          </button>
        ))}
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={cls.postlist}>
            <Link to={`/postDetails/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            {post.imageUrl && <img src={post.imageUrl} alt="Пост" className={cls.postImg} />}
            <p>Категория: {post.category}</p>
            <p>Время: {new Date(post.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
