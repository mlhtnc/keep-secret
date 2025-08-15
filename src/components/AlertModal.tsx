import { useImperativeHandle, useState, ForwardedRef } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { AlertModalRef, ErrorMessage } from '../types';

interface Props {
	forwardedRef: ForwardedRef<AlertModalRef>;
}

export default function AlertModal({ forwardedRef }: Props) {

  const [ visible, setVisible ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');

  useImperativeHandle(forwardedRef, () => ({
    open: (options = { title: '', description: '' }) => {
      setVisible(true);
      setTitle(title);
      setDescription(description);
    },
    close: () => {
      setVisible(false);
    }
  }));

  const onClose = () => {
    setVisible(false);
    setTitle('');
    setDescription('');
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

            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>{description}</Text>

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
    backgroundColor: '#222',
    width: '75%',
    minHeight: '30%',
    maxHeight: '60%',
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleText: {
    color: '#fffc',
    fontSize: 18,
    marginBottom: 15,
  },
  descriptionText: {
    color: '#fffc',
    fontSize: 14,
    marginBottom: 5,
    alignSelf: 'flex-start'
  }
});