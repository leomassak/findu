import styled from 'styled-components/native';

export const PopupContainer = styled.View`
  padding: 15px;
  background-color: ${(props) => (props.isError ? '#FE4A42' : '#FFFFFF')};
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.23;
  shadow-radius: 2.62;
  border-radius: 4;
  elevation: 4;
  margin: 5px;
`;

export const PopupTitle = styled.Text`
  color: ${(props) => (props.isError ? '#FFFFFF' : '#000000')};
  font-size: 18px;
  font-weight: bold;
`;

export const PopupBody = styled.Text`
  color: ${(props) => (props.isError ? '#FFFFFF' : '#000000')};
  margin-top: 5px;
  font-size: 15px;
`;
