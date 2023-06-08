
import React  from 'react';

// <=============== Firebase ==============>
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// <================ Components ============>
import CreatePostForm from './CreatePosts';
import CreateCategory from './CreateCategory';
import DeletePosts from './DeletePosts';
import DeleteCategory from './DeleteCategory';

// <============= Firebase Configuration ==============> 
import firebaseConfig from '../FirebaseConfig';

// <============ SCSS style ===========>
import cls from './Admin.module.scss'

// <========= Website Logo ==============>
import logo from '../Logo/NewsLine_silver.png'


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

    // Получение списка категорий из базы данных при загрузке компонента
    categoriesRef.on('value', (snapshot) => {
      const categoriesData = snapshot.val();
      if (categoriesData) {
        const categoriesList = Object.keys(categoriesData).map((key) => ({
          id: key,
          ...categoriesData[key],
        }));
        setCategories(categoriesList);
        setLoading(false);
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

  if (loading) {
    return <div className={cls.loading}>
      <img src={logo} alt="log" />
    </div>;
  }

  return (
    <div className={cls.AdminPanelContainer}>
      <h1>Admin Panel</h1>
      <img src={logo} alt="logo" />
      <CreatePostForm categories={categories} />
      <CreateCategory />
      <DeleteCategory categories={categories} />
      <DeletePosts posts={posts} />
    </div>
  );
};

export default AdminPanel;