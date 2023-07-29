// PostList.jsx
import React from 'react';

// <======================= Gsap Animations ========================>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// <======================== Firebase ===============================>
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// <============== Firebase Configuration ==============> 
import firebaseConfig from '../../../FirebaseConfig';

// <================= SCSS style ===============>
import cls from './PostList.module.scss';

// <=============== Componenets ================>
import PostItem from './PostItem';
import Pagination from './Pagination';
import NoAccess from '../../../Components/NoAccess';

// Инициализация Firebase приложения
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const PostList = () => {

  // <================ Post ==================>
  const [posts, setPosts] = React.useState([]);

  //<================= Loading =====================>
  const [loading, setLoading] = React.useState(true);

  // <================= Category post ================================> 
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  // <=================== Search Post ===================>
  const [searchText, setSearchText] = React.useState('');

  // <=================== Pagination =====================>
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(5);

  // <========== Gsap Animations =======>
  const postListRef = React.useRef(null);
  const postRefs = React.useRef([]);

  // Загрузка данных из Firebase и установка состояний
  React.useEffect(() => {
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
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Анимация для списка постов при изменении выбранной категории
  React.useEffect(() => {
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
    setCurrentPage(1);
  };

  // Обработчик изменения текста поиска
  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
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

  // Пагинация - вычисление индексов постов текущей страницы
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPosts = filteredPosts.length;

  // Изменение текущей страницы
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };


  // const pbAuth = localStorage.getItem('pocketbase_auth')

  // if (pbAuth) return <NoAccess/>


  return (
    <div className={cls.post_container}>
      {/* <======== Search ========> */}
      <div className={cls.search}>
        <input
          type="text"
          placeholder="Поиск..."
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      {/* <========= Category ========> */}
      <div className={cls.categories}>
        <button onClick={() => selectCategory(null)}>Все</button>
        {categories.map((category) => (
          <button key={category} onClick={() => selectCategory(category)}>
            {category}
          </button>
        )).reverse()}
      </div>

       {/* <======= Loading =========> */}
      {loading ? (
        <div className='mb-[630px] bg-[#333] text-[#333]'>
        Loading
        </div>
      ) : (
        <>
          <ul ref={postListRef}>
            {currentPosts.length > 0 ? (
              currentPosts.map((post, index) => (
                <PostItem key={post.id} post={post} ref={(el) => (postRefs.current[index] = el)} />
              ))
            ) : (
              <div className={cls.no_results}>Нет результатов</div>
            )}
          </ul>
          {/* <======== Pagination ========> */}
          <Pagination
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            totalPosts={totalPosts}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default PostList;
