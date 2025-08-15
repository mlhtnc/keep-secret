import { View, StyleSheet, Text, ActivityIndicator, Platform } from "react-native";
import { SyncActivitiyIndicatorParams } from "../types";


export default function SyncActivitiyIndicator({ show }: SyncActivitiyIndicatorParams) {

  if(!show) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Syncing</Text>
        <ActivityIndicator style={styles.activityIndicator} size={ Platform.OS === "ios" ? "small" : 14 } color={'#fff'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#ddd',
    fontSize: 12
  },
  activityIndicator: {
    marginLeft: 5
  },
});