
// <======= React =======>
import React from 'react'; 

// <== Подключение модуля Firebase (compat/app для совместимости с Firebase v8) ==>
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/database';

// <== Подключение модуля react-toastify для отображения уведомлений ==>
import { toast } from 'react-toastify';


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
    if (!shouldDelete) { 
      return; 
    }

    // <== Получение ссылки на базу данных Firebase ==>
    const database = firebase.database();

    // <== Получение ссылки на конкретный пост в базе данных ==>
    const postRef = database.ref(`posts/${postId}`);

    postRef
      .remove() // <== Удаление поста из базы данных Firebase ==>
      .then(() => {
        toast.warning("Post successfully deleted", {
          position: "top-center",
          autoClose: 2000,
        });

        // <==== Обновление списка постов после удаления ====>
        const updatedPosts = filteredPosts.filter((post) => post.id !== postId); 
        setFilteredPosts(updatedPosts);
      })
      .catch((error) => {
        toast.error(error);
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
    <div className='relative bottom-[100px] left-[40px] w-[300px]'> 
      <div className='relative top-[10px] left-[34.8rem] w-[700px] 
          h-[100px] mb-[50px] border border-[#7a7777] rounded-lg bg-[var(--color-bg)]'> 
        <input
          type="date"
          value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""} // Отображение выбранной даты в элементе input
          onChange={handleDateChange}
          className=' p-1 w-[160px] relative left-9 top-7 border 
          border-[#7a7777] rounded-lg bg-[var(--color-bg)] focus:outline-none'
        />
        <button 
          onClick={handleSearch} 
          className='relative top-7 left-[100px] w-[170px] 
          bg-[var(--color-text-base)] p-1 px-7 rounded-lg hover:opacity-[0.6]'
          > 
            Поиск
        </button>
        <button 
          onClick={handleSortByDate} 
          className='relative left-[120px] top-7 w-[170px] p-1 px-7 
          bg-[var(--color-text-base)] rounded-lg hover:opacity-[0.6]'
          > 
            Сортировать
        </button>
      </div>

      <ul className='relative left-[557px] bottom-2'>
        {filteredPosts.length > 0 ? ( // Если есть отфильтрованные посты
          // Отображение списка отфильтрованных постов
          filteredPosts.map((post) => (
            <li 
              key={post.id} 
              className='border border-[#7a7777]
              rounded-lg my-4 p-4 w-[700px]'>
              <h3>{post.title}</h3>
              <p>
                Категория: 
                <span 
                  className='text-[var(--color-text-base)]'
                >
                  {post.category}
                </span>
              </p>
              <p>
                Временная метка:{" "}
                <span  
                  className='text-[var(--color-text-base)]'
                >
                  {new Date(post.timestamp).toLocaleString()}
                </span>
              </p>
              <button 
                onClick={() => handleDeletePost(post.id)} 
                className=' bg-[var(--color-text-base)] 
                rounded-lg p-1 mt-1 hover:opacity-[0.6]'
              > 
                Удалить
              </button>
            </li>
          ))
        ) : (
          // Отображение сообщения, если нет результатов
          <li className='w-[700px] h-10 pl-2 pt-1.5 border
            border-[#7a7777] rounded-lg flex justify-center'
            >
              Нет результатов
          </li>
        )}
      </ul>
    </div>
  );
};

export default DeletePosts;
