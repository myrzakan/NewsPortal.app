import { useSelector } from 'react-redux'

export function useAuth() {
  const { name, email, token, id } = useSelector(state => state.user)

  return {
    isAuth: !!email,
    name,
    email,
    token,
    id
  }
}