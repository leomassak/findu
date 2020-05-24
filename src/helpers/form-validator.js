import {
  validateEmail,
} from './validator';

export const validateLoginForm = (email, password) => {

  if (!email || !password) {
    return {
      error: true,
      errorMessage: 'Por favor, preencha todos os campos!',
    };
  }

  if (email.length > 254) {
    return {
      error: true,
      errorMessage: 'O email do usuário é maior do que o permitido!',
    };
  }

  if (!validateEmail(email)) {
    return {
      error: true,
      errorMessage: 'O E-mail digitado não está em um formato válido!',
    };
  }

  if (password.length < 6) {
    return {
      error: true,
      errorMessage: 'A senha deve conter no mínimo 6 caracteres!',
    };
  }

  if (password.length > 128) {
    return {
      error: true,
      errorMessage: 'A senha do usuário é maior do que o permitido!',
    };
  }

  return {
    error: false,
    errorMessage: '',
  };
};
