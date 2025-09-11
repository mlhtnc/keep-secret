import AsyncStorage from '@react-native-async-storage/async-storage';


const SecretKey = "secret";
const DEKKey = "dekKey";

export const loadSecret = async (): Promise<any> => {
  return await load(SecretKey);
}

export const saveSecret = async (secret: any): Promise<void> => {
  save(SecretKey, secret);
}

export const loadDEK = async (): Promise<any> => {
  return await load(DEKKey);
}

export const saveDEK = async (dek: any): Promise<void> => {
  save(DEKKey, dek);
}


const load = async (key: string): Promise<any> => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch(err) {
    console.log('Error while loading', key);
    return null;
  }
}

const save = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch(err) {
    console.log('Error while saving', key, value);
  }
}

const clear = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch(err) {
    console.log('Error while clearing', key);
  }
}