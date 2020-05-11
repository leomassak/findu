import React from 'react';

import * as S from './styles';

export default function Header({ onPressListener }) {
    return (
        <S.HeaderView>
            <S.HeaderBackButtonContainer
                onPress={onPressListener}
            >
                <S.HeaderBackButtonIcon
                    color="#4442C0"
                />
            </S.HeaderBackButtonContainer>
        </S.HeaderView>
    )
}
