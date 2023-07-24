import axios from 'axios';
import { toast } from 'react-toastify';

export const Signin = async (data, navigate) => {
  try {
    const response = await axios.post('http://127.0.0.1:8090/api/collections/users/auth-with-password', data);
    
    // Проверяем успешность авторизации
    if (response.status === 200) {
      // Обрабатываем успешную авторизацию
      // ...
      localStorage.setItem('pocketbase_auth', JSON.stringify(data))

      // Переходим на главную страницу
      navigate('/');
    } else {
      // ...
    }
  } catch (error) {
    // Обрабатываем ошибку
    toast(error.response.data.message, {
      position: 'top-center',
      autoClose: 3000,
      type: 'error'
    });
  } finally {
    console.log(data);
  }
};