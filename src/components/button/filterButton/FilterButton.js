import React from 'react';
import * as S from './styles';

function filterButton ({
    buttonName,
    selected,
    customWidth,
    onPressListener,
}) {
  return ( 
      <S.FilterButtonContainer 
      onPress={onPressListener}
      selected={selected} 
      customWidth={customWidth} 
      activeOpacity={selected ? 1 : 0.4}
      >
          <S.FilterButtonName selected={selected}>
              {buttonName}
          </S.FilterButtonName>
      </S.FilterButtonContainer>
  );
}

export default filterButton;