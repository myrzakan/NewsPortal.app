import { Button, Card, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Forms } from '../../helpers/Forms';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from 'store/slices/userSlice';
import '../../styledToast/index.css';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../FirebaseConfig';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [showPass, setShowPass] = React.useState(false);
  const tooglePassword = () => setShowPass((prev) => !prev);

  const handleLogin = async (formData) => {
    try {
      const auth = getAuth(app);
      const { email, password, username } = formData;

      if (!email || !password) {
        toast.error('Ошибка: Введите email и пароль', {
          position: 'top-center',
          autoClose: 2000,
          className: 'custom-toast-error'
        });
        return; // Проверка, что email и password заполнены
      }
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      dispatch(setUser({  
        name: username,
        email: user.email,
        id: user.uid,
        token: user.accessToken,
      }));
      
      // Очистить поля ввода после успешного входа
      reset();
      console.log(user);
      console.log(formData);
      
      navigate('/');
    } catch (error) {
      console.error(error);
      // Показать специфическое сообщение об ошибке от Firebase
      if (error.code === 'auth/wrong-password') {
      // Обработка ошибки неверного пароля
      toast.error('Ошибка: Неверный пароль', {
        position: 'top-center',
        autoClose: 2000,
        className: 'custom-toast-error'
      });
    } else if (error.code === 'auth/invalid-email') {
      // Обработка ошибки неверного формата email
      toast.error('Ошибка: Неверный формат email', {
        position: 'top-center',
        autoClose: 2000,
        className: 'custom-toast-error'
      });
    } else if (error.code === 'auth/user-not-found') {
       // Обработка ошибки неверного формата email
        toast.error('Ошибка: Пользователь не найден', {
        position: 'top-center',
        autoClose: 2000,
        className: 'custom-toast-error'
      });
    } else {
      // Обработка других ошибок от Firebase
      toast.error('Ошибка: ' + error.message, {
        position: 'top-center',
        autoClose: 2000,
        className: 'custom-toast-error'
      });
    }
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);


  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-1/3">
        <h1 className="mb-3 text-4xl font-medium text-center">Авторизация</h1>
        <Card className="p-5">
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl isInvalid={errors.email} className="mb-3">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                size="lg"
                placeholder="example@example.com"
                {...register('email', Forms.Rules.Email)}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password} className="mb-3">
              <FormLabel>Пароль</FormLabel>
              <InputGroup>
                <Input
                  type={showPass ? 'text' : 'password'}
                  placeholder="********"
                  size="lg"
                  {...register('password', Forms.Rules.Password)}
                />
                <InputRightElement className="!w-12">
                  <Button h="1.75rem" size="sm" onClick={tooglePassword}>
                    {showPass ? <BiHide /> : <BiShow />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="telegram"
              size="lg"
              className="mt-3"
            >
              Войти
            </Button>
          </form>

          <div className="mt-3 text-center">
            <p>
              Нет аккаунта ?{' '}
              <Link className="text-blue-600 underline" to="../SignUp">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
