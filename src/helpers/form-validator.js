import {
  validateEmail, validateName,
} from './validator';

export const validateLoginForm = (email, password, name) => {

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

  if(!validateName(name)) {
    return {
      error: true,
      errorMessage: 'Telefone inválido!',
    }
  }

  return {
    error: false,
    errorMessage: '',
  };
};


export const validateRecoverPassword = (email) => {

  if (!email) {
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

  return {
    error: false,
    errorMessage: '',
  };
};

export const validateRedefinePassword = (token, password, confirmPassword) => {

  if (!token || !password || !confirmPassword) {
    return {
      error: true,
      errorMessage: 'Por favor, preencha todos os campos!',
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

  if (password !== confirmPassword) {
    return {
      error: true,
      errorMessage: 'A senha e a sua confirmação estão diferentes!',
    };
  }

  return {
    error: false,
    errorMessage: '',
  };
};
