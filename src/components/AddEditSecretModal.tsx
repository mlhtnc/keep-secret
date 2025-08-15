import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import BasicButton from './buttons/BasicButton';
import { AddEditSecretModalProps } from '../types';


export default function AddEditSecretModal({ visible, setVisible, onAdded }: AddEditSecretModalProps) {

  const [ info, setInfo ] = useState('');
  const [ password, setPassword ] = useState('');


  const onAddButtonClicked = () => {
    if(!info || !password) {
      return;
    }

    onAdded?.({ info: info, password: password });
    onClose();
  }

  const onClose = () => {
    setVisible(false);

    setInfo('');
    setPassword('');
  }


  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableOpacity style={styles.container} onPress={onClose} activeOpacity={0}>
          <TouchableOpacity style={styles.content} activeOpacity={1}>

            <Text style={styles.infoText}>Info</Text>
            <TextInput
              style={[styles.input, { marginBottom: 10 }]}
              value={info}
              onChangeText={setInfo}
            />

            <Text style={styles.infoText}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <BasicButton
              style={{width: 130, height: 40, backgroundColor: '#000', marginTop: 30, borderRadius: 25}}
              textStyle={{ color: '#fffa'}}
              text={"Create"}
              onPress={onAddButtonClicked}
            />

          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    backgroundColor: '#444',
    width: '75%',
    minHeight: '40%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 10,
    color: '#fffa',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    height: 40,
    alignSelf: 'stretch',
    backgroundColor: '#111',
    borderRadius: 20,
    paddingHorizontal: 10,
    color: '#fffa'
  },
});