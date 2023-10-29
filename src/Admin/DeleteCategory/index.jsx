// Delete Category
import React from 'react';

// <== Подключение модуля Firebase (compat/app для совместимости с Firebase v8) ==>
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// <============== Toastify ============>
import { toast } from 'react-toastify';

const DeleteCategory = ({ categories }) => {
  // <=== Обработчик удаления категории ===>
  const handleDeleteCategory = categoryId => {
    // <== Всплывающее окно с подтверждением удаления категории ==>
    const handleCategory = window.confirm(
      'Вы уверены, что хотите удалить эту категорию?',
    );
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
          position: 'top-center',
        });
      })
      .catch(error => {
        toast.error(error); // <== Обработка ошибок при удалении категории ==>
      });
  };

  return (
    <div
      className="w-[700px] p-2 relative left-[596px]
      bottom-[100px] border border-[#7a7777] rounded-lg"
    >
      <ul className="">
        {categories.map(category => (
          <li
            key={category.id}
            className="w-[120px] cursor-pointer hover:text-[var(--color-text-base)]"
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
