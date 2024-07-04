import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';


export default function LoginScreen({ navigation }) {

  const [ password, setPassword ] = useState('');

  const onPassInputChanged = (changedText) => {
    console.log(changedText);
    setPassword(changedText);

    if(changedText === "good") {
      navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
    }

  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titleText}>keep secret</Text>

      <TextInput
        style={styles.passInput}
        value={password}
        onChangeText={onPassInputChanged}
        secureTextEntry={true}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 10,
    justifyContent: 'center'
  },
  passInput: {
    height: 40,
    alignSelf: 'stretch',
    backgroundColor: '#aaa2',
    borderRadius: 20,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    color: '#fffa'
  },
  titleText: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 50,
    fontSize: 18,
    fontWeight: 'bold'
  }
});