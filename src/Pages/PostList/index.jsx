import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import firebaseConfig from '../../FirebaseConfig';

import cls from './PostList.module.scss';
import logo from '../../Logo/press.png';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firebase.database().ref('posts').once('value');
        const postsData = snapshot.val();
        if (postsData) {
          let postsList = Object.keys(postsData).map((key) => ({
            id: key,
            ...postsData[key],
          }));

          postsList.sort((a, b) => b.timestamp - a.timestamp);

          setPosts(postsList);
          setLoading(false);

          // Получаем список уникальных категорий
          const categoriesSet = new Set(postsList.map((post) => post.category));
          const categoriesList = Array.from(categoriesSet);
          setCategories(categoriesList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className={cls.loading}>
        <img src={logo} alt="logo" />
      </div>
    );
  }

  let filteredPosts = posts;
  if (selectedCategory) {
    filteredPosts = posts.filter((post) => post.category === selectedCategory);
  }

  return (
    <div className={cls.post_container}>
      <h1>Список постов</h1>
      <div className={cls.categories}>
        <button onClick={() => selectCategory(null)}>Все</button>
        {categories.map((category) => (
          <button key={category} onClick={() => selectCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id} className={cls.postlist}>
            {post.imageUrl && <img src={post.imageUrl} alt="Пост" className={cls.postImg} />}
            <p>{new Date(post.timestamp).toLocaleString()}</p>
            <Link to={`/postDetails/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
