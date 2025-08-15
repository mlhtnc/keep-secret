import { StyleSheet, View, TouchableNativeFeedback, ViewStyle, TextStyle, GestureResponderEvent } from "react-native";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // FIXME


interface BasicCircleButtonProps {
  style?: ViewStyle;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

export default function BasicCircleButton({ style, onPress, disabled /*FIXME: iconName, iconSize */ }: BasicCircleButtonProps) {

  return (
    <View style={[styles.button, style, { overflow: "hidden" }]}>
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#7685a3', false)} onPress={onPress} disabled={disabled}>
        <View style={styles.buttonContentView}>
          {/* <Icon name={iconName} size={iconSize} color="#fff" /> */}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3b3b3b',
  },
  buttonContentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    borderRadius: 25
  },
});