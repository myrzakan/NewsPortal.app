import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import cls from './PostDetaills.module.scss';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
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

    const database = firebase.database();
    const postRef = database.ref(`posts/${postId}`);

    postRef.on('value', (snapshot) => {
      const postData = snapshot.val();
      setPost(postData);
    });

    return () => {
      postRef.off();
    };
  }, [postId]);

  if (!post) {
    return <div className={cls.loading}>Loading...</div>;
  }

  const formattedTimestamp = new Date(post.timestamp).toLocaleString();

  return (
    <div className={cls.container}>
      <h2 className={cls.title}>{post.title}</h2>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" className={cls.imgPost} />}
      <p className={cls.discription}>{post.content}</p>
      <p className={cls.category}>Category: {post.category}</p>
      <p className={cls.time}>Timestamp: {formattedTimestamp}</p>
    </div>
  );
};

export default PostDetails;
