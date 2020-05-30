import EmailValidator from 'email-validator';

export const validateEmail = (email) => EmailValidator.validate(email);

export const validateName = (name) => {
    const nameRegEx = /[^A-Za-z ]*/;
    return nameRegEx.test(name);
}