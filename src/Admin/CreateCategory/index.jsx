import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cls from './CreateCategory.module.scss';

const CreateCategory = () => {
  const [category, setCategory] = React.useState('');

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
        toast.success('Category created successfully', {
          position: 'top-center',
        });
        setCategory('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cls.create_category}>
      <h2 className={cls.title_category}>Create Category</h2>
      <div>
        <input
          type="text"
          onChange={handleCategoryChange}
          value={category}
          placeholder="Category Name"
          className={cls.input_create_category}
        />
        <button onClick={handleCategoryCreate} className={cls.button_create_category}>
          Create Category
        </button>
      </div>
    </div>
  );
};

export default CreateCategory;
