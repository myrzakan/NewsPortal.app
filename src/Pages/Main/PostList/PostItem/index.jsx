// PostItem.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = React.forwardRef(({ post }, ref ) => {
  return (
    // <=============== Post ==============>
    <li className="postlist rounded-lg p-[20px] mb-[60px] shadow-md hover:shadow-2xl" ref={ref}>
      {/* <================================ Post Img =================================> */}
      {post.imageUrl && <img src={post.imageUrl} alt="Пост" className="w-[800px] h-[500px] object-cover rounded-lg" />}
      {/* <===================== Post time and category =================> */}
      <p>{post.category} / {new Date(post.timestamp).toLocaleString()}</p>
      {/* <============ Post title ========> */}
      <Link to={`/postDetails/${post.id}`}>
        <h2
          className="text-[24px] mb-[10px] text-[var(--color-text)]
          font-[500] w-full hover:text-[var(--color-text-base)]">{post.title}
        </h2>
      </Link>
    </li>
  )
})

export default PostItem
