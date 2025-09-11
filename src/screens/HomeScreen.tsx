import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import BasicCircleButton from '../components/buttons/BasicCircleButton';
import { decrypt, encrypt } from '../utils/crypto_utils';
import { loadSecret, saveSecret } from '../utils/save_utils';
import { Colors, DetailsScreenName, EmpytSecretItem } from '../constants';
import SyncActivitiyIndicator from '../components/SyncActivitiyIndicator';
import { HomeScreenProps, SecretItem } from '../types';
import ScreenHeader from '../components/ScreenHeader';
import HomeNoSecret from '../components/HomeNoSecret';
import HomeSecretList from '../components/HomeSecretList';


export default function HomeScreen({ navigation, route }: HomeScreenProps) {

  const { dek } = route.params || {};
  
  const [ secretList, setSecretList ] = useState<SecretItem[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ syncing, setSyncing ] = useState<boolean>(false);

  const insets = useSafeAreaInsets();


  useEffect(() => {
    initSecrets();
  }, []);

  const initSecrets = async () => {
    const secretCipherData = await loadSecret();

    if(!secretCipherData) {
      return;
    }
    
    setLoading(true);

    setSyncing(true);
    decrypt(dek, secretCipherData.cipherText, secretCipherData.iv, secretCipherData.salt)
    .then((unencryptedText) => {
      const unencryptedSecretList: SecretItem[] = JSON.parse(unencryptedText as string);
      setSecretList(unencryptedSecretList);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
      setSyncing(false);
    });
  }

  const onAddButtonClicked = () => {
    if(syncing) {
      return;
    }

    navigation.navigate(
      DetailsScreenName,
      {
        secret: EmpytSecretItem,
        onConfirm,
        onDelete
      }
    );
  }

  const onConfirm = (confirmedSecretItem: SecretItem) => {
    const reducedSecretList = secretList.filter(i => i.id !== confirmedSecretItem.id);
    const newSecretList = [ confirmedSecretItem, ...reducedSecretList ];
  
    setSecretList(newSecretList);

    encryptAndSave(newSecretList);
  }

  const onDelete = (id: string) => {
    const reducedSecretList = secretList.filter(i => i.id !== id);
    setSecretList(reducedSecretList);

    encryptAndSave(reducedSecretList);
  }

  const onSecretItemClicked = (item: SecretItem) => {
    if(syncing) {
      return;
    }

    navigation.navigate(
      DetailsScreenName,
      {
        secret: item,
        onConfirm,
        onDelete
      }
    );
  }

  const encryptAndSave = async (list: SecretItem[]) => {
    setSyncing(true);
    encrypt(dek, JSON.stringify(list))
    .then(cipherData => {
      saveSecret(cipherData);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setSyncing(false);
    });
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={"Keep Secret"} hideEditButton={true} />
      
      <View style={styles.listContainer}>

        { loading ? null : secretList.length === 0 ?
            <HomeNoSecret />
            :
            <HomeSecretList secretList={secretList} onSecretItemClicked={onSecretItemClicked} />
        }
      
      </View>

      <BasicCircleButton
        style={[styles.plusButton, { bottom: insets.bottom + 10, right: insets.right + 10 }]}
        onPress={onAddButtonClicked}
        iconName={'add'}
        iconSize={34}
      /> 

      <SyncActivitiyIndicator show={syncing} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    flex: 1,
    marginBottom: 70,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  plusButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    backgroundColor: Colors.buttonPrimary,
  }
});