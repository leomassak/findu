import EmailValidator from 'email-validator';
import moment from 'moment';

export const validateEmail = (email) => EmailValidator.validate(email);

export const validateName = (name) => {
    const nameRegEx = /[^A-Za-z ]*/;
    return nameRegEx.test(name);
}

export const validateBirthdate = (date) => {
    if (moment(date, 'DD/MM/YYYY').format('YYYY') < 1910) {
        return false;
    }
    if (!moment(date, 'DD/MM/YYYY').isValid()) {
        return false;
    }
    if (moment(date, 'DD/MM/YYYY').isAfter(moment())) {
        return false;
    }
    return true;
};
