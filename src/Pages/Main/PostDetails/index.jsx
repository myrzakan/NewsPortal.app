import React from 'react'
import { useParams } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import firebaseConfig from '../../../FirebaseConfig'
import Comments from './components/Comments' // Подключаем компонент Comments
import { useSelector } from 'react-redux'
import { AuthButtonPostDetals } from './components/authButton'

const PostDetails = () => {
  const { postId } = useParams()
  const [post, setPost] = React.useState(null)

  React.useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }

    const database = firebase.database()
    const postRef = database.ref(`posts/${postId}`)

    postRef.on('value', (snapshot) => {
      const postData = snapshot.val()
      setPost(postData)
    })

    return () => {
      postRef.off()
    }
  }, [postId])

  const Google = useSelector((state) => state.google)
  const User = useSelector((state) => state.user)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!post) {
    return <div className="pt-[400px] mb-[500px] text-[35px] flex justify-center">Loading...</div>
  }

  const formattedTimestamp = new Date(post.timestamp).toLocaleString()
  const content = { __html: post.content }

  return (
    <div className="relative top-0 max-h-[1000rem] mt-[100px] pt-[50px]">
      <h2 className="text-[30px] font-bold text-[var(--color-text)] mb-3 relative left-[550px] w-[780px]">
        {post.title}
      </h2>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-[800px] h-450px object-cover rounded-lg mb-[10px] ml-[540px]"
        />
      )}
      <div className="flex">
        <p className="relative left-[550px] my-2 text-[var(--color-text-base)]">{formattedTimestamp}</p>
      </div>
      <div className="mx-[570px] text-[20px] relative right-7 mb-10" dangerouslySetInnerHTML={content}></div>

      {User.isAuthenticated ||  Google.isAuthenticated ? (
        <Comments postId={postId} />
      ) : (
        <AuthButtonPostDetals />
      )}

    </div>
  )
}

export default PostDetails
