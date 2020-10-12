import React from 'react';

import * as S from './styles';
import IconCloseEye from '../../assets/svg/ic_close-eye.svg';
import IconOpenEye from '../../assets/svg/ic_open-eye.svg';

export default function TextInputContainer({
    title,
    value,
    onChangeValue,
    keyboardType,
    secureTextEntry,
    onEyePress,
    eyeOpen,
    maskType,
    maskOptions,
    setRef,
    onSubmit,
    autoCapitalize = 'none',
}) {
    return (
        <S.TextInputContainer>
            <S.TextInputTitle>
                {title}
            </S.TextInputTitle>
            {maskType ? (
                <S.MaskedInput
                    ref={setRef}
                    type={maskType}
                    options={maskOptions}
                    keyboardType={keyboardType || null}
                    value={value}
                    onChangeText={(text) => onChangeValue(text)}
                    autoCapitalize={autoCapitalize}
                    onSubmitEditing={onSubmit}
                />
            ) : (
                    <S.TextInput
                        ref={setRef}
                        keyboardType={keyboardType || null}
                        value={value}
                        onChangeText={(text) => onChangeValue(text)}
                        secureTextEntry={secureTextEntry}
                        onSubmitEditing={onSubmit}
                        autoCapitalize={autoCapitalize}
                    />
                )}
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