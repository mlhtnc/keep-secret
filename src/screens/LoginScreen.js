import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import BasicButton from '../components/buttons/BasicButton';
import { sha512 } from '../utils/crypto_utils';
import { loadPassHash, savePassHash } from '../utils/save_utils';
import { HomeScreenName } from '../constants';


export default function LoginScreen({ navigation }) {

  const [ password, setPassword ] = useState('');
  const [ passwordExist, setPasswordExist ] = useState(true);
  const [ passHash, setPassHash ] = useState('');

  useEffect(() => {
    initPassHash();
  }, []);


  const initPassHash = async () => {
    const storedPassHash = await loadPassHash();
    if(storedPassHash) {
      setPassHash(await loadPassHash());
    } else {
      setPasswordExist(false);
    }
  }

  const onPassInputChanged = async (changedText) => {
    setPassword(changedText);

    const textHash = await sha512(changedText);
    if(passHash && textHash === passHash) {
      navigation.reset({ index: 0, routes: [{ name: HomeScreenName }] });
    }
  }


  const onCreatePasswordClicked = async () => {
    savePassHash(await sha512(password));

    navigation.reset({ index: 0, routes: [{ name: HomeScreenName }] });
  }


  return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={ -100 }>
    <SafeAreaView style={styles.container}>

      <Text style={styles.titleText}>keep secret</Text>

      <TextInput
        style={styles.passInput}
        value={password}
        onChangeText={onPassInputChanged}
        secureTextEntry={true}
      />

      { passwordExist ? null :
        <BasicButton
          style={{ width: 150, height: 40, backgroundColor: '#fff4', marginTop: 20, alignSelf: 'center' }}
          text={"Create Password"}
          onPress={onCreatePasswordClicked}
        />
      }

    </SafeAreaView>
      </KeyboardAvoidingView>
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