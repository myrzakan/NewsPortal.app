// utils/localStorage.js
export const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const loadGoogleUserDataFromLocalStorage = () => {
  const googleUserData = localStorage.getItem('google')
  return googleUserData ? JSON.parse(googleUserData) : null
}
