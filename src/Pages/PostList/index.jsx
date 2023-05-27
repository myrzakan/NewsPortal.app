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

  useEffect(() => {
    const database = firebase.database();
    const postsRef = database.ref('posts');

    postsRef.on('value', (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postsList = Object.keys(postsData).map((key) => ({
          id: key,
          ...postsData[key],
        }));
        setPosts(postsList);
      }
    });

    return () => {
      postsRef.off();
    };
  }, []);

  return (
    <div className={cls.post_container}>
      <h1>Post List</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={cls.postlist}>
            <Link to={`/postDetails/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            {post.imageUrl && <img 
            src={post.imageUrl} 
            alt="Post" 
            className={cls.postImg}/>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
