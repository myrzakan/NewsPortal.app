import { getDatabase, onValue, push, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { app, auth } from '../../../../FirebaseConfig'; // Импорт auth из FirebaseConfig
import styles from './authButtonCommitsStyles.module.scss';

const db = getDatabase(app);

const Comment = ({ comment }) => {
  const commentTimestamp = new Date(comment.timestamp);
  const options = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat('ru-RU', options);
  const formattedTime = formatter.format(commentTimestamp);

  return (
    <div className={styles.review_container}>
      <p className={styles.username_text}>
        {comment.username || comment.user || userData?.username}
      </p>
      <p className={styles.comment_text}>{comment.text}</p>
      <p className={styles.timestamp_text}>{formattedTime}</p>
    </div>
  );
};

const Comments = ({ postId }) => {
  const [userData, setUserData] = React.useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [hasComments, setHasComments] = useState(true);

  const username = useSelector(state => state.google);
  const user = useSelector(state => state.user);

  const { addToast } = useToasts();

  useEffect(() => {
    const commentsRef = ref(db, 'comments/' + postId);

    const unsubscribe = onValue(commentsRef, snapshot => {
      const commentsData = snapshot.val();
      if (commentsData) {
        const commentsArray = Object.values(commentsData);
        setComments(commentsArray.reverse());
        setHasComments(true);
      } else {
        setComments([]);
        setHasComments(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [postId]);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = ref(db, `users/${currentUser.uid}`);
      onValue(userRef, snapshot => {
        const data = snapshot.val();
        setUserData(data);
      });
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (newCommentText.trim() === '' || !username) return;

    const commentsRef = ref(db, 'comments/' + postId);
    const newComment = {
      text: newCommentText,
      username: username.displayName || user.name || userData?.username,
      timestamp: Date.now(),
    };
    setNewCommentText('');

    push(commentsRef, newComment);

    addToast('Отзыв добавлен 👍', {
      appearance: 'success',
      autoDismiss: 'true',
    });
  };

  return (
    <div className={styles.comment_content}>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          placeholder="Ваш отзыв"
          value={newCommentText}
          onChange={e => setNewCommentText(e.target.value)}
          className={styles.review_input}
        />
        <button type="submit">Добавить отзыв</button>
      </form>
      <div className="max-h-[330px] overflow-y-auto">
        <h3>Отзывы:</h3>
        {hasComments ? (
          comments.map(comment => (
            <Comment key={comment.timestamp} comment={comment} />
          ))
        ) : (
          <p className={styles.noComments}>Отзывы к этому посту пока нет.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
