import * as Keychain from 'react-native-keychain';


const serviceName = 'KeepSecretDEK';

export const setupKeychain = async (dek: string) => {
  const biometricSupport = await hasBiometricSupport();
  if(!biometricSupport) {
    return;
  }

  if(await hasKeychain()) {
    return;
  }

  try {
    await Keychain.setGenericPassword("user", dek, {
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      service: serviceName,
      authenticationPrompt: {
        title: "Setup Secrets",
      }
    });
  } catch(err) {}
}

export const authenticateKeychain = async (): Promise<string | false> => {
  const creds = await Keychain.getGenericPassword({
    authenticationPrompt: {
      title: "Unlock Secrets",
    },
    service: serviceName,
  });

  return creds && creds.password;
}

const hasBiometricSupport = async (): Promise<boolean> => {
	try {
		const supported = await Keychain.getSupportedBiometryType();
    return supported !== null ? true : false;
	} catch (e) {
		return false;
	}
}

export const hasKeychain = async () => {
  return await Keychain.hasGenericPassword({service: serviceName});
}

