import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';

import { decrypt, encrypt } from '../utils/crypto_utils';
import { loadDEK, loadSecret, saveSecret } from '../utils/save_utils';
import { Colors, DetailsScreenName, EmpytNoteSecretItem, EmpytSecretItem, NoteDetailsScreenName } from '../constants';
import { HomeScreenProps, Item } from '../types';
import BasicCircleButton from '../components/buttons/BasicCircleButton';
import SyncActivitiyIndicator from '../components/SyncActivitiyIndicator';
import ScreenHeader from '../components/ScreenHeader';
import HomeNoSecret from '../components/HomeNoSecret';
import HomeSecretList from '../components/HomeSecretList';
import { showMessage } from '../utils/toast_message_utils';

export default function HomeScreen({ navigation, route }: HomeScreenProps) {

  const { dek } = route.params || {};
  
  const [ secretList, setSecretList ] = useState<Item[]>([]);
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
      const unencryptedSecretList: Item[] = JSON.parse(unencryptedText as string);
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

  const onAddNoteButtonClicked = () => {
    if(syncing) {
      return;
    }

    navigation.navigate(
      NoteDetailsScreenName,
      {
        secret: EmpytNoteSecretItem,
        onConfirm,
        onDelete
      }
    );
  }

  const onConfirm = (confirmedSecretItem: Item) => {
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

  const onSecretItemClicked = (item: Item) => {
    if(syncing) {
      return;
    }

    navigation.navigate(
      item.type === "secret" ? DetailsScreenName : NoteDetailsScreenName,
      {
        secret: item,
        onConfirm,
        onDelete
      }
    );
  }

  const encryptAndSave = async (list: Item[]) => {
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

  const exportSecrets = async () => {
    const secretCipher = await loadSecret();
    const dekCipher = await loadDEK();

    const exportedSecrets = JSON.stringify({ secretCipher, dekCipher });

    Clipboard.setString(exportedSecrets);
    showMessage('Exported to Clipboard');
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

      <View style={[styles.buttonGroup, { bottom: insets.bottom + 10, right: insets.right + 10 }]}>
        <BasicCircleButton
          style={[styles.button, { marginRight: 10 }]}
          onPress={exportSecrets}
          iconName={'download-outline'}
          iconSize={32}
        />
        <BasicCircleButton
          style={[styles.button, { marginRight: 10 }]}
          onPress={onAddNoteButtonClicked}
          iconName={'create-outline'}
          iconSize={32}
        />
        <BasicCircleButton
          style={styles.button}
          onPress={onAddButtonClicked}
          iconName={'add'}
          iconSize={32}
        /> 
      </View>

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
  buttonGroup: {
    flexDirection: "row",
    width: 200,
    height: 50,
    justifyContent: "flex-end",
    alignItems: "center",
    position: 'absolute',
  },
  button: {
    width: 45,
    height: 45,
    backgroundColor: Colors.buttonPrimary,
  }
});