const errors = {
    login: {
        user_not_found: 'Usuário ou senha incorretos!',
        internal_error: 'Ocorreu um erro, verifique seus dados e tente novamente!',
    },
    register: {
        user_already_defined: 'Esse usuário já possui um cadastro!',
        internal_error: 'Ocorreu um erro, verifique seus dados e tente novamente!',
    },
    recoverPsw: {
        user_not_found: 'Não encontramos esse usuário!',
        internal_error: 'Ocorreu um erro, verifique seus dados e tente novamente!',
    },
    redefinePsw: {
        invalid_code: 'O código de validação está incorreto!',
        internal_error: 'Ocorreu um erro, verifique seus dados e tente novamente!',
    },
    undefined: 'Ocorreu um erro, tente novamente mais tarde!',
}

export default errors;