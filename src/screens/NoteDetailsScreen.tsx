import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';
import Clipboard from '@react-native-clipboard/clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';

import BasicButton from '../components/buttons/BasicButton';
import { Colors } from '../constants';
import { NoteDetailsScreenProps, NoteSecretItem, SecretItem } from '../types';
import ScreenHeader from '../components/ScreenHeader';
import BasicCircleButton from '../components/buttons/BasicCircleButton';
import useOverrideBackPress from '../hooks/useOverrideBackPress';


export default function NoteDetailsScreen({ navigation, route }: NoteDetailsScreenProps) {

  const { onConfirm, onDelete } = route.params;
  const secret = route.params.secret as NoteSecretItem;

  const [ name, setName ] = useState<string>(secret.name);
  const [ notes, setNotes ] = useState<string>(secret.notes);
  const [ secureTextOn, setSecureTextOn ] = useState<boolean>(true);


  const onBackPress = () => {
    if(secret.id !== "") {
      onConfirm?.(secret);
    }
    return false;
  }

  useOverrideBackPress(onBackPress);


  const validateSecret = (): NoteSecretItem | false => {
    if(name === "") {
      return false;
    }

    const confirmedSecretItem: NoteSecretItem = {
      type: "note",
      id: secret.id !== "" ? secret.id : uuid.v4(),
      name: name,
      notes: notes,
    }

    return confirmedSecretItem;
  }

  const onConfirmButtonClicked = () => {
    const confirmedSecretItem = validateSecret();
    if(!confirmedSecretItem) {
      return;
    }

    onConfirm?.(confirmedSecretItem);

    navigation.goBack();
  }

  const onDeleteButtonClicked = () => {
    onDelete?.(secret.id);
    navigation.goBack();
  }


  return (
    <SafeAreaView style={styles.container}>

      <ScreenHeader navigation={navigation} title={name} onTitleChanged={setName} onBackPress={onBackPress} showBackButton={true} />

      <View style={styles.content}>

        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          multiline={true}
          scrollEnabled={true}
          placeholder="Enter your notes here..."
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
  notesInput: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    color: '#fffa',
    borderRadius: 5,
    textAlignVertical: 'top',
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