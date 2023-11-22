// <-- Delete Post -->
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import React from 'react';
import { toast } from 'react-toastify';
import styles from './DeletePost.module.scss';

const DeletePosts = ({ posts }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [filteredPosts, setFilteredPosts] = React.useState(posts);

  // <== Обработчик удаления поста ==>
  const handleDeletePost = postId => {
    //
    const shouldDelete = window.confirm(
      'Вы действительно хотите удалить этот пост?',
    );
    if (!shouldDelete) {
      return;
    }

    // <== Получение ссылки на базу данных Firebase ==>
    const database = firebase.database();

    // <== Получение ссылки на конкретный пост в базе данных ==>
    const postRef = database.ref(`posts/${postId}`);

    postRef
      .remove()
      .then(() => {
        toast.warning('Post successfully deleted', {
          position: 'top-center',
          autoClose: 2000,
        });

        // <== Обновление списка постов после удаления ==>
        const updatedPosts = filteredPosts.filter(post => post.id !== postId);
        setFilteredPosts(updatedPosts);
      })
      .catch(error => {
        toast.error(error);
      });
  };

  // <== Обработчик поиска ==>
  const handleSearch = () => {
    if (selectedDate) {
      const filteredPosts = posts.filter(post => {
        const postDate = new Date(post.timestamp);
        const selectedDateOnly = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
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

  const handleDateChange = e => {
    const selectedDateValue = e.target.value;
    if (selectedDateValue) {
      const date = new Date(selectedDateValue);
      setSelectedDate(date);
    } else {
      setSelectedDate('');
    }
  };

  return (
    <div className={styles.delete_post}>
      <div className={styles.delete_content}>
        <div>
          <input
            type="date"
            value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ''}
            onChange={handleDateChange}
            className={styles.delete_input}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleSortByDate}>Sort</button>
        </div>
      </div>

      <ul className={styles.delete_post_list}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>
                Категория:
                <span className="text-[var(--color-text-base)]">
                  {post.category}
                </span>
              </p>
              <p>
                Временная метка:{' '}
                <span className="text-[var(--color-text-base)]">
                  {new Date(post.timestamp).toLocaleString()}
                </span>
              </p>
              <button
                onClick={() => handleDeletePost(post.id)}
                className=" bg-[var(--color-text-base)]
                rounded-lg py-1 px-2 mt-1 hover:opacity-[0.6]"
              >
                Удалить
              </button>
            </li>
          ))
        ) : (
          // Отображение сообщения, если нет результатов
          <li className="w-full text-center">Нет результатов</li>
        )}
      </ul>
    </div>
  );
};

export default DeletePosts;
