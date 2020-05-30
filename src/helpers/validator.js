import EmailValidator from 'email-validator';

export const validateEmail = (email) => EmailValidator.validate(email);

export const validatePhone = (phone) => {
    const phoneRegEx = '/+[0-9]{13}/';
    return phoneRegEx.test(phone);
}