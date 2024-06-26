import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import React from 'react';
import { Radio } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import firebaseConfig from '../../../FirebaseConfig';
import styles from './PostDetails.module.scss';
import Comments from './components/Comments';
import { AuthButtonPostDetals } from './components/authButton';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database();
    const postRef = database.ref(`posts/${postId}`);

    postRef.on('value', snapshot => {
      const postData = snapshot.val();
      setPost(postData);
      setLoading(false);
    });

    return () => {
      postRef.off();
    };
  }, [postId]);

  const Google = useSelector(state => state.google);
  const User = useSelector(state => state.user);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Radio
          visible={true}
          height="70"
          width="70"
          ariaLabel="radio-loading"
          wrapperStyle={{}}
          wrapperClass="radio-wrapper"
          colors={[
            'var(--color-text-base)',
            'var(--color-text-base)',
            'var(--color-text-base)',
          ]}
        />
      </div>
    );
  }

  const formattedTimestamp = new Date(post.timestamp).toLocaleString();
  const content = { __html: post.content };

  return (
    <div className={styles.postDetails_content}>
      <h2>{post.title}</h2>
      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post" className="mt-4 rounded-lg" />
      )}

      <p className={styles.post_time}>{formattedTimestamp}</p>

      <div
        className={styles.post_description}
        dangerouslySetInnerHTML={content}
      ></div>

      {User.isAuthenticated || Google.isAuthenticated ? (
        <Comments postId={postId} />
      ) : (
        <AuthButtonPostDetals />
      )}
    </div>
  );
};

export default PostDetails;
