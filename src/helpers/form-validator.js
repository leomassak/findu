import {
  validateEmail, validateName, validateBirthdate,
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

  if (!validateName(name)) {
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

export const validateRegisterForm = (name, birthday, phone, email, password, confirmPassword, terms, location) => {
  if (!name || !birthday || !phone || !email || !password || !confirmPassword || terms === false || location === false) {
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

  if (password !== confirmPassword) {
    return {
      error: true,
      errorMessage: 'A senha e a sua confirmação estão diferentes!',
    };
  }

  if (!validateName(name)) {
    return {
      error: true,
      errorMessage: 'Nome invalido!',
    }
  }

  if (!validateBirthdate(birthday)) {
    return {
      error: true,
      errorMessage: 'Data de nascimento invalida!',
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

export const validateUpdateUser = (name, phone, birthday) => {
  if (!name || !phone) {
    return {
      error: true,
      errorMessage: 'Por favor, preencha todos os campos!',
    };
  }

  if (!validateName(name)) {
    return {
      error: true,
      errorMessage: 'Nome invalido!',
    }
  }

  if (!validateBirthdate(birthday)) {
    return {
      error: true,
      errorMessage: 'Data de nascimento invalida!',
    }
  }

  return {
    error: false,
    errorMessage: '',
  };
};