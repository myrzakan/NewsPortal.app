import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './CreatePost.css';

const CreatePostForm = ({ categories }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleContentChange = value => {
    setContent(value);
  };

  const handleImageChange = event => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
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
              toast.success('Post successfully created', {
                position: 'top-center',
              });
            })
            .catch(error => {
              console.log(error);
              setIsLoading(false);
            });
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      toast.error('Please select an image', {
        position: 'top-center',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className=" max-h-[100rem] h-[50rem]  pt-[50px]">
      <form onSubmit={handleSubmit} className="w-[700px]">
        {/* <======================== Заголовок поста ==========================>*/}
        <div className="flex justify-center">
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Заголовок поста"
            className="relative left-[595px] mt-[100px] w-[700px] pl-2  h-10
            bg-[var(--color-bg)] border border-[#7a7777]
            rounded-lg focus:outline-none placeholder:italic "
          />
        </div>

        {/* <=========================== Содержание поста ==========================>*/}
        <div className="flex  mt-3 ml-[265px] w-[700px] relative left-[20.6rem]">
          <ReactQuill
            value={content}
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['blockquote', 'code-block'],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],
                ['clean'],
              ],
            }}
            onChange={handleContentChange}
            placeholder="Содержание поста"
            className="w-[700px] h-[18rem] custom-editor"
          />
        </div>

        {/* <=================================== Выбор категории поста ============================?*/}
        <div className="relative left-[37.2rem] top-[5rem]">
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="bg-[var(--color-bg)] border border-[#7a7777] p-2 rounded-lg"
          >
            <option value="" className="">
              Select a category
            </option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* <======================================== Картинка поста ===========================> */}
        <div className="relative left-[65rem] top-[3rem] w-[100px]">
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-[230px]"
          />
        </div>

        {/* <============================= Кнопка создания поста ============================>*/}
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-[70px] w-[700px] p-3 relative left-[37.2rem]
          bg-[var(--color-text-base)] rounded-lg hover:opacity-[0.6] 
          ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
