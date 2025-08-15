import { StyleSheet, View, TouchableNativeFeedback, Text, ViewStyle, TextStyle, GestureResponderEvent, ColorValue } from "react-native";

interface BasicButtonProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

export default function BasicButton({ style, textStyle, text, onPress, disabled }: BasicButtonProps) {
  
  let bg: ColorValue = '#111';
  if(style && style.backgroundColor) {
    bg = style.backgroundColor;
  }

  return (
    <View style={[styles.button, style, { overflow: "hidden" }]}>
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#2e2e2e', false)} onPress={onPress} disabled={disabled}>
        <View style={[styles.buttonContentView, { backgroundColor: bg }]}>
          <Text style={textStyle}>{text}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    backgroundColor: '#3b3b3b',
  },
  buttonContentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 25,
  },
});