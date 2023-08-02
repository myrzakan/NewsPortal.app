// PostItem.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = React.forwardRef(({ post }, ref ) => {
  return (
    // <=============== Post ==============>
    <li className="rounded-lg p-4 mb-8 max-xs:mb-2 shadow-md hover:shadow-2xl relative right-0 max-xs:p-2
    max-2xl:right-[20%] max-xl:right-[38%] max-lg:right-[48%] max-lg:w-[90%] max-md:right-[59%] max-md:w-[80%] 
    max-sm:w-[67%] max-sd:w-[50%] max-xs:w-[30%] max-l:w-[45%]">
    {/* <================================ Post Img =================================> */}
    {post.imageUrl && <img src={post.imageUrl} alt="" 
      className="w-full h-[300px] max-sd:h-[260px] max-sd:object-contain max-md:h-[300px] lg:h-[500px]
      max-xs:h-[200px] md:object-fill md:h-[380px] object-cover rounded-lg"/>}
    {/* <===================== Post time and category =================> */}
    <p className=" text-[var(--color-text-base)] mt-2 max-sd:text-[14px] max-sd:mt-[-10px] max-xs:text-[12px] max-xs:mt-[-25px]">
        {post.category} / {new Date(post.timestamp).toLocaleString()}
    </p>
    {/* <============ Post title ========> */}
    <Link to={`/postDetails/${post.id}`}>
      <h2
        className="text-[20px] max-sd:text-[18px] mt-2 max-sd:mt-0 max-xs:text-[14px]  text-[var(--color-text)]  w-full hover:text-[var(--color-text-base)]">{post.title}
      </h2>
    </Link>
  </li>
  )
})

export default PostItem
