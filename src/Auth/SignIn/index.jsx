
import { Button, Card, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from 'FirebaseConfig'
import React from 'react'
import { useForm } from 'react-hook-form'
import { BiHide, BiShow } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications' // Импортируем useToasts
import { setGoogleUserData } from 'store/slices/useGoogleSlice'
import { setUser } from 'store/slices/userSlice'
import { getDatabase, ref, onValue } from 'firebase/database'


import { app } from '../../FirebaseConfig'
import { Forms } from '../../helpers/Forms'

import '../../styledToast/index.css'


export const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(false)
  const [userData, setUserData] = React.useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm()

  const [showPass, setShowPass] = React.useState(false)
  const tooglePassword = () => setShowPass((prev) => !prev)

  const { addToast } = useToasts()


  React.useEffect(() => {
    const database = getDatabase();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
    }
  }, []);



  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        dispatch(setGoogleUserData({
          displayName: user.displayName,
          email: user.email,
        }))
        localStorage.setItem('google', JSON.stringify(user))
        addToast(`Успешно вошли ${user.displayName}`, {
          appearance: 'success',
          autoDismiss: 'true',
        })
        navigate('/')
        console.log(user)
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error)
        addToast('Ошибка: Не удалось войти с помощью Google', {
          appearance: 'error',
          autoDismiss: true,
        })
      })
  }



  const handleLogin = async ({ email, password, }) => {
    setIsLoading(true)
    try {

        const auth = getAuth(app)
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Обычная обработка входа пользователя
        // ...
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        }))

        setIsLoading(false)
        reset()
        navigate('/')
        // addToast(`Успешно вошли ${userData?.username}`, {
        //   appearance: 'success',
        //   autoDismiss: true,
        // })
        localStorage.setItem('user', JSON.stringify(user))
      
    } catch (error) {
      console.error(error)
      if (error.code === 'auth/wrong-password') {
        addToast('Ошибка: Неверный пароль', {
          appearance: 'error',
          autoDismiss: true,
          className: '.toastify__toast--error',
        })
      } else if (error.code === 'auth/invalid-email') {
        addToast('Ошибка: Неверный формат email', {
          appearance: 'error',
          autoDismiss: true,
        })
      } else if (error.code === 'auth/user-not-found') {
        addToast('Ошибка: Пользователь не найден', {
          appearance: 'error',
          autoDismiss: true,
        })
      } else if (error.code === 'auth/too-many-requests') {
        addToast('Ошибка: Доступ к этому аккаунту временно заблокирован из-за слишком многих неудачных попыток входа. Вы можете сбросить пароль для восстановления доступа или повторить попытку позже.', {
          appearance: 'error',
          autoDismiss: true,
        })
      } else {
        addToast('Ошибка: ' + error.message, {
          appearance: 'error',
          autoDismiss: true,
        })
      }
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex items-center justify-center relative w-full min-h-screen max-x4:w-[100%] max-x5:w-[60rem]">
      <div className="w-1/3">
        <h1 className="mb-3 text-4xl font-medium text-center max-x3:text-[22px]">Авторизация</h1>
        <Card className="p-5" bg="[var(--color-bg)]">
          <form onSubmit={handleSubmit(handleLogin)} className="bg-[var(--color-bg)]">
            <FormControl isInvalid={errors.email} className="mb-3 ">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                size="lg"
                placeholder="example@example.com"
                {...register('email', Forms.Rules.Email)}
                className="border"
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
                    size=""
                    h=""
                    bg="[var(--color-bg)]"
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
              size="lg"
              bg="var(--color-text-base)"
              disabled={isLoading}
              className={`mt-3 w-[100%] hover:bg-[red] ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Войти...' : 'Войти'}
            </Button>

            <p className="text-center my-2 text-[#7a7777]">или</p>

            <Button
              onClick={handleLoginGoogle}
              className="w-full"
              bg='var(--color-text-base)'
            >
              Google
            </Button>
          </form>

          <div className="mt-3 text-center">
            <p>
              Нет аккаунта ?{' '}
              <Link className="text-[var(--color-text-base)] hover:underline" to="../SignUp">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
