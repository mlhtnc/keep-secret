import AsyncStorage from '@react-native-async-storage/async-storage';

const SecretKey = "secret";
const PassHash = "passHash";


const loadSecret = async () => {
  return await load(SecretKey);
}

const saveSecret = async (secret) => {
  save(SecretKey, secret);
}

const loadPassHash = async () => {
  return await load(PassHash);
}

const savePassHash = async (secret) => {
  save(PassHash, secret);
}


const load = async (key) => {
  try {
    return JSON.parse(await AsyncStorage.getItem(key));
  } catch(err) {
    console.log('Error while loading', key);
    return null;
  }
}

const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch(err) {
    console.log('Error while saving', key, value);
  }
}

const clear = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch(err) {
    console.log('Error while clearing', key, value);
  }
}




export {
  loadSecret,
  saveSecret,
  loadPassHash,
  savePassHash
}