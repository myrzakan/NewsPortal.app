import { getDatabase, onValue, push, ref } from 'firebase/database';
import React from 'react';
import { useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { app, auth } from '../../../../FirebaseConfig'; // Импорт auth из FirebaseConfig
import styles from './authButtonCommitsStyles.module.scss';

// <-- get Firebase -->
const db = getDatabase(app);

const Comment = ({ comment }) => {
  // <-- Преобразование времени в формат "день месяца час:минута" -->
  const commentTimestamp = new Date(comment.timestamp);
  const options = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  // <-- Использование объекта Intl.DateTimeFormat для форматирования времени -->
  const formatter = new Intl.DateTimeFormat('ru-RU', options);
  const formattedTime = formatter.format(commentTimestamp);

  return (
    <div className={styles.review_container}>
      {/* <== Имя польз-ля ==> */}
      <p className={styles.username_text}>
        {comment.username || comment.user || userData?.username}
      </p>
      {/* <== Текст комментарии ==> */}
      <p className={styles.comment_text}>{comment.text}</p>
      {/* <== Время добавленного комм-и ==> */}
      <p className={styles.timestamp_text}>{formattedTime}</p>
    </div>
  );
};

// <-- Компонент для отображения комментариев и добавления новых -->
const Comments = ({ postId }) => {
  const [userData, setUserData] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [newCommentText, setNewCommentText] = React.useState('');
  const [hasComments, setHasComments] = React.useState(true);

  // <-- Получение данных пользователя из Redux -->
  const username = useSelector(state => state.google);
  const user = useSelector(state => state.user);

  const { addToast } = useToasts();

  // <-- Загрузка комментариев из базы данных Firebase -->
  React.useEffect(() => {
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

  // <-- Получение данных текущего пользователя из Firebase -->
  React.useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = ref(db, `users/${currentUser.uid}`);
      onValue(userRef, snapshot => {
        const data = snapshot.val();
        setUserData(data);
      });
    }
  }, []);

  // <-- Обработчик отправки нового комментария -->
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
      {/* <== Форма для добавления нового комментария ==> */}
      <form onSubmit={handleSubmit} className="mb-4">
        {/* <== Поле ввода для текста нового комментария ==> */}
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
        {/* <== Отображение списка комментариев ==> */}
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
