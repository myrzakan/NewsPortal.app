import React from 'react';

import { useParams } from 'react-router-dom';

// <=============== Firebase ===============>
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// <============= Firebase Configuration =================> 
import firebaseConfig from '../../FirebaseConfig';

import cls from './PostDetaills.module.scss';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
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

  React.useEffect(() => {
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
      {/* <============== Post Detals Title =============> */}
      <h2 className={cls.title}>{post.title}</h2>

      {/* <=============== Post Detals Img ==================> */}
      {post.imageUrl && <img src={post.imageUrl} alt="Post" className={cls.imgPost} />}

      <p className={cls.category} >/{post.category}</p>
      <p className={cls.time}>{formattedTimestamp}</p>

      {/* <================= Post Detals Description ===============> */}
      <div className={cls.description} dangerouslySetInnerHTML={content}></div>
    </div>
  );
};

export default PostDetails;
