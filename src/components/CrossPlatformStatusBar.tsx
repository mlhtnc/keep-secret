import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CrossPlatformStatusBar() {
  // FIXME: barStyle kullanılması lazım mı bakalım
  return (
    <View style={{height: StatusBar.currentHeight, backgroundColor: '#15202B' }}>
      <SafeAreaView>
        <StatusBar translucent /*style='light'*/ backgroundColor={'#15202B'}/>
      </SafeAreaView>
    </View>
  );
};