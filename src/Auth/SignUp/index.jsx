// ? <-- SignUp -->
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { auth, provider } from 'FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BiHide, BiShow } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { setGoogleUserData } from 'store/slices/useGoogleSlice';
import { setUser } from 'store/slices/userSlice';
import { Forms } from '../../helpers/Forms';
import styles from './SignUp.module.scss';

export const SignUp = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [name, setName] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setConfirmPass] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // ? <-- Состояние для отображения или скрытия пароля -->
  const tooglePassword = () => setShowPass(prev => !prev);
  const toogleConfirmPassword = () => setConfirmPass(prev => !prev);

  // ? <-- React-Hook-Form -->
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

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
  const handleRegister = async data => {
    const { email, password, username } = data;
    const auth = getAuth();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      const userData = {
        username: username,
        email: user.email,
      };

      const database = getDatabase();
      await set(ref(database, 'users/' + user.uid), userData);

      dispatch(
        setUser({
          name: username,
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        }),
      );

      navigate('/');
      addToast(`Аккаунт успешно создан ${username}`, {
        appearance: 'success',
        autoDismiss: 'true',
      });
    } catch (error) {
      // ? <-- Обработка различных ошибок входа -->
      addToast('Не удалось создать аккаунт', {
        appearance: 'error',
        autoDismiss: 'true',
      });
      console.log(error);

      if (error.code === 'auth/email-already-in-use') {
        addToast('Ошибка: Этот электронный адрес уже существует', {
          appearance: 'error',
          autoDismiss: true,
          className: 'toastify__toast--error',
        });
      } else if (error.code === 'auth/invalid-email') {
        addToast('Ошибка: Недопустимый формат email', {
          appearance: 'error',
          autoDismiss: true,
        });
      } else {
        addToast('Ошибка: ' + error.message, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
      setIsLoading(false);
    }
  };

  const handleFormSubmit = data => {
    handleRegister(data);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.signUp_container}>
      <h1>Регистрация</h1>

      <div className={styles.signUp_content}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* <== Input Name ==> */}
          <FormControl
            className="mb-3 bg-[var(--color-bg)] transition"
            isInvalid={errors.username}
          >
            <label>Имя пользователя</label>
            <Input
              placeholder="name"
              size="lg"
              defaultValue={name}
              onChange={e => setName(e.target.value)}
              borderColor="#777"
              _focus={{
                borderColor: 'var(--color-text-base)',
                boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)',
              }}
              _hover={{
                borderColor: 'var(--color-text-base)',
              }}
              {...register('username', Forms.Rules.Username)}
            />
            <FormErrorMessage
              className={styles.formError}
              fontWeight="semibold"
              color="red.500"
            >
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          {/* <== Input Email ==> */}
          <FormControl isInvalid={errors.email} className="mb-3">
            <label>Email</label>
            <Input
              type="email"
              size="lg"
              placeholder="user@user.com"
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
          </FormControl>

          {/* <== Input Password ==> */}
          <FormControl isInvalid={errors.password} className="mb-3">
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
                {...register('password', Forms.Rules.Password)}
                className=""
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

          {/* <== Input Password Confirm ==> */}
          <FormControl isInvalid={errors.passwordConfirm} className="mb-3">
            <label>Подтверждение пароли</label>
            <InputGroup>
              <Input
                type={showConfirmPass ? 'text' : 'password'}
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
                {...register('passwordConfirm', {
                  ...Forms.Rules.Password,
                  validate: {
                    match: value =>
                      getValues().password === value || 'Пароли не совпадают',
                  },
                })}
              />
              <InputRightElement className="">
                <Button
                  size=""
                  h=""
                  bg="transparent"
                  _hover={{
                    bg: 'transparent',
                  }}
                  onClick={toogleConfirmPassword}
                >
                  {showConfirmPass ? (
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
              {errors.passwordConfirm && errors.passwordConfirm.message}
            </FormErrorMessage>
          </FormControl>

          {/* <== Button SignUp ==> */}
          <Button
            type="submit"
            // size="lg"
            bg="var(--color-text-base)"
            disabled={isLoading}
            _hover={{
              opacity: 0.6,
            }}
            className={`mt-3 w-full ${
              isLoading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Регистрация...' : 'Регистрация'}
          </Button>

          <p className="text-center my-2 text-[#7a7777] font-[500]">или</p>

          {/* <== Button SignUp Google ==> */}
          <Button
            onClick={handleLoginGoogle}
            className="w-full"
            _hover={{
              opacity: 0.6,
            }}
            bg="var(--color-text-base)"
          >
            Google
          </Button>

          {/* <== Link SignIn ==> */}
          <div className={styles.link}>
            <p>
              Есть аккаунт?{' '}
              <Link
                className="text-[var(--color-text-base)] hover:underline"
                to="../SignIn"
              >
                Авторизуйтесь
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
