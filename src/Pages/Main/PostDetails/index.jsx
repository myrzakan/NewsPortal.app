import React from 'react';

import { useParams } from 'react-router-dom';

// <=============== Firebase ===============>
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// <============= Firebase Configuration =================> 
import firebaseConfig from '../../../FirebaseConfig';

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
    return <div className='pt-[400px] mb-[500px] text-[35px] flex justify-center'>Loading...</div>;
  }

  const formattedTimestamp = new Date(post.timestamp).toLocaleString();

  // Экранирование HTML-сущностей
  const content = {__html: post.content};

  return (
    <div className='relative top-0 max-h-[200rem] mt-[100px] pt-[50px]'>
      {/* <============== Post Detals Title =============> */}
      <h2 className='text-[30px] font-bold text-[var(--color-text)] mb-3 relative left-[550px] w-[780px]'>{post.title}</h2>

      {/* <=============== Post Detals Img ==================> */}
      {post.imageUrl && 
        <img 
          src={post.imageUrl} 
          alt="Post" 
          className='w-[800px] h-450px object-cover rounded-lg mb-[10px] ml-[540px]' />}

      <div className='flex'>
      {/* <p className='font-bold' >Рубрика: {post.category}</p> */}
      <p className='relative left-[550px] my-2 text-[var(--color-text-base)]'>{formattedTimestamp}</p>
      </div>
      {/* <================= Post Detals Description ===============> */}
      <div 
        className='mx-[570px] text-[20px] relative right-7 mb-10' 
        dangerouslySetInnerHTML={content}></div>
    </div>
  );
};

export default PostDetails;
