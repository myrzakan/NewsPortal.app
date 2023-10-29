// PostItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import cls from './PostItem.module.scss';

const PostItem = React.forwardRef(({ post }) => {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const postTimestamp = new Date(post.timestamp);
  const formattedDate = `${postTimestamp.getDate()} ${
    months[postTimestamp.getMonth()]
  } в ${postTimestamp.getHours()}:${String(postTimestamp.getMinutes()).padStart(
    2,
    '0',
  )}`;

  return (
    <div className={cls.post}>
      <div className={cls.postImg}>
        {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      </div>

      <p className={cls.postTime}>
        {post.category} / {formattedDate}
      </p>

      <Link to={`/postDetails/${post.id}`}>
        <h2 className={cls.postTitle}>{post.title}</h2>
      </Link>
    </div>
  );
});

export default PostItem;
