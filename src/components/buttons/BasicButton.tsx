import { StyleSheet, View, TouchableNativeFeedback, Text, ViewStyle, TextStyle, GestureResponderEvent, ColorValue, StyleProp, TouchableOpacity } from "react-native";
import { Colors } from "../../constants";

interface BasicButtonProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

export default function BasicButton({ style, textStyle, text, onPress, disabled }: BasicButtonProps) {
  
  const flattenedStyle = StyleSheet.flatten(style) as ViewStyle | undefined;

  let bg: ColorValue = Colors.buttonPrimary;
  if (flattenedStyle?.backgroundColor) {
    bg = flattenedStyle.backgroundColor;
  }
  
  return (
    <View style={[styles.button, style, { overflow: "hidden" }]}>
      <TouchableOpacity style={[styles.buttonContentView, { backgroundColor: bg }]} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    backgroundColor: Colors.buttonPrimary,
  },
  buttonContentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.buttonPrimary,
    borderRadius: 25,
  },
});