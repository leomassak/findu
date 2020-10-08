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
        internal_error: 'Não foi possível carregar sua lista de contatos, tente novamente mais tarde!',
    },
    getById: {
        not_a_friend: 'Contato não encontrado!',
    },
    addFriend: {
        invalid_code: 'O código inserido é inválido!',
        already_friends: 'Este contato já está na sua lista de contatos!',
    },
    addGroup: {
        invalid_name: 'Esse nome já está sendo usado em outro grupo',
        invalid_color: 'Esta cor já está sendo usada em outro grupo',
    },
    updateGroup: {
        invalid_name: 'Esse nome já está sendo usado em outro grupo',
        invalid_color: 'Esta cor já está sendo usada em outro grupo',
    },
    updateGroup: {
        internal_error: 'Ocorreu um erro, verifique seus dados e tente novamente!',
    },
    removeFriend: {
        internal_error: 'Ocorreu um erro, verifique seus dados e tente novamente!',
        friendship_not_found: 'Contato não encontrado!',
    },
    createRule: {
        user_not_found: 'Usuário não encontrado',
        friend_not_found: 'Amigo não encontrado',
        friendship_not_found: 'Este contato precisa aceitar sua solicitação de amizade',
        missing_action: 'Tipo de ação não encontrado',
        invalid_action: 'Ação inválida',
        missing_location: 'Localização não enviada',
        missing_location_type: 'Tipo de delimitação não enviado',
        invalid_location_type: 'Tipo de delimitação inválido',
        missing_location_radius: 'Raio da delimitação não enviado',
        missing_location_coordinates: 'Coordenadas não enviadas',
        invalid_location_coordinates: 'Coordenadas inválidas',
        invalid_operation: 'Operação inválida',
        missing_location_name: 'Nome do local não definido',
    },
    undefined: 'Ocorreu um erro, tente novamente mais tarde!',
}

export default errors;