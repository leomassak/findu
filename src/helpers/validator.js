import EmailValidator from 'email-validator';

export const validateEmail = (email) => EmailValidator.validate(email);