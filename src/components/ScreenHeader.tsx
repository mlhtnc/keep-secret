import { useRef, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { ScreenHeaderProps } from '../types';
import { Colors } from '../constants';
import BasicCircleButton from './buttons/BasicCircleButton';


export default function ScreenHeader({ navigation, title, onTitleChanged, onBackPress, showBackButton=false, hideEditButton=false }: ScreenHeaderProps) {

  const titleRef = useRef<TextInput>(null);

  const [ isEditing, setIsEditing ] = useState<boolean>(false);


  const onTitleChange = (text: string) => {
    onTitleChanged?.(text);
  }

  const toggleEdit = () => {
    // If editing is started, focus the title input
    if (!isEditing) {
      setTimeout(() => {
        titleRef.current?.focus();
      }, 100);
    }

    setIsEditing((prev) => !prev);
  }

  const handleBackPress = () => {
    onBackPress?.();
    navigation?.goBack();
  }


  return (
    <View style={styles.header}>
      <View style={[styles.titleContainer, !showBackButton ? { marginLeft: 20 } : undefined]}>
        { showBackButton ?
          <BasicCircleButton style={{width: 40, height: 40}} iconColor={"#fff"} iconName='arrow-back-outline' iconSize={24} onPress={ handleBackPress } />
          :
          null
        }

        <TextInput
          ref={titleRef}
          editable={isEditing}
          style={ styles.passInput }
          value={ title }
          onChangeText={ onTitleChange }
        />

        {!hideEditButton &&
          <BasicCircleButton style={{width: 40, height: 40}} iconColor={"#fff"} iconName='pencil' iconSize={24} onPress={ toggleEdit } />
        }
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: Colors.background,
    borderColor: Colors.border,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  titleContainer: {
    height: 58,
    backgroundColor: Colors.background,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passInput: {
    width: '80%',
    height: 56,
    color: Colors.textPrimary,
    backgroundColor: Colors.background,
    fontSize: 20,
    textAlign: 'left',
    padding: 0, // Remove default padding
  },
});