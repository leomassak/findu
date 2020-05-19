import React from 'react';

import * as S from './styles';

export default function DefaultButton({ onPressListener, background, border, text, fontColor }) {
    return (
        <S.DefaultButtonTouchableOpacity
            onPress={onPressListener}
            background={background}
            border={border}
            activeOpacity={0.7}
        >
            <S.ButtonNameText fontColor={fontColor}> {text} </S.ButtonNameText>
        </S.DefaultButtonTouchableOpacity>
    );
}
