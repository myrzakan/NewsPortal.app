// <-- Create Post -->
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useToasts } from 'react-toast-notifications';

import './CreatePost.css';

const CreatePostForm = ({ categories }) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [category, setCategory] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const { addToast } = useToasts();

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleContentChange = value => {
    setContent(value);
  };

  const handleImageChange = event => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setImage(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);

    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child('images');

    if (image) {
      const imageRef = imagesRef.child(image.name);
      imageRef
        .put(image)
        .then(() => imageRef.getDownloadURL())
        .then(imageUrl => {
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
              setIsLoading(false);
              document.getElementById('image').value = null;
              addToast(`Пост успешно создан`, {
                appearance: 'success',
                autoDismiss: 'true',
              });
            })
            .catch(error => {
              console.log(error);
              addToast(`Ошибка при создании поста`, {
                appearance: 'error',
                autoDismiss: 'true',
              });
              setIsLoading(false);
            });
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      addToast(`Пожалуйста, выберите изображение`, {
        appearance: 'error',
        autoDismiss: 'true',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="">
        {/* <== Заголовок поста ==>*/}
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Заголовок поста"
          className="post_title"
        />

        {/* <== Содержание поста ==>*/}
        <div>
          <ReactQuill
            value={content}
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                // ['blockquote', 'code-block'],
                // [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ background: ['var(--color-text-base)'] }],
                [{ color: ['var(--color-text-base)'] }],
                // [{ font: [] }],
                [{ align: [] }],
                // ['clean'],
              ],
            }}
            onChange={handleContentChange}
            placeholder="Содержание поста"
            className="custom-editor"
          />
        </div>

        <div className="content flex justify-between items-center mt-[4.6rem] mk:mt-[5.6rem] mx:flex-col-reverse ml:mt-[5rem]">
          {/* <== Выбор категории поста ==> */}
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="post_select"
          >
            <option value="" className="">
              Выбор категории
            </option>
            {categories.map(category => (
              <option
                className="select_option"
                key={category.id}
                value={category.name}
              >
                {category.name}
              </option>
            ))}
          </select>

          {/* <== Картинка поста ==> */}
          <div className=" mx:mb-2 mx:mt-2 ml:mt-2 mx:w-full">
            <label
              htmlFor="image"
              className=" cursor-pointer bg-[var(--color-text-base)] hover:opacity-[0.7] text-white font-bold py-2 px-4 rounded-[8px] transition-all w-full"
            >
              {selectedFile ? 'Загружено' : 'Загрузить изображение'}
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* <== Кнопка создания поста ==>*/}
        <button
          type="submit"
          disabled={isLoading}
          className={`p-2 mt-3 w-full bg-[var(--color-text-base)] rounded-[8px] text-[var(--text-base)] font-bold hover:opacity-[0.8]
          ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Создание...' : 'Создать пость'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
