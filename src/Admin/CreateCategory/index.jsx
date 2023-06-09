
// Create Category
import React from 'react';

// <== Подключение модуля Firebase (compat/app для совместимости с Firebase v8) ==>
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// <================== Toastify ================>
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// <================ SCSS style ===============>
import cls from './CreateCategory.module.scss';

const CreateCategory = () => {
  const [category, setCategory] = React.useState('');
  const [categories, setCategories] = React.useState([]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCategoryCreate = () => {
    if (category.trim() === '') {
      // Если поле категории пустое или содержит только пробельные символы
      toast.error('Please enter a category name', {
        position: 'top-center',
      });
      return;
    }
  
    const database = firebase.database();
    const categoriesRef = database.ref('categories');
  
    const newCategoryRef = categoriesRef.push();
    const newCategory = {
      id: newCategoryRef.key,
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
  

  React.useEffect(() => {
    const categoriesRef = firebase.database().ref('categories');

    categoriesRef.on('value', (snapshot) => {
      const categoriesData = snapshot.val();
      if (categoriesData) {
        const categoriesList = Object.entries(categoriesData).map(([categoryId, category]) => ({
          id: categoryId,
          name: category.name,
        }));
        setCategories(categoriesList);
      }
    });

    return () => {
      categoriesRef.off('value');
    };
  }, []);

  return (
    <div className={cls.CreateCategoryContainer}>
      <h2>Create Category</h2>
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
