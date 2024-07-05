import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BasicCircleButton({ style, onPress, disabled, iconName, iconSize }) {

  return (
    <View style={[styles.button, style]}>
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#7685a3', true)} onPress={onPress} disabled={disabled}>
        <View style={styles.buttonContentView}>
          <Icon name={iconName} size={iconSize} color="#fff" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#3b3b3b',
  },
  buttonContentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b3b3b'
  },
  buttonImage: {
    width: 30,
    height: 30
  }
});