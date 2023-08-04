import firebase from 'firebase/compat/app'
import React from 'react'
import 'firebase/compat/database'
import { useToasts } from 'react-toast-notifications'
import 'react-toastify/dist/ReactToastify.css'

const CreateCategory = () => {
  const { addToast } = useToasts()
  const [category, setCategory] = React.useState('')
  const [categories, setCategories] = React.useState([])

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleCategoryCreate = () => {
    if (category.trim() === '') {
      addToast('Пожалуйста, введите название категории', {
        appearance: 'error',
        autoDismiss: 'true',
      })
      return
    }

    const database = firebase.database()
    const categoriesRef = database.ref('categories')

    const newCategoryRef = categoriesRef.push()
    const newCategory = {
      id: newCategoryRef.key,
      name: category,
    }

    newCategoryRef
      .set(newCategory)
      .then(() => {
        addToast('Категория успешно создана', {
          appearance: 'success',
          autoDismiss: 'true',
        })
        setCategory('')
      })
      .catch((error) => {
        addToast(`Ошибка: ${error}`, {
          appearance: 'error',
          autoDismiss: 'true',
        })
      })
  }
}