import { useSelector } from 'react-redux'

export function useAdmin() {
  const { name, email, password} = useSelector((state) => state.admin)

  return {
    isAdmin: !!email,
    name,
    email,
    password,
   
  }
}