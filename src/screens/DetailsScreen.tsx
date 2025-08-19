import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';

import BasicButton from '../components/buttons/BasicButton';
import { encrypt } from '../utils/crypto_utils';
import { loadPassHash, saveSecret } from '../utils/save_utils';
import { Colors } from '../constants';
import { DetailsScreenProps, SecretItem, SecretModalInfoOnAdd } from '../types';
import ScreenHeader from '../components/ScreenHeader';

export default function DetailsScreen({ navigation, route }: DetailsScreenProps) {

  const { secret, onConfirm, onDelete } = route.params;

  const [ name, setName ] = useState<string>('');
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ notes, setNotes ] = useState<string>('');


  useEffect(() => {
    if (secret) {
      setName(secret.name);
      setUsername(secret.username);
      setPassword(secret.password);
      setNotes(secret.notes || '');
    }
  }, []);

  const onConfirmButtonClicked = () => {
    if(secret) {
      const confirmedSecretItem: SecretItem = {
        id: secret.id !== "" ? secret.id : uuid.v4(),
        name: name,
        username: username,
        password: password,
        notes: notes,
      }

      onConfirm?.(confirmedSecretItem);
    }

    navigation.goBack();
  }

  const onDeleteButtonClicked = () => {
    if(secret) {
      onDelete?.(secret.id);
    }

    navigation.goBack();
  }

  const onNameChanged = (name: string) => {
    setName(name);
  }


  return (
    <View style={styles.container}>

      <ScreenHeader title={ name } onTitleChanged={ onNameChanged } />

      <View style={{ flex: 1, paddingTop: 20 }}>

        <Text style={styles.passwordText}>Username</Text>
        <TextInput
          style={ styles.passInput }
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.passwordText}>Password</Text>
        <TextInput
          style={ styles.passInput }
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Text style={styles.passwordText}>Notes</Text>
        <TextInput
          style={[ styles.passInput, { height: 100 } ]}
          value={notes}
          onChangeText={setNotes}
          multiline={true}
          numberOfLines={4}
        />

        <View style={styles.buttonGroup}>

          <BasicButton
            style={[ styles.button, { marginRight: 10 } ]}
            text={"DELETE"}
            textStyle={styles.buttonText}
            onPress={onDeleteButtonClicked}
          />

          <BasicButton
            style={styles.button}
            text={"CONFIRM"}
            textStyle={styles.buttonText}
            onPress={onConfirmButtonClicked}
          />

        </View>
      
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  passInput: {
    height: 40,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    color: '#fffa',
    marginBottom: 20,
    borderColor: Colors.border,
    borderBottomWidth: 1,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  passwordText: {
    marginHorizontal: 20,
    marginBottom: 4,
    color: "#586572ff",
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: '#46538dff',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: Colors.textPrimary
  },
});