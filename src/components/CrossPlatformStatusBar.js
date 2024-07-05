import { SafeAreaView, StatusBar, View } from "react-native";


export default function CrossPlatformStatusBar() {

  return (
    <View style={{height: StatusBar.currentHeight, backgroundColor: '#111' }}>
      <SafeAreaView>
        <StatusBar translucent style='light' backgroundColor={'#111'}/>
      </SafeAreaView>
    </View>
  );
};