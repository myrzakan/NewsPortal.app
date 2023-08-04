// PostList.jsx
import firebase from 'firebase/compat/app'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React from 'react'

import 'firebase/compat/database'


import Pagination from './Pagination'
import PostItem from './PostItem'
import firebaseConfig from '../../../FirebaseConfig'


// Инициализация Firebase приложения
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const PostList = () => {


  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [categories, setCategories] = React.useState([])
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [searchText, setSearchText] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [postsPerPage] = React.useState(5)

  const postListRef = React.useRef(null)
  const postRefs = React.useRef([])


  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const fetchData = async () => {
      try {
        const snapshot = await firebase.database().ref('posts').once('value')
        const postsData = snapshot.val()
        if (postsData) {
          const postsList = Object.entries(postsData).map(([id, data]) => ({
            id,
            ...data,
          }))

          postsList.sort((a, b) => b.timestamp - a.timestamp)

          setPosts(postsList)
          setLoading(false)

          const categoriesList = Array.from(new Set(postsList.map((post) => post.category)))
          setCategories(categoriesList)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
      })
    }
  }, [selectedCategory])

  const selectCategory = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value)
    setCurrentPage(1)
  }

  const filterPosts = (post) => {
    const lowerCaseSearchText = searchText.toLowerCase()
    const lowerCaseTitle = post.title.toLowerCase()
    const lowerCaseCategory = post.category.toLowerCase()
    const formattedDate = new Date(post.timestamp).toLocaleString().toLowerCase()
    return (
      lowerCaseTitle.includes(lowerCaseSearchText) ||
      lowerCaseCategory.includes(lowerCaseSearchText) ||
      formattedDate.includes(lowerCaseSearchText)
    )
  }

  const filteredPosts = searchText
    ? posts.filter(filterPosts)
    : selectedCategory
      ? posts.filter((post) => post.category === selectedCategory)
      : posts

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const totalPosts = filteredPosts.length

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  return (
    <div className="mt-[100px] ml-[525px] w-[53rem] pt-[60px] relative right-[0%]
    max-lg:right-[50%] max-xl:right-[60%] max-md:right-[90%] max-sm:right-[120%] max-sd:right-[170%] max-l:right-[220%]">
      {/* <====================================== Search =================================> */}
      <div className="relative right-0 max-2xl:right-[19%] max-lg:right-[-14%] max-md:right-[-27%] max-md:w-[50%] max-xl:right-[-52%] max-sm:left-[37%]">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchText}
          onChange={handleSearch}
          className="p-1 h-[40px] w-[850px] outline-none border-none rounded-md bg-[var(--color-bg-base)]
          text-[var(--color-text)] transition-[var(--transtion-duration)] max-lg:w-[740px] max-md:w-[645px] max-sm:w-[105%] max-sd:w-[46%] max-xs:w-[26%]"
        />
      </div>

      {/* <===================================== Category ====================================> */}
      <div className="category relative right-0 max-2xl:right-[19%] max-lg:right-[-12%] max-xl:right-[-52%]">
        <button
          onClick={() => selectCategory(null)}
          className={`py-[5px] px-[10px] my-[20px] mx-[5px] 
          rounded-lg outline-none ${selectedCategory === null ? 'bg-[var(--color-text-base)] text-[var(--color-text)]' : ''}`}>
          Все
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => selectCategory(category)}
            className={`py-[5px] px-[10px] my-[20px] mx-[5px] rounded-lg outline-none max-lg:px-[5px] ${
              selectedCategory === category ? 'bg-[var(--color-text-base)] text-[var(--color-text)]' : '' // Классы для красного фона
            }`}
          >
            {category}
          </button>
        )).reverse()}
      </div>

      {/* <==================== Loading ======================> */}
      {loading ? (
        <div className="mb-[630px] bg-[#333] text-[#333]">
        Loading
        </div>
      ) : (
        <>
          <div ref={postListRef} className="relative">
            {currentPosts.length > 0 ? (
              currentPosts.map((post, index) => (
                <PostItem key={post.id} post={post} ref={(el) => (postRefs.current[index] = el)} />
              ))
            ) : (
              <div className="mb-[630px] text-center relative top-[200px] right-[0%] text-[30px]
              max-2xl:right-[20%] max-xl:right-[-40%] max-lg:right-[-7%] max-md:right-[-40%] max-md:w-[50%] max-sm:right-[-20%] max-sd:right-[-35%] max-sd:text-[20px]">
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
  )
}

export default PostList