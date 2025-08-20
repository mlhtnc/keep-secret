import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

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

  const { masterPassword } = route.params || {};
  
  const [ secretList, setSecretList ] = useState<SecretItem[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ syncing, setSyncing ] = useState<boolean>(false);


  useEffect(() => {
    initSecrets();
  }, []);

  const initSecrets = async () => {
    const secretCipherData = await loadSecret();

    if(!secretCipherData) {
      return;
    }
    
    setLoading(true);

    decrypt(masterPassword, secretCipherData.cipherText, secretCipherData.iv, secretCipherData.salt)
    .then((unencryptedText) => {
      const unencryptedSecretList: SecretItem[] = JSON.parse(unencryptedText as string);
      setSecretList(unencryptedSecretList);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
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
    encrypt(masterPassword, JSON.stringify(list))
    .then(cipherData => {
      saveSecret(cipherData);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setSyncing(false);
    });
  }
  

  return (
    <View style={styles.container}>
      <ScreenHeader title={"Keep Secret"} hideEditButton={true} />
      
      <View style={styles.listContainer}>

        { loading ? null : secretList.length === 0 ?
            <HomeNoSecret />
            :
            <HomeSecretList secretList={secretList} onSecretItemClicked={onSecretItemClicked} />
        }
      
      </View>

      <BasicCircleButton
        style={styles.plusButton}
        onPress={onAddButtonClicked}
        iconName={'add'}
        iconSize={34}
      /> 

      <SyncActivitiyIndicator show={syncing} />

    </View>
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
  settingsButton: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  plusButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.buttonPrimary,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 80,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  listItemButton: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center',
    backgroundColor: Colors.background
  }
});