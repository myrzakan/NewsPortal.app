import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import firebaseConfig from '../../FirebaseConfig';

import cls from './PostDetaills.module.scss';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

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

  useEffect(() => {
    window.scrollTo(0, 0); // Прокручиваем страницу в начало при монтировании компонента
  }, []);

  if (!post) {
    return <div className={cls.loading}>Loading...</div>;
  }

  const formattedTimestamp = new Date(post.timestamp).toLocaleString();

  // Экранирование HTML-сущностей
  const content = {__html: post.content};

  return (
    <div className={cls.container}>
      <h2 className={cls.title}>{post.title}</h2>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" className={cls.imgPost} />}
      <div className={cls.description} dangerouslySetInnerHTML={content}></div>
      <p className={cls.category}>Category: {post.category}</p>
      <p className={cls.time}>Timestamp: {formattedTimestamp}</p>
    </div>
  );
};

export default PostDetails;
