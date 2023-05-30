import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { toast } from 'react-toastify';

import cls from './DeleteCategory.module.scss';

const DeleteCategory = ({ categories }) => {
  const handleDeleteCategory = (categoryId) => {
    const handleCategory = window.confirm('Are you sure you want to delete this category?');
    if (!handleCategory) {
      return;
    }
    const database = firebase.database();
    const categoryRef = database.ref(`categories/${categoryId}`);
    categoryRef
      .remove()
      .then(() => {
        toast.warning('Category deleted successfully', {
          position: 'top-center'
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cls.DeleteCategoryContainer}>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li 
            key={category.id} 
            className={cls.category} 
            onClick={() => handleDeleteCategory(category.id)}
          >
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteCategory;
