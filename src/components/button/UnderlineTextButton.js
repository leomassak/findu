import React from 'react';

import * as S from './styles';

export default function DefaultButton({ onPressListener, text, fontColor }) {
    return (
        <S.UnderlineButtonTouchableOpacity
            onPress={onPressListener}
            activeOpacity={0.7}
        >
            <S.UnderlineButtonText
                fontColor={fontColor}
            >
                {text}
            </S.UnderlineButtonText>
        </S.UnderlineButtonTouchableOpacity>
    );
}
