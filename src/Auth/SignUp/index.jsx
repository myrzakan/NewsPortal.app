import { Button, Card, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, PopoverBody } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Forms } from '../../helpers/Forms'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { setUser } from 'store/slices/userSlice'

import { signUp } from '../AuthForm/Signup'

import { BiHide, BiShow } from 'react-icons/bi'

export const SignUp = () => {

  const dispatch = useDispatch() 

  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setConfirmPass] = React.useState(false);

  const tooglePassword = () => setShowPass(prev => !prev);
  const toogleConfirmPassword = () => setConfirmPass(prev => !prev);

  const {
    register,
    handleSubmit,
    getValues,  
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleRegister = async (data) => {
    const { email, password } = data;
    const auth = getAuth();
    // console.log(auth);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      dispatch(setUser({
        name: user.name,
        email: user.email,
        id: user.uid,
        token: user.accessToken
      }));

      navigate('/')
      // Обработка успешной регистрации пользователя (если нужно)
    } catch (error) {
      // const errorCode = error.code;
      console.log(error);
      // const errorMessage = error.message;
      // Обработка ошибки регистрации пользователя (если нужно)
    }
  };
  


  React.useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);


  return (
    <div className="flex items-center justify-center w-full min-h-screen">

      <div className="w-1/3">
        <h1 className="mb-3 text-4xl font-medium text-center">Регистрация</h1>

        <Card className="p-5 bg-neutral-900">

          <FormControl
            className="mb-3 bg-[var(--color-bg-base)]"
            isInvalid={errors.username}
          >
            <FormLabel
              className="bg-[var(--color-bg-base)]"
            >
              Имя пользователя
            </FormLabel>
            <Input
              placeholder="spiderman"
              size="lg"
              {
                ...register('username', Forms.Rules.Username)
              }
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.email}
            className="mb-3"
          >
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              size="lg"
              placeholder="example@example.com"
              {
                ...register('email', Forms.Rules.Email)
              }
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.password}
            className="mb-3"
          >
              <FormLabel>Пароль</FormLabel>
            <InputGroup>
              <Input
                type={showPass ? 'text' : 'password'}
                placeholder="********"
                size="lg"
                {
                  ...register('password', Forms.Rules.Password)
                }
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

          <FormControl
            isInvalid={errors.passwordConfirm}
            className="mb-3"
          >
            <FormLabel>Подтверждение пароли</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPass ? 'text' : 'password'}
                placeholder="********"
                size="lg"
                {
                  ...register('passwordConfirm', {
                    ...Forms.Rules.Password,
                    validate: {
                      match: value => getValues().password === value || 'Пароли не совпадают',
                    },
                  })
                }
              />
              <InputRightElement className="!w-12">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={toogleConfirmPassword}
                >
                  {showConfirmPass ? <BiHide /> : <BiShow />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.passwordConfirm && errors.passwordConfirm.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            onClick={handleSubmit(handleRegister)}
            colorScheme="telegram"
            size="lg"
            className="mt-3"
          >Регистрация</Button>

          <div className="mt-3 text-center">
            <p>Есть аккаунт? 
              <Link className="text-blue-600 underline" to="../SignIn">
                Авторизуйтесь
              </Link></p>
          </div>
        </Card>
      </div>
    </div>
  )
}