import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Button, Card, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { removeAdmin } from "store/slices/useAdminSlice";

export const AdminLogin = () => {
  const [showPass, setShowPass] = useState(false);
  const togglePassword = () => setShowPass((prev) => !prev);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmailInput, setEnteredEmailInput] = useState(""); // Состояние для введенного email
  const [enteredPasswordInput, setEnteredPasswordInput] = useState(""); // Состояние для введенного пароля
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Используйте useSelector для получения данных из хранилища Redux
  const adminCredentials = useSelector((state) => state.admin);
  console.log(adminCredentials, 'sex');

  const handleLogin = () => {
    setIsLoading(true);

    // Получите данные из хранилища Redux
    const enteredEmail =  adminCredentials.email;
    const enteredPassword =  adminCredentials.password;

    // console.log("Введенный email:", enteredEmailInput);
    // console.log("Введенный пароль:", enteredPasswordInput);

    // Проверьте, являются ли введенные данные корректными
    if (enteredEmail === enteredEmailInput && enteredPassword === enteredPasswordInput) {
      // Вход выполнен успешно
      setIsLoading(false); // Устанавливаем обратно isLoading в false
      dispatch(removeUser());
      // dispatch(removeAdmin())
      navigate('/AdminPanel');
    } else {
      // Вход не выполнен, обрабатываем ошибку
      setIsLoading(false); // Устанавливаем обратно isLoading в false
      alert('Ошибка: Неверный email или пароль');
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-1/3">
        <h1 className="mb-3 text-4xl font-medium text-center">Вход</h1>
        <Card className="p-5" bg="[var(--color-bg)] custom-transition">
          <form className="bg-[var(--color-bg)]">
            <FormControl className="mb-3">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                defaultValue={enteredEmailInput}
                size="lg"
                placeholder="example@example.com"
                onChange={(e) => setEnteredEmailInput(e.target.value)} // Сохраняем введенный email в состояние
              />
            </FormControl>

            <FormControl className="mb-3">
              <FormLabel>Пароль</FormLabel>
              <InputGroup>
                <Input
                  type={showPass ? 'text' : 'password'}
                  defaultValue={enteredPasswordInput}
                  placeholder="********"
                  size="lg"
                  onChange={(e) => setEnteredPasswordInput(e.target.value)} // Сохраняем введенный пароль в состояние
                />
              <InputRightElement className="!w-12">
                  <Button 
                    size=''
                    h=''
                    bg='[var(--color-bg)]'
                    onClick={togglePassword}>
                      {showPass ? 
                        <BiHide className="text-[var(--color-text-base)] bg-[var(--color-bg)] text-[20px]"/> 
                        : <BiShow className="text-[var(--color-text-base)] bg-[var(--color-bg)] text-[20px]"/>}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="button" // Используем type="button" чтобы не вызывать действие по умолчанию для формы
              colorScheme="telegram"
              size="lg"
              disabled={isLoading}
              className={`mt-3 w-[100%]`}
              onClick={handleLogin}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

