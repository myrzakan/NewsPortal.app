
// Delete Category
import React from 'react';

// <== Подключение модуля Firebase (compat/app для совместимости с Firebase v8) ==>
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// <============== Toastify ============>
import { toast } from 'react-toastify';

// <=============== SCSS style ===============>
import cls from './DeleteCategory.module.scss';


const DeleteCategory = ({ categories }) => {
  // <=== Обработчик удаления категории ===>
  const handleDeleteCategory = (categoryId) => {
    // <==== Всплывающее окно с подтверждением удаления категории ====>
    const handleCategory = window.confirm('Вы уверены, что хотите удалить эту категорию?');
    if (!handleCategory) {
      return; // <== Если пользователь отменил удаление, выходим из функции ==>
    }
    // <== Инициализация базы данных Firebase ==>
    const database = firebase.database();

    // <== Получение ссылки на категорию, которую нужно удалить ==>
    const categoryRef = database.ref(`categories/${categoryId}`);

    // <== Удаляем категорию из базы данных Firebase ==>
    categoryRef
      .remove()
      .then(() => {
        // <=== Успешное удаление категории ===>
        toast.warning('Категория успешно удалена', {
          position: 'top-center'
        });
      })
      .catch((error) => {
        toast.error(error); // <== Обработка ошибок при удалении категории ==>
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
