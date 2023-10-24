// PostList.jsx
import firebase from "firebase/compat/app";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

import "firebase/compat/database";

import Pagination from "./Pagination";
import PostItem from "./PostItem";
import firebaseConfig from "../../../FirebaseConfig";

import cls from "./PotsList.module.scss";

// Инициализация Firebase приложения
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const PostList = () => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(5);

  const postListRef = React.useRef(null);
  const postRefs = React.useRef([]);

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const fetchData = async () => {
      try {
        const snapshot = await firebase.database().ref("posts").once("value");
        const postsData = snapshot.val();
        if (postsData) {
          const postsList = Object.entries(postsData).map(([id, data]) => ({
            id,
            ...data,
          }));

          postsList.sort((a, b) => b.timestamp - a.timestamp);

          setPosts(postsList);
          setLoading(false);

          const categoriesList = Array.from(
            new Set(postsList.map((post) => post.category))
          );
          setCategories(categoriesList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (postListRef.current) {
      gsap.from(postListRef.current.children, {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: postListRef.current,
          start: "top bottom-=100",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, [selectedCategory]);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const filterPosts = (post) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const lowerCaseTitle = post.title.toLowerCase();
    const lowerCaseCategory = post.category.toLowerCase();
    const formattedDate = new Date(post.timestamp)
      .toLocaleString()
      .toLowerCase();
    return (
      lowerCaseTitle.includes(lowerCaseSearchText) ||
      lowerCaseCategory.includes(lowerCaseSearchText) ||
      formattedDate.includes(lowerCaseSearchText)
    );
  };

  const filteredPosts = searchText
    ? posts.filter(filterPosts)
    : selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPosts = filteredPosts.length;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className={cls.container}>
      {/* <====================================== Search =================================> */}
      <div className={cls.postSearch}>
        <input
          type="text"
          placeholder="Поиск..."
          value={searchText}
          onChange={handleSearch}
          className={cls.Search}
        />
      </div>

      {/* <===================================== Category ====================================> */}
      <div className={cls.postCategory}>
        <button
          onClick={() => selectCategory(null)}
          className={` py-[5px] px-[10px] my-[20px] mx-[5px] rounded-lg outline-none ${
            selectedCategory === null
              ? "bg-[var(--color-text-base)] text-[var(--color-text)]"
              : ""
          }`}
        >
          Все
        </button>
        {categories
          .map((category) => (
            <button
              key={category}
              onClick={() => selectCategory(category)}
              className={`category-button py-[5px] px-[10px] my-[20px] mx-[5px] rounded-lg outline-none ${
                selectedCategory === category
                  ? "bg-[var(--color-text-base)] text-[var(--color-text)]"
                  : ""
              }`}
            >
              {category}
            </button>
          ))
          .reverse()}
      </div>

      {/* <==================== Loading ======================> */}
      {loading ? (
        <div className={cls.loading}>
          Загрузка...
        </div>
      ) : (
        <>
          <div ref={postListRef} className="relative">
            {currentPosts.length > 0 ? (
              currentPosts.map((post, index) => (
                <PostItem
                  key={post.id}
                  post={post}
                  ref={(el) => (postRefs.current[index] = el)}
                />
              ))
            ) : (
              <div className={cls.loading}>
                Нет результатов
              </div>
            )}
          </div>
          {/* <================== Pagination ====================> */}
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
