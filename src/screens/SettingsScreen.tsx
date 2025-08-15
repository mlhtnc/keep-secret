import { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
// import DocumentPicker, { types } from '@react-native-documents/picker';

import SettingsListElement from '../components/SettingsListElement';
import { loadSecret } from '../utils/save_utils';
import { importSecrets } from '../utils/import_export_utils';
import AlertModal from '../components/AlertModal';
import { CannotExportNoSecretsAlertMessage, CannotExportSecretFileAlreadyExistAlertMessage, CannotImportAlreadyHaveSecretsAlertMessage, HomeScreenName } from '../constants';
import SyncActivitiyIndicator from '../components/SyncActivitiyIndicator';
import { AlertModalRef, SettingsScreenProps } from '../types';


export default function SettingsScreen({ navigation }: SettingsScreenProps) {

  const alertModalRef = useRef<AlertModalRef>(null);

  const [ syncing, setSyncing ] = useState(false);

  
  const onImportButtonClicked = async () => {
    const secrets = await loadSecret();
    if(secrets) {
      alertModalRef.current?.open(CannotImportAlreadyHaveSecretsAlertMessage);
      return;
    }
 

    // DocumentPicker.pick({ type: types.allFiles })
    // .then(res => {
    //   const uri = res[0].uri;

    //   RNFS.readFile(uri, 'utf8')
    //   .then(async res => {
    //     setSyncing(true);

    //     const result = await importSecrets(res);
    //     if(!result.result) {
    //       alertModalRef.current?.open(result.errorMessage);
    //       return;
    //     }

    //     navigation.reset({ index: 0, routes: [{ name: HomeScreenName }] });

    //   }).catch(err => {
    //     console.log(err);
    //   }).finally(() => {
    //     setSyncing(false);
    //   });

    // })
    // .catch(err => {
    //   console.log(err);
    // });
  }

  const onExportButtonClicked = async () => {


    const cipherSecrets = await loadSecret();
    if(!cipherSecrets) {
      alertModalRef.current?.open(CannotExportNoSecretsAlertMessage);
      return;
    }

    var path = RNFS.DownloadDirectoryPath + '/keep.secret';

    RNFS.exists(path)
    .then((exists) => {
      if (exists) {
        alertModalRef.current?.open(CannotExportSecretFileAlreadyExistAlertMessage);
      } else {
        RNFS.writeFile(path, JSON.stringify(cipherSecrets), 'utf8')
        .then((success) => {
          // TODO: Toast message
        })
        .catch((err) => {
          console.log(err.message);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }


  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>
        <SettingsListElement
          title={'Import'}
          subtitle={'Import your secrets'}
          onPress={onImportButtonClicked}
        />

        <SettingsListElement
          title={'Export'}
          subtitle={'Export your secrets'}
          onPress={onExportButtonClicked}
        />

      </ScrollView>
      
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
});