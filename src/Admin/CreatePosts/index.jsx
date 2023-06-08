import React, { useState } from 'react';

// <================= Firebase ==================>
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

// <================== Toastify ===============>
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// <================= React Quill ================>
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import cls from './CreatePost.module.scss'

const CreatePostForm = ({categories}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

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
            timestamp: Date.now()
          };

          newPostRef
            .set(newPost)
            .then(() => {
              setTitle('');
              setContent('');
              setImage(null);
              setCategory('');
              setIsLoading(false);
              document.getElementById('image').value = null;
              toast.success('Post successfully created', {
                position: 'top-center'
              });
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      toast.error('Please select an image', {
        position: 'top-center'
      });
      setIsLoading(false);
    }
  };

  return (
    <div className={cls.AdminCreatePost}>
      <h2 className={cls.titleCreate}>Create Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Заголовок поста */}
        <div className={cls.title_Container}>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Заголовок поста"
            className={cls.input_Title}
          />
        </div>

        {/* Содержание поста */}
        <div className={cls.discription_Container}>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            placeholder="Содержание поста"
            className={cls.input_Discription}
          />
        </div>

        {/* Выбор категории поста */}
        <div className={cls.category_Container}>
          <label htmlFor="category" className={cls.titleCategory}>
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className={cls.selectCategory}
          >
            <option value="" className={cls.select_default}>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Картинка поста */}
        <div className={cls.image_Container}>
          <label htmlFor="image" className={cls.titleImage}>
            Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className={cls.inputImage}
          />
        </div>

        {/* Кнопка создания поста */}
        <button
          type="submit"
          disabled={isLoading}
          className={cls.buttonCreate}
        >
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;