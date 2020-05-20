import React from 'react';

import * as S from './styles';
import IconCloseEye from '../../assets/svg/ic_close-eye.svg';
import IconOpenEye from '../../assets/svg/ic_open-eye.svg';

export default function Header({
    title,
    value,
    onChangeValue,
    keyboardType,
    secureTextEntry,
    onEyePress,
    eyeOpen,
}) {
    return (
        <S.TextInputContainer>
            <S.TextInputTitle>
                {title}
            </S.TextInputTitle>
            <S.TextInput
                keyboardType={keyboardType || null}
                value={value}
                onChangeText={(text) => onChangeValue(text)}
                secureTextEntry={secureTextEntry}
            />
            {onEyePress && (
                <S.TextInputContainerIconTouchableOpacity
                    onPress={onEyePress}
                >
                    {eyeOpen ? (
                        <IconOpenEye />
                    ) : (
                        <IconCloseEye />
                    )}
                </S.TextInputContainerIconTouchableOpacity>
            )}
        </S.TextInputContainer>
    )
}