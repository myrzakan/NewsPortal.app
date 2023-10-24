import {
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth, provider } from 'FirebaseConfig';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { setGoogleUserData } from 'store/slices/useGoogleSlice';
import { setUser } from 'store/slices/userSlice';
import { Forms } from '../../helpers/Forms';
import { BiHide, BiShow } from 'react-icons/bi'


export const SignUp = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [name, setName] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setConfirmPass] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const tooglePassword = () => setShowPass((prev) => !prev);
  const toogleConfirmPassword = () => setConfirmPass((prev) => !prev);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          setGoogleUserData({
            displayName: user.displayName,
            email: user.email,
          })
        );
        localStorage.setItem('google', JSON.stringify(user));
        addToast(`Успешно вошли ${user.displayName}`, {
          appearance: 'success',
          autoDismiss: 'true',
        });
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
        addToast('Ошибка: Не удалось войти с помощью Google', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const handleRegister = async (data) => {
    const { email, password, username } = data;
    const auth = getAuth();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
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
        })
      );

      navigate('/');
      addToast(`Аккаунт успешно создан ${username}`, {
        appearance: 'success',
        autoDismiss: 'true',
      });
    } catch (error) {
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

  const handleFormSubmit = (data) => {
    handleRegister(data);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[var(--color-bg)] ">
      <div className="w-1/3">
        <h1 className="mb-3 text-4xl font-medium text-center">Регистрация</h1>

        <Card className="p-5 " bg="[var(--color-bg)]">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl
              className="mb-3 bg-[var(--color-bg)] transition"
              isInvalid={errors.username}
            >
              <FormLabel className="bg-[var(--color-bg)]">
                Имя пользователя
              </FormLabel>
              <Input
                placeholder="name"
                size="lg"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                {...register('username', Forms.Rules.Username)}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email} className="mb-3">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                size="lg"
                placeholder="user@user.com"
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
                  className=""
                />
                <InputRightElement>
                  <Button
                    size=""
                    h=""
                    bg="[var(--color-bg)]"
                    onClick={tooglePassword}
                  >
                    {showPass ? (
                      <BiHide className="text-[var(--color-text-base)] bg-[var(--color-bg)] text-[20px]" />
                    ) : (
                      <BiShow className="text-[var(--color-text-base)] bg-[var(--color-bg)] text-[20px]" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.passwordConfirm} className="mb-3">
              <FormLabel>Подтверждение пароли</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPass ? 'text' : 'password'}
                  placeholder="********"
                  size="lg"
                  {...register('passwordConfirm', {
                    ...Forms.Rules.Password,
                    validate: {
                      match: (value) =>
                        getValues().password === value || 'Пароли не совпадают',
                    },
                  })}
                />
                <InputRightElement className="">
                  <Button
                    size=""
                    h=""
                    bg="[var(--color-bg)]"
                    onClick={toogleConfirmPassword}
                  >
                    {showConfirmPass ? (
                      <BiHide className="text-[var(--color-text-base)] bg-[var(--color-bg)] text-[20px]" />
                    ) : (
                      <BiShow className="text-[var(--color-text-base)] bg-[var(--color-bg)] text-[20px]" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.passwordConfirm && errors.passwordConfirm.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              size="lg"
              bg="var(--color-text-base)"
              disabled={isLoading}
              className={`mt-3 w-full ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Регистрация...' : 'Регистрация'}
            </Button>

            <p className="text-center my-2 text-[#7a7777]">или</p>

            <Button 
              onClick={handleLoginGoogle} 
              className="w-full"
              bg='var(--color-text-base)'
              >
              Google
            </Button>

            <div className="mt-3 text-center">
              <p>
                Есть аккаунт?{' '}
                <Link className="text-[var(--color-text-base)] hover:underline" to="../SignIn">
                  Авторизуйтесь
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
