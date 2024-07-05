import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import uuid from 'react-native-uuid';

import BasicCircleButton from '../components/buttons/BasicCircleButton';
import AddEditSecretModal from '../components/AddEditSecretModal';
import { decrypt, encrypt, sha512 } from '../crypto_utils';
import { loadSecret, saveSecret } from '../utils/save_utils';


export default function HomeScreen() {
  
  const [ secretList, setSecretList ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ addEditSecretModalVisible, setAddEditSecretModalVisible ] = useState(false);


  useEffect(() => {
    initSecrets();
  }, []);


  const initSecrets = async () => {
    const secretCipherData = await loadSecret();
    if(!secretCipherData) {
      setLoading(false);
      return;
    }
    
    decrypt("abc", secretCipherData.cipherText, secretCipherData.iv, secretCipherData.salt)
    .then((unencryptedText) => {
      const unencryptedSecretList = JSON.parse(unencryptedText);

      const secretListWithId = unencryptedSecretList.map(i => ({
        id: uuid.v4(),
        info: i.info,
        password: i.password
      }));

      setSecretList(secretListWithId);
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

    encryptAndSave(filteredSecretList);
  }

  const encryptAndSave = (list) => {
    const secretListWithoutId = list.map(i => ({
      info: i.info,
      password: i.password
    }));

    encrypt("abc", JSON.stringify(secretListWithoutId))
    .then(cipherData => {
      saveSecret(cipherData);
    }).catch((err) => {
      console.log(err);
    });
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
                  <View style={{ flexDirection: 'row', alignSelf: 'stretch', height: 60, backgroundColor: '#111'}}>

                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#333', true)} onPress={() => {}}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1, paddingHorizontal: 20, justifyContent: 'center'}}>
                          <Text style={{color: '#fff5'}}>{item.info}</Text>
                          <Text style={{color: '#fff5'}}>{item.password}</Text>
                        </View>

                        <BasicCircleButton
                          style={{ width: 30, height: 30, marginRight: 10 }}
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
        onPress={async () => {

          // encrypt("abc", "plain text alll right mate")
          // .then(cipherData => {
          //   console.log(cipherData);

          //   decrypt("abc", cipherData.cipherText, cipherData.iv, cipherData.salt)
          //   .then((unencryptedText) => {
          //     console.log(unencryptedText);
          //   }).catch((err) => {
          //     console.log(err);
          //   });

          // }).catch((err) => {
          //   console.log(err);
          // });

          


        }}
        iconName={'cog'}
        iconSize={26}
      />

      <BasicCircleButton
        style={styles.plusButton}
        onPress={onAddButtonClicked}
        iconName={'plus'}
        iconSize={30}
      />

      <AddEditSecretModal
        visible={addEditSecretModalVisible}
        setVisible={setAddEditSecretModalVisible}
        onAdded={onAdded}
      />

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