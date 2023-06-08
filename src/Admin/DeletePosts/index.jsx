import React from "react";

// <================== Firebase ================>
import firebase from "firebase/compat/app";
import "firebase/compat/database";

//<=============== Toastify ================>
import { toast } from "react-toastify";

// <============== SCSS style ==============>
import cls from "./DeletePost.module.scss";

const DeletePosts = ({ posts }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [filteredPosts, setFilteredPosts] = React.useState(posts);
  const handleDeletePost = (postId) => {
    const shouldDelete = window.confirm("Вы действительно хотите удалить этот пост?");
    if (!shouldDelete) {
      return;
    }
  
    const database = firebase.database();
    const postRef = database.ref(`posts/${postId}`);
    postRef
      .remove()
      .then(() => {
        toast.warning("Post successfully deleted", {
          position: "top-center",
          autoClose: 2000,
        });
  
        // Обновление списка после удаления
        const updatedPosts = filteredPosts.filter((post) => post.id !== postId);
        setFilteredPosts(updatedPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  


  // Обработчик поиска постов по выбранной дате
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

      setFilteredPosts(filteredPosts);
    } else {
      setFilteredPosts(posts);
    }
  };

  // Обработчик сортировки постов по дате
  const handleSortByDate = () => {
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB - dateA;
    });
    setFilteredPosts(sortedPosts);
  };

  // Обработчик изменения выбранной даты
  const handleDateChange = (e) => {
    const selectedDateValue = e.target.value;
    if (selectedDateValue) {
      const date = new Date(selectedDateValue);
      setSelectedDate(date);
    } else {
      setSelectedDate(""); // Установка пустой строки вместо null
    }
  };

  return (
    <div className={cls.delete_Container}>
      <div className={cls.filter}>
        <input
          type="date"
          value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""}
          onChange={handleDateChange}
        />
        <button 
          onClick={handleSearch}
          className={cls.buttonSearch}
        >
          Search
        </button>

        <button 
          onClick={handleSortByDate}
          className={cls.buttonSort}
        >
          Sort by Date
        </button>

      </div>
      <ul>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li key={post.id} className={cls.post}>

              <h3>{post.title}</h3>
              <p>
                Category: <span>{post.category}</span>
              </p>
              <p>
                Timestamp:{" "}
                <span>{new Date(post.timestamp).toLocaleString()}</span>
              </p>
              <button 
                onClick={() => handleDeletePost(post.id)}>
                Delete Post
              </button>
            </li>
          ))
        ) : (
          <li className={cls.noResults}>Нет результатов</li>
        )}
      </ul>
    </div>
  );
};

export default DeletePosts;
