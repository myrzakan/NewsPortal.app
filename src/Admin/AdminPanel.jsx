import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

import cls from './Admin.module.scss';

const firebaseConfig = {
  // Настройки конфигурации Firebase
  apiKey: "AIzaSyCxHT4bGzaKIl8DYK-qwWPuKJAPqlMgaOg",
  authDomain: "press-e5741.firebaseapp.com",
  databaseURL: "https://press-e5741-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "press-e5741",
  storageBucket: "press-e5741.appspot.com",
  messagingSenderId: "325042443581",
  appId: "1:325042443581:web:96832ff63420bda07a6154"
};

firebase.initializeApp(firebaseConfig);

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
        setPosts(postsList);
      }
    });

    // Отписка от обновлений базы данных при размонтировании компонента
    return () => {
      categoriesRef.off();
      postsRef.off();
    };
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCategoryCreate = () => {
    const database = firebase.database();
    const categoriesRef = database.ref('categories');

    const newCategoryRef = categoriesRef.push();
    const newCategory = {
      name: category,
    };

    newCategoryRef
      .set(newCategory)
      .then(() => {
        alert('Category created successfully');
        setCategory('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    const database = firebase.database();
    const categoryRef = database.ref(`categories/${categoryId}`);
    categoryRef
      .remove()
      .then(() => {
        alert('Category deleted successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true); // Установка флага isLoading в true при начале создания поста

    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child('images');

    if (image) {
      const imageRef = imagesRef.child(image.name);
      imageRef
        .put(image)
        .then(() => imageRef.getDownloadURL())
        .then((imageUrl) => {
          const database = firebase.database();
          const postsRef = database.ref('posts');

          const newPostRef = postsRef.push();
          const newPost = {
            title: title,
            content: content,
            imageUrl: imageUrl,
            category: category,
            timestamp: Date.now(),
          };

          newPostRef
            .set(newPost)
            .then(() => {
              setTitle('');
              setContent('');
              setImage(null);
              setCategory('');
              setIsLoading(false); // Установка флага isLoading в false при успешном создании поста
              document.getElementById('image').value = null;
              alert('Post created successfully');
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false); // Установка флага isLoading в false в случае ошибки
            });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false); // Установка флага isLoading в false в случае ошибки
        });
    } else {
      console.log('Please select an image');
      setIsLoading(false); // Установка флага isLoading в false в случае ошибки
    }
  };

  const handleDeletePost = (postId) => {
    const database = firebase.database();
    const postRef = database.ref(`posts/${postId}`);
    postRef
      .remove()
      .then(() => {
        console.log('Post deleted successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
  <div className={cls.admin_container}>
      <h1>Admin Panel</h1>

    <div className={cls.AdminPanel_CreatePosts}>

      {/* <================== Раздел создание постов ==================> */}
      <div>
        <h2 className={cls.titleCreate}>Create Post</h2>
        <form onSubmit={handleSubmit}>

          <div className={cls.title_Container}>
            {/* <======== Заголовок поста =======> */}
            {/* <label htmlFor="title" className={cls.posts_Title}>Title:</label> */}
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Загаловок поста"
              className={cls.input_Title}
            />
          </div>

          <div className={cls.discription_Container}>
            {/* <========== Содержание поста ========> */}
            {/* <label htmlFor="content" className={cls.title_Content}>Content:</label> */}
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              placeholder="Содержание поста"
              className={cls.input_Discription}
            />
          </div>

          <div className={cls.category_Container}>
            {/* <======== Выбор категории поста ===========> */}
            <label htmlFor="category" className={cls.titleCategory}>Category:</label>
            <select 
              id="category" 
              value={category} 
              onChange={handleCategoryChange}
              className={cls.selectCategory}
            >
              <option value="" >Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className={cls.image_Container}>
            {/* <=========== Картинка поста ==========> */}
            <label htmlFor="image" className={cls.titleImage}>Image:</label>
            <input 
              type="file" 
              id="image" 
              onChange={handleImageChange}
              className={cls.inputImage}
             />
          </div>

          {/* <========== Button Creat Post ===========> */}
          <button 
            type="submit" 
            disabled={isLoading}
            className={cls.buttonCreate}
          >
            {isLoading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>

    </div> 
    {/* <======= emd AdminPanel_CreatePosts ======> */}
    


      {/* <====================== Раздел удаление постов ==============> */}
      <div className={cls.delete_Container}>
        <h2>Post List</h2>
        <ul>
          {/* <====== Все посты =====> */}
          {posts.map((post) => (
            <li key={post.id} className={cls.post}>
              <h3>{post.title}</h3>
              {/* <====== Категория поста =====> */}
              <p>Category: {post.category}</p> 
              {/* <===== Время добавление поста =====> */}
              <p>Timestamp: {new Date(post.timestamp).toLocaleString()}</p>
              {/* <========= Кнопка удаление поста =============> */}
              <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
            </li>
          ))}
        </ul>
      </div>


      {/* <=============== Раздел категории ====================> */}
      <div>

        {/* <============= Создание категории =============> */}
        <div>
          <h2>Create Category</h2> 
          <div>
            <input
              type="text"
              onChange={handleCategoryChange}
              value={category}
              placeholder="Category Name"
            />
            <button onClick={handleCategoryCreate}>Create Category</button>
          </div>
        </div>
        
        {/* <============== Отображение созданных категории ===========> */}
        <div>
          <h2>Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className={cls.category}>
                <p>{category.name}</p>
                <button onClick={() => handleDeleteCategory(category.id)}>
                  Delete Category
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>

  </div> 
  // end admin_container
  
  );
};

export default AdminPanel;
