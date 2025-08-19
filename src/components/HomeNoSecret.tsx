import { StyleSheet, Text } from 'react-native';

import { Colors } from '../constants';


export default function HomeNoSecret() {

  return (
    <Text style={styles.noSecretText}>No secrets found.{'\n'} Add new one then it will be listed here.</Text>
  );
}


const styles = StyleSheet.create({
  noSecretText: {
    color: Colors.textPrimary,
    textAlign: 'center',
    fontSize: 16
  }
});