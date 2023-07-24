import { Button, Card, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Forms } from '../../helpers/Forms';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setUser } from 'store/slices/userSlice'

import { Signin } from '../AuthForm/Signin';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const SignIn = () => {

  const [ email, setEmail ] = React.useState('')
  const [ password, setPassword ] = React.useState('')


  const [showPass, setShowPass] = React.useState(false);
  const navigate = useNavigate(); // Добавлено: получение функции navigate

  const tooglePassword = () => setShowPass(prev => !prev);
  const dispatch = useDispatch()

  
  const handleLogin = ( e ) => {
    const auth = getAuth();
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(console.log)
      .catch(console.error)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    await Signin(data, navigate); // Изменено: передача функции navigate
  };


  React.useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);


  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-1/3">
        <h1 className="mb-3 text-4xl font-medium text-center">Авторизация</h1>
        <Card className="p-5">
          <FormControl isInvalid={errors.email} className="mb-3">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              size="lg"
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
              {...register('identity', Forms.Rules.Identity)}
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
                value={password}
                placeholder="********"
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleSubmit(handleLogin)}
            colorScheme="telegram"
            size="lg"
            className="mt-3"
          >
            Войти
          </Button>

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
