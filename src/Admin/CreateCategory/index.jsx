
// Create Category
import React from 'react';

// <== Подключение модуля Firebase (compat/app для совместимости с Firebase v8) ==>
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// <================== Toastify ================>
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div  className='relative left-[37.2rem] bottom-[110px] 
          rounded-lg border border-[#7a7777] w-[700px] p-[50px]'>
      <div>
        <input
          type="text"
          onChange={handleCategoryChange}
          value={category}
          placeholder="Category Name"
          className='w-[300px] h-9 px-2 rounded-lg border border-[#7a7777] 
          focus:outline-none bg-[var(--color-bg)]'
        />
        <button 
            onClick={handleCategoryCreate} 
            className='ml-10 w-[200px] p-1.5 rounded-lg 
            bg-[var(--color-text-base)] hover:opacity-[0.6]'>
          Create Category
        </button>
      </div>
    </div>
  );
};

export default CreateCategory;
