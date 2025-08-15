import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

export default function useStoragePermission() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const requestStoragePermission = async () => {
      if (Number(Platform.Version) >= 33) {
        setPermissionGranted(true);
        return;
      }

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to save files.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionGranted(true);
        } else {
          setPermissionGranted(false);
        }
      } catch (err) {
        setPermissionGranted(false);
      }
    };

    requestStoragePermission();
  }, []);

  return permissionGranted;
}
