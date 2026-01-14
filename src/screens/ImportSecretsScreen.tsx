import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import BasicButton from '../components/buttons/BasicButton';
import { Colors, HomeScreenName } from '../constants';
import { RootStackParamList } from '../types';
import ScreenHeader from '../components/ScreenHeader';
import { showMessage } from '../utils/toast_message_utils';
import { decrypt } from '../utils/crypto_utils';
import { saveDEK, saveSecret } from '../utils/save_utils';
import { setupKeychain } from '../utils/biometric_utils';

export default function ImportSecretsScreen() {

  const [ exportedSecrets, setExportedSecrets ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const validateExportedSecrets = (): any => {
    try {
      const obj = JSON.parse(exportedSecrets);
      return obj;
    } catch {
      return null;
    }
  }

  const onImportButtonClicked = async () => {
    const exportedSecretsObj = validateExportedSecrets();
    if(!exportedSecretsObj) {
      showMessage("Invalid secrets!");
      return;
    }

    if(!password) {
      showMessage("Password is empty!");
      return;
    }

    const { secretCipher, dekCipher } = exportedSecretsObj;
    try {
      const dek = await decrypt(password, dekCipher.cipherText, dekCipher.iv, dekCipher.salt);

      await saveDEK(dekCipher);
      await saveSecret(secretCipher);
      await setupKeychain(dek);
  
      navigation.reset({ index: 0, routes: [{ name: HomeScreenName, params: { dek } }] });
    } catch(err) {
      showMessage("Wrong password or something bad happened");
      return;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={"Import Secrets"} showBackButton={true} hideEditButton={true} />

      <View style={styles.content}>
        <TextInput
          style={styles.exportedSecretsInput}
          value={exportedSecrets}
          onChangeText={setExportedSecrets}
          multiline={true}
          scrollEnabled={true}
          placeholder="Enter your exported secrets here..."
          placeholderTextColor={"#555"}
        />
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Master Password"
          placeholderTextColor={"#555"}
          secureTextEntry={true}
        />
        <View style={styles.buttonGroup}>
          <BasicButton
            style={styles.button}
            text={"IMPORT"}
            textStyle={styles.buttonText}
            onPress={onImportButtonClicked}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  exportedSecretsInput: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    color: '#fffa',
    borderRadius: 5,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  passwordInput: {
    height: 40,
    alignSelf: 'stretch',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    color: '#fffa',
    borderColor: "#555",
    textAlignVertical: 'center',
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  button: {
    width: 150,
    height: 40,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: "#000"
  },
});