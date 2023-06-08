import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../../FirebaseConfig';
import cls from './PostList.module.scss';
import logo from '../../Logo/press.png';

// Инициализация Firebase приложения
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  const postListRef = useRef(null);
  const postRefs = useRef([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxVisiblePages = 5;

  // Загрузка данных из Firebase и установка состояний
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const fetchData = async () => {
      try {
        const snapshot = await firebase.database().ref('posts').once('value');
        const postsData = snapshot.val();
        if (postsData) {
          const postsList = Object.entries(postsData).map(([id, data]) => ({
            id,
            ...data,
          }));

          // Сортировка постов по времени создания (timestamp)
          postsList.sort((a, b) => b.timestamp - a.timestamp);

          setPosts(postsList);
          setLoading(false);

          // Получение списка категорий путем извлечения уникальных значений из списка постов
          const categoriesList = Array.from(new Set(postsList.map((post) => post.category)));
          setCategories(categoriesList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Прокрутка страницы в начало при монтировании компонента
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Анимация для списка постов при изменении выбранной категории
  useEffect(() => {
    if (postListRef.current) {
      gsap.from(postListRef.current.children, {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: postListRef.current,
          start: 'top bottom-=100',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, [selectedCategory]);

  // Обработчик выбора категории
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Сброс текущей страницы при выборе новой категории
  };

  // Обработчик изменения текста поиска
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Фильтрация постов по тексту поиска и/или выбранной категории
  const filterPosts = (post) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const lowerCaseTitle = post.title.toLowerCase();
    const lowerCaseCategory = post.category.toLowerCase();
    const formattedDate = new Date(post.timestamp).toLocaleString().toLowerCase();
    return (
      lowerCaseTitle.includes(lowerCaseSearchText) ||
      lowerCaseCategory.includes(lowerCaseSearchText) ||
      formattedDate.includes(lowerCaseSearchText)
    );
  };

  // Применение фильтрации для отображения отфильтрованных постов
  const filteredPosts = searchText
    ? posts.filter(filterPosts)
    : selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  // Пагинация
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  // Определение границ отображаемых страниц
  let startPage, endPage;
  if (totalPages <= maxVisiblePages) {
    // Если общее количество страниц меньше или равно максимальному количеству отображаемых страниц,
    // показываем все страницы
    startPage = 1;
    endPage = totalPages;
  } else {
    // Если общее количество страниц больше максимального количества отображаемых страниц,
    // определяем границы в зависимости от текущей страницы
    const maxVisiblePagesHalf = Math.floor(maxVisiblePages / 2);
    if (currentPage <= maxVisiblePagesHalf) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + maxVisiblePagesHalf >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxVisiblePagesHalf;
      endPage = currentPage + maxVisiblePagesHalf;
    }
  }

  // Обработчик изменения страницы
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Прокрутка страницы в верхнюю часть
  };

  const hasResults = filteredPosts.length > 0;

  return (
    <div className={cls.post_container}>
      <h1>Список постов</h1>
      <div className={cls.search}>
        <input
          type="text"
          placeholder="Поиск..."
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className={cls.categories}>
        <button onClick={() => selectCategory(null)}>Все</button>
        {categories.map((category) => (
          <button key={category} onClick={() => selectCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={cls.loading}>
          <img onClick={() => selectCategory(null)} src={logo} alt="logo" />
        </div>
      ) : (
        <>
          <ul ref={postListRef}>
            {hasResults ? (
              filteredPosts
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((post, index) => (
                  <li
                    key={post.id}
                    className={cls.postlist}
                    ref={(el) => (postRefs.current[index] = el)}
                  >
                    {post.imageUrl && <img src={post.imageUrl} alt="Пост" className={cls.postImg} />}
                    <p>
                      {post.category} / {new Date(post.timestamp).toLocaleString()}
                    </p>
                    <Link to={`/postDetails/${post.id}`}>
                      <h2>{post.title}</h2>
                    </Link>
                  </li>
                ))
            ) : (
              <div className={cls.no_results}>Нет результатов</div>
            )}
          </ul>
          {totalPages > 1 && (
            <div className={cls.pagination}>
              <button
                className={cls.page_arrow}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt;
              </button>
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`${cls.page_number} ${pageNumber === currentPage ? cls.active : ''}`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              )}
              <button
                className={cls.page_arrow}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
