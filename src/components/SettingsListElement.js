import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';


export default function SettingsListElement({ title, subtitle, onPress}) {

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#333', true)} onPress={onPress}>
        <View style={styles.content}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
      </TouchableNativeFeedback>                
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 60,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#fff2'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  titleText: {
    color: '#fff9',
    fontSize: 16
  },
  subtitleText: {
    color: '#fff5',
    fontSize: 12
  }
});