import React from 'react';

import * as S from './styles';

import IconCheck from '../../assets/svg/ic_check.svg';

export default function CheckBox({
    title,
    value,
    onChangeValue,
    rounded,
}) {
    return (
        <S.CheckBoxContainer>
            <S.CheckBoxTouchableOpacity
                onPress={onChangeValue}
            >
                {rounded ? (
                    <>
                       <S.CircleEmptyCheckBox>
                           {value && <S.CircleFullCheckBox />}
                       </S.CircleEmptyCheckBox>
                    </>
                ) : (
                    <>
                        {value ? (
                            <S.SquareFullCheckBox>
                                <IconCheck />
                            </S.SquareFullCheckBox>
                        ) : (
                            <S.SquareEmptyCheckBox />
                        )}
                    </>
                )}
                
            </S.CheckBoxTouchableOpacity>
            <S.CheckBoxText>
                {title}
            </S.CheckBoxText>
        </S.CheckBoxContainer>
    )
}
