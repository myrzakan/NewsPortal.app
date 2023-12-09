// <-- Admin Panel -->
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import React from 'react';
import { Radio } from 'react-loader-spinner';
import firebaseConfig from '../FirebaseConfig';
import CreatePostForm from './CreatePosts';
import DeletePosts from './DeletePosts';

import cls from './Admin.module.scss';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AdminPanel = () => {
  const [categories, setCategories] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const database = firebase.database();
    const categoriesRef = database.ref('categories');
    const postsRef = database.ref('posts');

    categoriesRef.on('value', snapshot => {
      const categoriesData = snapshot.val();
      if (categoriesData) {
        const categoriesList = Object.keys(categoriesData).map(key => ({
          id: key,
          ...categoriesData[key],
        }));
        setCategories(categoriesList);
        setLoading(false);
      }
    });

    postsRef.on('value', snapshot => {
      const postsData = snapshot.val();
      if (postsData) {
        const postsList = Object.keys(postsData).map(key => ({
          id: key,
          ...postsData[key],
        }));

        postsList.sort((a, b) => b.timestamp - a.timestamp);

        setPosts(postsList);
      }
    });

    return () => {
      categoriesRef.off();
      postsRef.off();
    };
  }, []);

  if (loading) {
    return (
      <div className={cls.loading}>
        <Radio
          visible={true}
          height="70"
          width="70"
          ariaLabel="radio-loading"
          wrapperStyle={{}}
          wrapperClass="radio-wrapper"
          colors={[
            'var(--color-text-base)',
            'var(--color-text-base)',
            'var(--color-text-base)',
          ]}
        />
      </div>
    );
  }

  return (
    <div>
      <CreatePostForm categories={categories} />
      {/* <CreateCategory /> */}
      {/* <DeleteCategory categories={categories} /> */}
      <DeletePosts posts={posts} />
    </div>
  );
};

export default AdminPanel;
