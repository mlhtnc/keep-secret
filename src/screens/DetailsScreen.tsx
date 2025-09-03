import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';
import Clipboard from '@react-native-clipboard/clipboard';

import BasicButton from '../components/buttons/BasicButton';
import { Colors } from '../constants';
import { DetailsScreenProps, SecretItem } from '../types';
import ScreenHeader from '../components/ScreenHeader';
import BasicCircleButton from '../components/buttons/BasicCircleButton';


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
    if(!secret) {
      return;
    }

    if(name === "" || username === "" || password === "") {
      return;
    }

    const confirmedSecretItem: SecretItem = {
      id: secret.id !== "" ? secret.id : uuid.v4(),
      name: name,
      username: username,
      password: password,
      notes: notes,
    }

    onConfirm?.(confirmedSecretItem);

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

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  }


  return (
    <View style={styles.container}>

      <ScreenHeader title={ name } onTitleChanged={ onNameChanged } />

      <View style={styles.content}>

        <Text style={styles.inputTitle}>Username</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={ styles.usernameInput }
            value={username}
            onChangeText={setUsername}
          />
          <BasicCircleButton iconColor={"#fff"} iconName={'copy-outline'} iconSize={24} onPress={() => copyToClipboard(username)} />
        </View>

        <Text style={styles.inputTitle}>Password</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={ styles.passwordInput }
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <BasicCircleButton iconColor={"#fff"} iconName={'copy-outline'} iconSize={24} onPress={() => copyToClipboard(password)} />
        </View>

        <Text style={styles.inputTitle}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          multiline={true}
          numberOfLines={4}
        />

        <View style={styles.buttonGroup}>

          { secret?.id !== "" ?
            <BasicButton
              style={[ styles.button, { marginRight: 10 } ]}
              text={"DELETE"}
              textStyle={styles.buttonText}
              onPress={onDeleteButtonClicked}
            />
            :
            null
          }

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
  content: {
    flex: 1,
    paddingTop: 20
  },
  inputContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  usernameInput: {
    flex: 1,
    height: 40,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    color: '#fffa',
    borderColor: Colors.border,
    borderBottomWidth: 1,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    color: '#fffa',
    borderColor: Colors.border,
    borderBottomWidth: 1,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  notesInput: {
    height: 100,
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
  inputTitle: {
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
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: "#000"
  },
});