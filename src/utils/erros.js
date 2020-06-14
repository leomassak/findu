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
    getAllFriends: {
        internal_error: 'Não foi possível carregar sua lista de amigos, tente novamente mais tarde!',
    },
    getById: {
        not_a_friend: 'Amigo não encontrado!',
    },
    addFriend: {
        invalid_code: 'O código inserido é inválido!',
        already_friends: 'Este contato já está na sua lista de amigos!',

    },
    removeFriend: {
        internal_error: 'Ocorreu um erro, verifique seus dados e tente novamente!',
        friendship_not_found: 'Amigo não encontrado!',
    },
    undefined: 'Ocorreu um erro, tente novamente mais tarde!',
}

export default errors;