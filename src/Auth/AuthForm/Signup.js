import { pb } from '../../api';
import { toast } from 'react-toastify';

export const signUp = async (data, navigate) => {
  try {
    // Создаем FormData объект
    const formData = new FormData();

    // Добавляем данные в FormData объект
    formData.append('username', data.username);
    formData.append('email', data.email);
    // formData.append('emailVisibility', data.emailVisibility.toString());
    formData.append('password', data.password);
    formData.append('passwordConfirm', data.passwordConfirm);
    formData.append('name', data.name);

    // Отправка POST-запроса на создание пользователя с использованием FormData
    await pb.post('/users/records', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

  
    // Перенаправление на страницу входа в случае успешной регистрации
    navigate('../SignIn');
  } catch (error) {
    // Обработка ошибок: вывод сообщения об ошибке из ответа сервера (e.response.data.message)
    toast.error(error.message, {
      position: 'top-center',
      autoClose: 3000,
    });
  } finally {
    // Вывод данных, которые были переданы в функцию (data)
    console.log(data);
  }
};
