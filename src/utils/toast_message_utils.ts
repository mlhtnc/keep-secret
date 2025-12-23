import { Platform, ToastAndroid } from "react-native";


export const showMessage = (message: string) => {
  if(Platform.OS !== 'android') {
    return;
  }
  
  ToastAndroid.show(message, ToastAndroid.SHORT);
}