import { Regex } from './regex'

const required = 'Обязательное поле'
const hasNumber = value => /\d/.test(value);
const hasUppercaseLetter = value => /[A-Z]/.test(value);
const containsOnlyLettersAndNumbers = value => /^[a-zA-Z0-9]+$/.test(value);


export const Rules = {
  Username: {
    required,
    pattern: {
      value: Regex.Username,
      message: 'Некорректный формат имени пользователя.',
    },
    maxLength: {
      value: 29,
      message: 'Максимум 29 символов',
    },
    minLength: {
      value: 4,
      message: 'Минимум 4 символа',
    },
    validate: {
      hasUppercaseLetter: value => hasUppercaseLetter(value) || 'Имя пользователя должен содержать хотя бы одну заглавную букву',
    }
  },
  Email: {
    required,
    pattern: {
      value: Regex.Email,
      message: 'Некорректный формат почты',
    },
    validate: {
      validFormat: value => Regex.LowercaseEmail.test(value) || 'Используйте только маленькие буквы в email',
    }
  },
  Password: {
    required,
    minLength: {
      value: 8,
      message: 'Минимум 8 символов',
    },
    maxLength: {
      value: 20,
      message: 'Максимум 20 символов',
    },
    validate: {
      hasNumber: value => hasNumber(value) || 'Пароль должен содержать хотя бы одну цифру',
      hasUppercaseLetter: value => hasUppercaseLetter(value) || 'Пароль должен содержать хотя бы одну заглавную букву',
      containsOnlyLettersAndNumbers: value => containsOnlyLettersAndNumbers(value) || 'Пароль должен содержать только буквы и цифры',
    },
  },
  PasswordSignIn: {
    required,
    minLength: {
      value: 8,
      message: 'Минимум 8 символов',
    },
    maxLength: {
      value: 20,
      message: 'Максимум 20 символов',
    },

  }
}
