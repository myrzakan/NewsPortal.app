// PostItem.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = React.forwardRef(({ post }, ref ) => {
  return (
    // <=============== Post ==============>
    <li className="w-[100%] h-[0%] rounded-lg p-4 mb-8  shadow-md hover:shadow-2xl relative right-0
      max-x1:right-[20%] max-x2:right-[-51%] max-x3:right-[-10%] max-x4:w-[80%] max-x4:right-[-25%] max-x5:w-[50%] max-x5:right-[-10%] max-x5:h-[50%]">
      {/* <================================ Post Img =================================> */}
      {post.imageUrl && <img src={post.imageUrl} alt=""
        className="w-full h-[480px] object-cover rounded-lg"/>}
      {/* <===================== Post time and category =================> */}
      <p className=" text-[var(--color-text-base)] mt-2 max-sd:text-[14px] max-sd:mt-[-10px] max-xs:text-[12px] max-xs:mt-[-25px]">
        {post.category} / {new Date(post.timestamp).toLocaleString()}
      </p>
      {/* <============ Post title ========> */}
      <Link to={`/postDetails/${post.id}`}>
        <h2
          className="text-[20px] max-sd:text-[18px] mt-2 max-sd:mt-0 max-xs:text-[14px]  
          text-[var(--color-text)]  w-full hover:text-[var(--color-text-base)]">{post.title}
        </h2>
      </Link>
    </li>
  )
})

export default PostItem
