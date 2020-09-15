import React from 'react';

import * as S from './styles';

export default function DefaultButton({ onPressListener, background, border, text, fontColor, disabled }) {
    return (
        <S.DefaultButtonTouchableOpacity
            onPress={onPressListener}
            background={background}
            border={border}
            activeOpacity={0.7}
            disabled={disabled}
        >
            <S.ButtonNameText fontColor={fontColor}> {text} </S.ButtonNameText>
        </S.DefaultButtonTouchableOpacity>
    );
}
