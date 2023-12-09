// ? <-- SignIn -->
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { auth, provider } from 'FirebaseConfig';
import 'boxicons';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { get, getDatabase, onValue, ref } from 'firebase/database';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BiHide, BiShow } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'; // Импортируем useToasts
import { setGoogleUserData } from 'store/slices/useGoogleSlice';
import { setUser } from 'store/slices/userSlice';

import { app } from '../../FirebaseConfig';
import { Forms } from '../../helpers/Forms';

import styles from './SignIn.module.scss';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState(null);

  // ? <-- React-Hook-Form -->
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // ? <-- Состояние для отображения или скрытия пароля -->
  const [showPass, setShowPass] = React.useState(false);
  const tooglePassword = () => setShowPass(prev => !prev);

  const { addToast } = useToasts();

  // ? <-- Запрос данных о пользователе из базы данных Firebase -->
  React.useEffect(() => {
    const database = getDatabase();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      onValue(userRef, snapshot => {
        const data = snapshot.val();
        setUserData(data);
      });
    }
  }, []);

  // ? <-- Обработчик входа через Google -->
  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        dispatch(
          setGoogleUserData({
            displayName: user.displayName,
            email: user.email,
          }),
        );
        localStorage.setItem('google', JSON.stringify(user));
        addToast(`Успешно вошли ${user.displayName}`, {
          appearance: 'success',
          autoDismiss: 'true',
        });
        navigate('/');
        // console.log(user);
      })
      .catch(error => {
        console.error('Error signing in with Google:', error);
        addToast(
          'К сожалению, в данный момент возникли временные технические неполадки, и сервис Google временно недоступен',
          {
            appearance: 'error',
            autoDismiss: true,
          },
        );
        // addToast('Ошибка: Не удалось войти с помощью Google', {
        //   appearance: 'error',
        //   autoDismiss: true,
        // });
      });
  };

  //? <-- Обработчик входа через форму -->
  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      if (email === 'admin@gmail.com' && password === 'admin2004') {
        navigate('/AdminPanel');
      }

      //? <-- Получае дополнительные данные о пользователе из Firebase -->
      const database = getDatabase();
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      const userData = snapshot.val();

      localStorage.setItem('userData', JSON.stringify(userData.username));

      setUserData(userData);

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        }),
      );

      setIsLoading(false);
      reset();
      navigate('/');
      addToast(`Успешно вошли ${userData?.username}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      // ? <-- Обработка различных ошибок входа -->
      if (error.code === 'auth/wrong-password') {
        addToast('Ошибка: Неверный пароль', {
          appearance: 'error',
          autoDismiss: true,
          className: '.toastify__toast--error',
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
        addToast(
          'Ошибка: Доступ к этому аккаунту временно заблокирован из-за слишком многих неудачных попыток входа. Вы можете сбросить пароль для восстановления доступа или повторить попытку позже.',
          {
            appearance: 'error',
            autoDismiss: true,
          },
        );
      } else {
        addToast('Ошибка: ' + error.message, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.signIn_container}>
      <h1>Авторизация</h1>
      <div className={styles.signIn_content}>
        <form onSubmit={handleSubmit(handleLogin)}>
          {/*  <== Input Email ==> */}
          <FormControl isInvalid={errors.email}>
            <label>Email</label>
            <InputGroup className={styles.inputGroupEmail}>
              <Input
                type="email"
                size="lg"
                placeholder="example@example.com"
                borderColor="#777"
                _focus={{
                  borderColor: 'var(--color-text-base)',
                  boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)',
                }}
                _hover={{
                  borderColor: 'var(--color-text-base)',
                }}
                {...register('email', Forms.Rules.Email)}
              />
              <FormErrorMessage
                className={styles.formError}
                fontWeight="semibold"
                color="red.500"
              >
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </InputGroup>
          </FormControl>

          {/* <== Input Password ==> */}
          <FormControl isInvalid={errors.password}>
            <label>Пароль</label>
            <InputGroup>
              <Input
                type={showPass ? 'text' : 'password'}
                placeholder="********"
                size="lg"
                borderColor="#777"
                _focus={{
                  borderColor: 'var(--color-text-base)',
                  boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)',
                }}
                _hover={{
                  borderColor: 'var(--color-text-base)',
                }}
                {...register('password', Forms.Rules.PasswordSignIn)}
              />
              <InputRightElement>
                <Button
                  size=""
                  h=""
                  bg="transparent"
                  _hover={{
                    bg: 'transparent',
                  }}
                  onClick={tooglePassword}
                >
                  {showPass ? (
                    <BiHide className={styles.bi} />
                  ) : (
                    <BiShow className={styles.bi} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage
              className={styles.formError}
              fontWeight="semibold"
              color="red.500"
            >
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {/* <== Button Login ==> */}
          <Button
            type="submit"
            bg="var(--color-text-base)"
            disabled={isLoading}
            className={`mt-3  ${
              isLoading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            _hover={{
              opacity: 0.6,
            }}
          >
            {isLoading ? 'Войти...' : 'Войти'}
          </Button>

          <p className="text-center my-2 text-[#7a7777] font-[500]">или</p>

          {/* <== Button Gogle ==> */}
          <Button
            onClick={handleLoginGoogle}
            bg="var(--color-text-base)"
            _hover={{
              opacity: 0.6,
            }}
          >
            Google
          </Button>
        </form>

        {/* <== Link SignUp ==> */}
        <div className={styles.link}>
          <p>
            Нет аккаунта ?{' '}
            <Link
              className="text-[var(--color-text-base)] hover:underline"
              to="../SignUp"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
