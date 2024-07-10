import { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import uuid from 'react-native-uuid';

import BasicCircleButton from '../components/buttons/BasicCircleButton';
import AddEditSecretModal from '../components/AddEditSecretModal';
import { decrypt, encrypt, sha512 } from '../utils/crypto_utils';
import { loadPassHash, loadSecret, saveSecret } from '../utils/save_utils';
import { SettingsScreenName } from '../../src/constants';
import AlertModal from '../components/AlertModal';
import SyncActivitiyIndicator from '../components/SyncActivitiyIndicator';
import useStoragePermission from '../hooks/useStoragePermission';

export default function HomeScreen({ navigation, route }) {

  const alertModalRef = useRef();
  
  const [ secretList, setSecretList ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ addEditSecretModalVisible, setAddEditSecretModalVisible ] = useState(false);
  const [ syncing, setSyncing ] = useState(false);

  useStoragePermission();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', handleFocus);
    return unsubscribe;
  }, [navigation, route]);

  const handleFocus = async () => {
    initSecrets();
  }

  const initSecrets = async () => {
    const secretCipherData = await loadSecret();
    const passHash = await loadPassHash();

    if(!secretCipherData) {
      setLoading(false);
      return;
    }
    
    decrypt(passHash, secretCipherData.cipherText, secretCipherData.iv, secretCipherData.salt)
    .then((unencryptedText) => {
      const unencryptedSecretList = JSON.parse(unencryptedText);

      setSecretList(unencryptedSecretList);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  const onAddButtonClicked = () => {
    setAddEditSecretModalVisible(true);
  }

  const onAdded = (newSecret) => {
    const newSecretList = [ ...secretList, {
      id: uuid.v4(),
      info: newSecret.info,
      password: newSecret.password
    }];

    setSecretList(newSecretList);

    encryptAndSave(newSecretList);
  }

  const onDeleteButtonClicked = (id) => {
    const filteredSecretList = secretList.filter(i => i.id !== id);
    setSecretList(filteredSecretList);

    if(filteredSecretList.length === 0) {
      saveSecret(null);
    } else {
      encryptAndSave(filteredSecretList);
    }
  }

  const encryptAndSave = async (list) => {
    const passHash = await loadPassHash();

    setSyncing(true);
    encrypt(passHash, JSON.stringify(list))
    .then(cipherData => {
      saveSecret(cipherData);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setSyncing(false);
    });
  }

  const onSettingsButtonClicked = () => {
    navigation.navigate(SettingsScreenName);
  }

  return (
    <SafeAreaView style={styles.container}>

      { loading ? null :
         secretList.length === 0 ?
          <Text style={styles.noSecretText}>No secrets found.{'\n'} Add new one then it will be listed here.</Text>
          :
          <View style={{ flex: 1, marginTop: 10, marginBottom: 70}}> 
            <FlatList
              data={secretList}
              renderItem={({item}) => {
              
                return (
                  <View style={{ flexDirection: 'row', alignSelf: 'stretch', height: 80, backgroundColor: '#111', borderBottomWidth: 1, borderBottomColor: '#fff2'}}>

                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#333', true)}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1, paddingHorizontal: 20, justifyContent: 'center'}}>
                          <Text style={{color: '#fff5', fontSize: 16}}>{item.info}</Text>
                          <Text style={{color: '#fff5', fontSize: 16}}>{item.password}</Text>
                        </View>

                        <BasicCircleButton
                          style={{ width: 40, height: 40, marginRight: 10 }}
                          onPress={() => onDeleteButtonClicked(item.id)}
                          iconName={'delete'}
                          iconSize={18}
                        />
                      </View>

                    </TouchableNativeFeedback>                
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
      }
      


      <BasicCircleButton
        style={styles.settingsButton}
        onPress={onSettingsButtonClicked}
        iconName={'cog'}
        iconSize={30}
      />

      <BasicCircleButton
        style={styles.plusButton}
        onPress={onAddButtonClicked}
        iconName={'plus'}
        iconSize={34}
      />

      <AddEditSecretModal
        visible={addEditSecretModalVisible}
        setVisible={setAddEditSecretModalVisible}
        onAdded={onAdded}
      />

      <AlertModal forwardedRef={alertModalRef}/>

      <SyncActivitiyIndicator show={syncing} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center'
  },
  settingsButton: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  plusButton: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  noSecretText: {
    color: '#666',
    textAlign: 'center'
  }
});