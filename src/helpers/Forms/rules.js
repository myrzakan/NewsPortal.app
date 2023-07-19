import { Regex } from './regex'

const required = 'Обязательное поле'

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
  },
  Email: {
    required,
    pattern: {
      value: Regex.Email,
      message: 'Некорректный формат почты',
    },
  },
  Password: {
    required: 'Обязательное поле',
    minLength: {
      value: 8,
      message: 'Минимум 8 символов',
    },
    maxLength: {
      value: 20,
      message: 'Максимум 20 символов',
    },
  },
  Identity: {
    required,
    maxLength: {
      value: 29,
      message: 'Максимум 29 символов',
    },
    minLength: {
      value: 4,
      message: 'Минимум 4 символа',
    },
  }
}
