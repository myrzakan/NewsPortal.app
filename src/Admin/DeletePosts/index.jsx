import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { toast } from 'react-toastify';
import cls from './DeletePost.module.scss';

const DeletePosts = ({ posts }) => {
  const handleDeletePost = (postId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this post?');
    if (!shouldDelete) {
      return;
    }
  
    const database = firebase.database();
    const postRef = database.ref(`posts/${postId}`);
    postRef
      .remove()
      .then(() => {
        toast.warning('Post successfully deleted', {
          position: 'top-center',
          autoClose: '2000'
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cls.delete_Container}>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={cls.post}>
            <h3>{post.title}</h3>
            <p>Category: <span>{post.category}</span></p>
            <p>Timestamp: <span>{new Date(post.timestamp).toLocaleString()}</span></p>
            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePosts;
