// PostItem.jsx
import React from 'react';

import { Link } from 'react-router-dom';

import cls from '../PostList.module.scss';

const PostItem = React.forwardRef(({ post }, ref ) => {
  return (
    // <=============== Post ==============>
    <li className={cls.postlist} ref={ref}>
       {/* <================================ Post Img =================================> */}
      {post.imageUrl && <img src={post.imageUrl} alt="Пост" className={cls.postImg} />}
      {/* <===================== Post time and category =================> */}
      <p>{post.category} / {new Date(post.timestamp).toLocaleString()}</p>
      {/* <============ Post title ========> */}
      <Link to={`/postDetails/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>
    </li>
  );
})

export default PostItem;
