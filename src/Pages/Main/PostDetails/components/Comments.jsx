import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { app, auth } from "../../../../FirebaseConfig"; // Импорт auth из FirebaseConfig
import { getDatabase, ref, onValue, push } from "firebase/database";

const db = getDatabase(app);

const Comment = ({ comment }) => {
  const formattedTime = new Date(comment.timestamp).toLocaleString();

  return (
    <div className="border border-[#7a7777] rounded-lg p-4 my-4 w-[750px]">
      <p className="text-[var(--color-text)] mb-2">
        {comment.username || comment.user || userData?.username}
      </p>
      <p className="text-[var(--color-text-base)]">{comment.text}</p>
      <p className="text-sm text-[var(--color-text)]">{formattedTime}</p>
    </div>
  );
};

const Comments = ({ postId }) => {
  const [userData, setUserData] = React.useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [hasComments, setHasComments] = useState(true);

  const username = useSelector((state) => state.google);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const commentsRef = ref(db, "comments/" + postId);

    const unsubscribe = onValue(commentsRef, (snapshot) => {
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
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
    }
  }, []); // Зависимости пусты, чтобы эффект выполнялся только при монтировании компонента

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCommentText.trim() === "" || !username) return;

    const commentsRef = ref(db, "comments/" + postId);
    const newComment = {
      text: newCommentText,
      username: username.displayName || user.name || userData?.username,
      timestamp: Date.now(),
    };
    setNewCommentText("");

    push(commentsRef, newComment);
  };

  return (
    <div className="max-h-[400px] w-[800px] mb-[100px] relative left-[540px] ">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          placeholder="Ваш отзыв"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          className="border border-[#7a7777] rounded p-1 pt-1 w-full bg-[var(--color-bg)] focus:outline-none placeholder:italic"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Добавить отзыв
        </button>
      </form>
      <div className="max-h-[330px] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-2">Отзывы:</h3>
        {hasComments ? (
          comments.map((comment) => (
            <Comment key={comment.timestamp} comment={comment} />
          ))
        ) : (
          <p className="italic text-center text-[]">
            Отзывы к этому посту пока нет.
          </p>
        )}
      </div>
    </div>
  );
};

export default Comments;
