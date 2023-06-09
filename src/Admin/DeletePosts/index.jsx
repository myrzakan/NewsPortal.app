
// <======= React =======>
import React from "react"; 

// <== Подключение модуля Firebase (compat/app для совместимости с Firebase v8) ==>
import firebase from "firebase/compat/app"; 
import "firebase/compat/database";

// <== Подключение модуля react-toastify для отображения уведомлений ==>
import { toast } from "react-toastify";

// <============= SCSS style ==============>
import cls from "./DeletePost.module.scss";

// <== Объявление компонента DeletePosts и передача ему пропсов ==>
const DeletePosts = ({ posts }) => {

  // <== Состояние для выбранной даты ==>
  const [selectedDate, setSelectedDate] = React.useState(null);

  // <== Состояние для отфильтрованных постов ==>
  const [filteredPosts, setFilteredPosts] = React.useState(posts);


  // <== Обработчик удаления поста ==>
  const handleDeletePost = (postId) => {
    //                                    <== Запрос на подтверждение удаления ==>
    const shouldDelete = window.confirm("Вы действительно хотите удалить этот пост?");
    if (!shouldDelete) { // <== Если пользователь не подтвердил удаление ==>
      return; // <== Прерывание выполнения функции ==>
    }

    // <== Получение ссылки на базу данных Firebase ==>
    const database = firebase.database();

    // <== Получение ссылки на конкретный пост в базе данных ==>
    const postRef = database.ref(`posts/${postId}`);

    postRef
      .remove() // <== Удаление поста из базы данных Firebase ==>
      .then(() => {
        toast.warning("Post successfully deleted", { // <== Отображение уведомления об успешном удалении ==>
          position: "top-center",
          autoClose: 2000,
        });

        // <==== Обновление списка постов после удаления ====>
        const updatedPosts = filteredPosts.filter((post) => post.id !== postId); 
        setFilteredPosts(updatedPosts);
      })
      .catch((error) => {
        toast.error(error); // <== Вывод ошибки при удаление поста ==>
      });
  };

  // <== Обработчик поиска ==>
  const handleSearch = () => {
    if (selectedDate) {
      const filteredPosts = posts.filter((post) => {
        const postDate = new Date(post.timestamp); 
        const selectedDateOnly = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        );

        return (
          postDate.getFullYear() === selectedDateOnly.getFullYear() && 
          postDate.getMonth() === selectedDateOnly.getMonth() &&
          postDate.getDate() === selectedDateOnly.getDate()
        );
      });

      setFilteredPosts(filteredPosts); // <== Обновление списка отфильтрованных постов ==>
    } else { 
      setFilteredPosts(posts); // <== Отображение всех постов ==>
    }
  };

  // <== Обработчик сортировки по дате ==>
  const handleSortByDate = () => { 
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      const dateA = new Date(a.timestamp); 
      const dateB = new Date(b.timestamp); 
      return dateB - dateA;
    });
    setFilteredPosts(sortedPosts); //  <== Обновление списка отсортированных постов ==>
  };

  const handleDateChange = (e) => {
    const selectedDateValue = e.target.value; 
    if (selectedDateValue) { 
      const date = new Date(selectedDateValue);
      setSelectedDate(date); 
    } else { 
      setSelectedDate("");
    }
  };

  return (
    <div className={cls.delete_Container}> 
      <div className={cls.filter}> 
        <input
          type="date"
          value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""} // Отображение выбранной даты в элементе input
          onChange={handleDateChange} // Обработчик изменения выбранной даты
        />
        <button onClick={handleSearch} className={cls.buttonSearch}> 
          Поиск
        </button>
        <button onClick={handleSortByDate} className={cls.buttonSort}> 
          Сортировать по дате
        </button>
      </div>
      <ul>
        {filteredPosts.length > 0 ? ( // Если есть отфильтрованные посты
          // Отображение списка отфильтрованных постов
          filteredPosts.map((post) => (
            <li key={post.id} className={cls.post}>
              <h3>{post.title}</h3>
              <p>
                Категория: <span>{post.category}</span>
              </p>
              <p>
                Временная метка:{" "}
                <span>{new Date(post.timestamp).toLocaleString()}</span>
              </p>
              <button onClick={() => handleDeletePost(post.id)}> 
                Удалить пост
              </button>
            </li>
          ))
        ) : (
          // Отображение сообщения, если нет результатов
          <li className={cls.noResults}>Нет результатов</li>
        )}
      </ul>
    </div>
  );
};

export default DeletePosts;
