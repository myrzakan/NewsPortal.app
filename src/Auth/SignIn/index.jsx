import { Button, Card, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Forms } from '../../helpers/Forms';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications'; // Импортируем useToasts
import '../../styledToast/index.css';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../FirebaseConfig';
import { setUser } from 'store/slices/userSlice';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [showPass, setShowPass] = React.useState(false);
  const tooglePassword = () => setShowPass((prev) => !prev);

  const { addToast } = useToasts(); 



  const handleLogin = async (formData) => {
    setIsLoading(true)
    try {
      const auth = getAuth(app);
      const { email, password, username } = formData;

      if (!email || !password) {
        addToast('Ошибка: Введите email и пароль', { // Используем addToast для вывода уведомления
          appearance: 'error',
          autoDismiss: true,
        });
        return;
      }
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      dispatch(setUser({  
        name: username,
        email: user.email,
        id: user.uid,
        token: user.accessToken,
      }))

      reset();
      // console.log(user);
      // console.log(formData);
      navigate('/');
      addToast('Успешно вошли', {
        appearance: 'success',
        autoDismiss: 'true'
      })
    } catch (error) {
      console.error(error);

      if (error.code === 'auth/wrong-password') {
        addToast('Ошибка: Неверный пароль', {
          appearance: 'error',
          autoDismiss: true,
          className: '.toastify__toast--error'
        });
      } else if (error.code === 'auth/invalid-email') {
        addToast('Ошибка: Неверный формат email', {
          appearance: 'error',
          autoDismiss: true,
        });
      } else if (error.code === 'auth/user-not-found') {
        addToast('Ошибка: Пользователь не найден', {
          appearance: 'error',
          autoDismiss: true,
        });
      } else if (error.code === 'auth/too-many-requests') {
        addToast('Ошибка: Доступ к этому аккаунту временно заблокирован из-за слишком многих неудачных попыток входа. Вы можете сбросить пароль для восстановления доступа или повторить попытку позже.', {
          appearance: 'error',
          autoDismiss: true,
        });
      } else {
        addToast('Ошибка: ' + error.message, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
      setIsLoading(false)
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);


  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-1/3">
        <h1 className="mb-3 text-4xl font-medium text-center">Авторизация</h1>
        <Card className="p-5" bg='[var(--color-bg )] custom-transition'>
          <form onSubmit={handleSubmit(handleLogin)} className='bg-[var(--color-bg)]'>
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
                  {...register('password', Forms.Rules.PasswordSignIn)}
                />
                <InputRightElement className="!w-12">
                  <Button 
                    size=''
                    h=''
                    bg='[var(--color-bg)]'
                    onClick={tooglePassword}>
                      {showPass ? 
                        <BiHide className="text-[var(--color-text-base)] bg-[var(--color-bg)] text-[20px]"/> 
                        : <BiShow className="text-[var(--color-text-base)] bg-[var(--color-bg)] text-[20px]"/>}
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
              disabled={isLoading}
              className={`mt-3 w-[37.5rem] ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Войти...' : 'Войти'}
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
