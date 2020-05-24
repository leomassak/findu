import Snackbar from 'react-native-snackbar';

export default function SnackbarComponent(text) {
  Snackbar.show({
    text,
    duration: Snackbar.LENGTH_LONG,
    fontFamily: 'Poppins-Medium',
    action: {
      text: 'FECHAR',
      textColor: 'yellow',
      onPress: () => {},
    },
  });
}
